import { AnalyticsCard } from "../AnalyticsCard";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export function StoreAdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>Store Dashboard</h1>
        <p className="text-text-secondary mt-2">Welcome back! Here's your store overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Sales"
          value="$12,450"
          change="+15.3% from last week"
          changeType="positive"
          icon="dollar"
          gradient="from-status-success to-emerald-600"
        />
        <AnalyticsCard
          title="Orders"
          value="142"
          change="+8 today"
          changeType="positive"
          icon="orders"
          gradient="from-primary-500 to-primary-700"
        />
        <AnalyticsCard
          title="Products"
          value="45"
          change="38 active"
          changeType="positive"
          icon="package"
          gradient="from-secondary-500 to-orange-600"
        />
        <AnalyticsCard
          title="Comments"
          value="89"
          change="12 pending review"
          changeType="neutral"
          icon="comments"
          gradient="from-purple-500 to-purple-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6">Weekly Sales</h3>
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
        </Card>

        <Card className="p-6">
          <h3 className="mb-6">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-gray100">
                <div className="flex-1">
                  <p>{order.id}</p>
                  <p className="text-text-secondary">{order.customer} • {order.product}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span>{order.amount}</span>
                  <Badge className={
                    order.status === 'completed' ? 'bg-status-success text-white' :
                    order.status === 'processing' ? 'bg-secondary-500 text-white' :
                    'bg-primary-500 text-white'
                  }>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="mb-4">Top Products</h4>
          <div className="space-y-3">
            {[
              { name: 'Premium Watch', sales: 45 },
              { name: 'Luxury Bag', sales: 38 },
              { name: 'Gift Set', sales: 32 },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-text-secondary">{product.name}</span>
                <span>{product.sales} sold</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="mb-4">Store Stats</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Store Views</span>
              <span>1,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Avg. Order Value</span>
              <span>$87.68</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Conversion Rate</span>
              <span>3.2%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="mb-4">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full p-3 rounded-xl bg-surface-gray100 hover:bg-surface-gray200 transition-colors text-left">
              Add New Product
            </button>
            <button className="w-full p-3 rounded-xl bg-surface-gray100 hover:bg-surface-gray200 transition-colors text-left">
              View All Orders
            </button>
            <button className="w-full p-3 rounded-xl bg-surface-gray100 hover:bg-surface-gray200 transition-colors text-left">
              Manage Comments
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
