import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminAnalyticsCard from './AnalyticsCard';
import PlatformAdminCard from './Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import './PlatformAdminDashboard.css';

const statsData = [
  { name: 'Jan', stores: 12, revenue: 45000 },
  { name: 'Feb', stores: 15, revenue: 52000 },
  { name: 'Mar', stores: 18, revenue: 61000 },
  { name: 'Apr', stores: 22, revenue: 73000 },
  { name: 'May', stores: 28, revenue: 89000 },
  { name: 'Jun', stores: 32, revenue: 98000 },
];

const recentActivities = [
  { store: 'Luxury Gifts Co.', action: 'Added 5 new products', time: '2 hours ago' },
  { store: 'Artisan Crafts', action: 'Updated store details', time: '5 hours ago' },
  { store: 'Premium Selections', action: 'New store created', time: '1 day ago' },
  { store: 'Gift Haven', action: 'Changed visibility to active', time: '2 days ago' },
];

function PlatformAdminDashboard() {

  return (
    <PlatformAdminLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1 className="dashboard-page-title">Platform Dashboard</h1>
          <p className="dashboard-page-subtitle">Overview of all stores and platform analytics</p>
        </div>

        <div className="dashboard-stats-grid">
          <PlatformAdminAnalyticsCard
            title="Total Stores"
            value="32"
            change="+4 this month"
            changeType="positive"
            icon="store"
            gradient="from-primary-500 to-primary-700"
          />
          <PlatformAdminAnalyticsCard
            title="Active Stores"
            value="28"
            change="87.5% active"
            changeType="positive"
            icon="trendingUp"
            gradient="from-status-success to-emerald-600"
          />
          <PlatformAdminAnalyticsCard
            title="Total Products"
            value="486"
            change="+23 this week"
            changeType="positive"
            icon="package"
            gradient="from-secondary-500 to-orange-600"
          />
          <PlatformAdminAnalyticsCard
            title="Platform Revenue"
            value="$98,450"
            change="+12.3%"
            changeType="positive"
            icon="dollar"
            gradient="from-purple-500 to-purple-700"
          />
        </div>

        <div className="dashboard-charts-grid">
          <PlatformAdminCard className="dashboard-chart-card">
            <h3 className="dashboard-chart-title">Store Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="stores" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </PlatformAdminCard>

          <PlatformAdminCard className="dashboard-chart-card">
            <h3 className="dashboard-chart-title">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
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

        <PlatformAdminCard className="dashboard-activity-card">
          <h3 className="dashboard-chart-title">Recent Activity</h3>
          <div className="dashboard-activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="dashboard-activity-item">
                <div className="dashboard-activity-info">
                  <p className="dashboard-activity-store">{activity.store}</p>
                  <p className="dashboard-activity-action">{activity.action}</p>
                </div>
                <span className="dashboard-activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </PlatformAdminCard>
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminDashboard;
