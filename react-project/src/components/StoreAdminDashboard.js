import StoreAdminLayout from './StoreAdminLayout';
import PlatformAdminAnalyticsCard from './AnalyticsCard';
import PlatformAdminCard from './Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './StoreAdminDashboard.css';

const salesData = [
  { day: 'Mon', sales: 12 },
  { day: 'Tue', sales: 19 },
  { day: 'Wed', sales: 15 },
  { day: 'Thu', sales: 25 },
  { day: 'Fri', sales: 32 },
  { day: 'Sat', sales: 41 },
  { day: 'Sun', sales: 28 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Premium Watch', amount: '$299.99', status: 'completed' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'Gift Set', amount: '$149.99', status: 'processing' },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'Luxury Bag', amount: '$399.99', status: 'shipped' },
  { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Watch Bundle', amount: '$549.99', status: 'completed' },
];

function StoreAdminDashboard() {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'store-dashboard-badge-completed';
      case 'processing':
        return 'store-dashboard-badge-processing';
      case 'shipped':
        return 'store-dashboard-badge-shipped';
      default:
        return '';
    }
  };

  return (
    <StoreAdminLayout>
      <div className="store-dashboard-page">
        <div className="store-dashboard-header">
          <h1 className="store-dashboard-title">Store Dashboard</h1>
          <p className="store-dashboard-subtitle">Welcome back! Here's your store overview</p>
        </div>

        <div className="store-dashboard-stats-grid">
          <PlatformAdminAnalyticsCard
            title="Total Sales"
            value="$12,450"
            change="+15.3% from last week"
            changeType="positive"
            icon="dollar"
            gradient="from-status-success to-emerald-600"
          />
          <PlatformAdminAnalyticsCard
            title="Orders"
            value="142"
            change="+8 today"
            changeType="positive"
            icon="package"
            gradient="from-primary-500 to-primary-700"
          />
          <PlatformAdminAnalyticsCard
            title="Products"
            value="45"
            change="38 active"
            changeType="positive"
            icon="package"
            gradient="from-secondary-500 to-orange-600"
          />
          <PlatformAdminAnalyticsCard
            title="Comments"
            value="89"
            change="12 pending review"
            changeType="neutral"
            icon="package"
            gradient="from-purple-500 to-purple-700"
          />
        </div>

        <div className="store-dashboard-charts-grid">
          <PlatformAdminCard className="store-dashboard-chart-card">
            <h3 className="store-dashboard-chart-title">Weekly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-dashboard-chart-card">
            <h3 className="store-dashboard-chart-title">Recent Orders</h3>
            <div className="store-dashboard-orders-list">
              {recentOrders.map((order) => (
                <div key={order.id} className="store-dashboard-order-item">
                  <div className="store-dashboard-order-info">
                    <p className="store-dashboard-order-id">{order.id}</p>
                    <p className="store-dashboard-order-details">{order.customer} • {order.product}</p>
                  </div>
                  <div className="store-dashboard-order-right">
                    <span className="store-dashboard-order-amount">{order.amount}</span>
                    <span className={`store-dashboard-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </PlatformAdminCard>
        </div>

        <div className="store-dashboard-widgets-grid">
          <PlatformAdminCard className="store-dashboard-widget-card">
            <h4 className="store-dashboard-widget-title">Top Products</h4>
            <div className="store-dashboard-widget-content">
              {[
                { name: 'Premium Watch', sales: 45 },
                { name: 'Luxury Bag', sales: 38 },
                { name: 'Gift Set', sales: 32 },
              ].map((product, index) => (
                <div key={index} className="store-dashboard-widget-row">
                  <span className="store-dashboard-widget-label">{product.name}</span>
                  <span className="store-dashboard-widget-value">{product.sales} sold</span>
                </div>
              ))}
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-dashboard-widget-card">
            <h4 className="store-dashboard-widget-title">Store Stats</h4>
            <div className="store-dashboard-widget-content">
              <div className="store-dashboard-widget-row">
                <span className="store-dashboard-widget-label">Store Views</span>
                <span className="store-dashboard-widget-value">1,234</span>
              </div>
              <div className="store-dashboard-widget-row">
                <span className="store-dashboard-widget-label">Avg. Order Value</span>
                <span className="store-dashboard-widget-value">$87.68</span>
              </div>
              <div className="store-dashboard-widget-row">
                <span className="store-dashboard-widget-label">Conversion Rate</span>
                <span className="store-dashboard-widget-value">3.2%</span>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-dashboard-widget-card">
            <h4 className="store-dashboard-widget-title">Quick Actions</h4>
            <div className="store-dashboard-widget-content">
              <button className="store-dashboard-action-button">
                Add New Product
              </button>
              <button className="store-dashboard-action-button">
                View All Orders
              </button>
              <button className="store-dashboard-action-button">
                Manage Comments
              </button>
            </div>
          </PlatformAdminCard>
        </div>
      </div>
    </StoreAdminLayout>
  );
}

export default StoreAdminDashboard;

