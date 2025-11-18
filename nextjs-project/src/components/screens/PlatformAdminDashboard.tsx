import { AnalyticsCard } from "../AnalyticsCard";
import { Card } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const statsData = [
  { name: 'Jan', stores: 12, revenue: 45000 },
  { name: 'Feb', stores: 15, revenue: 52000 },
  { name: 'Mar', stores: 18, revenue: 61000 },
  { name: 'Apr', stores: 22, revenue: 73000 },
  { name: 'May', stores: 28, revenue: 89000 },
  { name: 'Jun', stores: 32, revenue: 98000 },
];

export function PlatformAdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>Platform Dashboard</h1>
        <p className="text-text-secondary mt-2">Overview of all stores and platform analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Stores"
          value="32"
          change="+4 this month"
          changeType="positive"
          icon="store"
          gradient="from-primary-500 to-primary-700"
        />
        <AnalyticsCard
          title="Active Stores"
          value="28"
          change="87.5% active"
          changeType="positive"
          icon="trendingUp"
          gradient="from-status-success to-emerald-600"
        />
        <AnalyticsCard
          title="Total Products"
          value="486"
          change="+23 this week"
          changeType="positive"
          icon="package"
          gradient="from-secondary-500 to-orange-600"
        />
        <AnalyticsCard
          title="Platform Revenue"
          value="$98,450"
          change="+12.3%"
          changeType="positive"
          icon="dollar"
          gradient="from-purple-500 to-purple-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6">Store Growth</h3>
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
        </Card>

        <Card className="p-6">
          <h3 className="mb-6">Revenue Trend</h3>
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
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { store: 'Luxury Gifts Co.', action: 'Added 5 new products', time: '2 hours ago' },
            { store: 'Artisan Crafts', action: 'Updated store details', time: '5 hours ago' },
            { store: 'Premium Selections', action: 'New store created', time: '1 day ago' },
            { store: 'Gift Haven', action: 'Changed visibility to active', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-surface-gray100">
              <div>
                <p>{activity.store}</p>
                <p className="text-text-secondary">{activity.action}</p>
              </div>
              <span className="text-text-secondary">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
