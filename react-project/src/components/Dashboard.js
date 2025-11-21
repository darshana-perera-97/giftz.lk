import { useEffect, useMemo, useState } from 'react';
import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminAnalyticsCard from './AnalyticsCard';
import PlatformAdminCard from './Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import './PlatformAdminDashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function formatCurrency(value) {
  if (typeof value !== 'number') return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function PlatformAdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(`${API_BASE_URL}/api/dashboard`);
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load dashboard');
        }
        setDashboardData(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const metrics = dashboardData?.metrics || {};
  const trend = dashboardData?.trend || {};
  const topStores = dashboardData?.topStores || [];
  const recentActivity = dashboardData?.recentActivity || [];

  const chartData = useMemo(() => {
    const labels = trend.labels || [];
    return labels.map((label, index) => ({
      label,
      revenue: trend.revenue?.[index] || 0,
      orders: trend.orders?.[index] || 0,
    }));
  }, [trend]);

  return (
    <PlatformAdminLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1 className="dashboard-page-title">Platform Dashboard</h1>
          <p className="dashboard-page-subtitle">Overview of all stores and platform analytics</p>
        </div>

        {isLoading && <div className="dashboard-status-message">Loading dashboard...</div>}
        {error && !isLoading && (
          <div className="dashboard-status-message dashboard-status-error">{error}</div>
        )}

        {!isLoading && !error && (
          <>
            <div className="dashboard-stats-grid">
              <PlatformAdminAnalyticsCard
                title="Total Revenue"
                value={formatCurrency(metrics.totalRevenue)}
                change="All time"
                changeType="neutral"
                icon="dollar"
                gradient="from-purple-500 to-purple-700"
              />
              <PlatformAdminAnalyticsCard
                title="Active Stores"
                value={metrics.activeStores?.toString() || '0'}
                change="Currently active"
                changeType="positive"
                icon="store"
                gradient="from-primary-500 to-primary-700"
              />
              <PlatformAdminAnalyticsCard
                title="Pending Orders"
                value={metrics.pendingOrders?.toString() || '0'}
                change="Awaiting fulfilment"
                changeType="neutral"
                icon="package"
                gradient="from-secondary-500 to-orange-600"
              />
              <PlatformAdminAnalyticsCard
                title="Support Tickets"
                value={metrics.supportTickets?.toString() || '0'}
                change="Open tickets"
                changeType="negative"
                icon="alert"
                gradient="from-status-warning to-amber-600"
              />
            </div>

            <div className="dashboard-charts-grid">
              <PlatformAdminCard className="dashboard-chart-card">
                <h3 className="dashboard-chart-title">Orders per Day</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="orders" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </PlatformAdminCard>

              <PlatformAdminCard className="dashboard-chart-card">
                <h3 className="dashboard-chart-title">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </PlatformAdminCard>
            </div>

            <div className="dashboard-lists-grid">
              <PlatformAdminCard className="dashboard-activity-card">
                <h3 className="dashboard-chart-title">Top Performing Stores</h3>
                <div className="dashboard-activity-list">
                  {topStores.map((store) => (
                    <div key={store.id} className="dashboard-activity-item">
                      <div className="dashboard-activity-info">
                        <p className="dashboard-activity-store">{store.name}</p>
                        <p className="dashboard-activity-action">
                          {store.orders} orders this week
                        </p>
                      </div>
                      <span className="dashboard-activity-time">
                        {formatCurrency(store.revenue)}
                      </span>
                    </div>
                  ))}
                  {topStores.length === 0 && (
                    <p className="dashboard-empty-state">No top stores data available.</p>
                  )}
                </div>
              </PlatformAdminCard>

              <PlatformAdminCard className="dashboard-activity-card">
                <h3 className="dashboard-chart-title">Recent Activity</h3>
                <div className="dashboard-activity-list">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="dashboard-activity-item">
                      <div className="dashboard-activity-info">
                        <p className="dashboard-activity-store">{activity.message}</p>
                        <p className="dashboard-activity-action">{activity.type}</p>
                      </div>
                      <span className="dashboard-activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {recentActivity.length === 0 && (
                    <p className="dashboard-empty-state">No recent activity.</p>
                  )}
                </div>
              </PlatformAdminCard>
            </div>
          </>
        )}
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminDashboard;
