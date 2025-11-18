import { useState } from 'react';
import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminCard from './Card';
import './PlatformAdminOrders.css';

// Icon components
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', store: 'Luxury Gifts Co.', products: 2, total: 599.98, status: 'completed', date: '2025-11-05' },
  { id: '#ORD-002', customer: 'Jane Smith', store: 'Artisan Crafts', products: 1, total: 149.99, status: 'processing', date: '2025-11-06' },
  { id: '#ORD-003', customer: 'Mike Johnson', store: 'Tech Gadgets Store', products: 3, total: 849.97, status: 'shipped', date: '2025-11-06' },
  { id: '#ORD-004', customer: 'Sarah Wilson', store: 'Personalized Treasures', products: 1, total: 549.99, status: 'completed', date: '2025-11-07' },
  { id: '#ORD-005', customer: 'Tom Brown', store: 'Eco-Friendly Gifts', products: 2, total: 399.98, status: 'processing', date: '2025-11-07' },
  { id: '#ORD-006', customer: 'Emma Davis', store: 'Kids Wonderland', products: 4, total: 679.96, status: 'shipped', date: '2025-11-07' },
];

function PlatformAdminOrders() {
  const [orders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.store.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesStore = storeFilter === 'all' || order.store === storeFilter;
    return matchesSearch && matchesStatus && matchesStore;
  });

  const stores = Array.from(new Set(orders.map(o => o.store)));

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'order-badge-completed';
      case 'processing':
        return 'order-badge-processing';
      case 'shipped':
        return 'order-badge-shipped';
      default:
        return 'order-badge-default';
    }
  };

  return (
    <PlatformAdminLayout>
      <div className="platform-admin-orders">
        <div className="orders-header">
          <div>
            <h1 className="orders-title">All Orders</h1>
            <p className="orders-subtitle">Monitor all orders across the platform</p>
          </div>
        </div>

        <div className="orders-stats-grid">
          <PlatformAdminCard className="orders-stat-card">
            <p className="orders-stat-label">Total Orders</p>
            <h3 className="orders-stat-value">456</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="orders-stat-card">
            <p className="orders-stat-label">Processing</p>
            <h3 className="orders-stat-value">87</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="orders-stat-card">
            <p className="orders-stat-label">Shipped</p>
            <h3 className="orders-stat-value">142</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="orders-stat-card">
            <p className="orders-stat-label">Completed</p>
            <h3 className="orders-stat-value">227</h3>
          </PlatformAdminCard>
        </div>

        <div className="orders-filters">
          <div className="orders-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="orders-search-input"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="orders-status-filter"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            value={storeFilter} 
            onChange={(e) => setStoreFilter(e.target.value)}
            className="orders-store-filter"
          >
            <option value="all">All Stores</option>
            {stores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>

        <PlatformAdminCard className="orders-table-card">
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Store</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="orders-table-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.store}</td>
                    <td>{order.products} items</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`order-badge ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td className="orders-table-actions">
                      <button className="orders-view-button">
                        <EyeIcon />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PlatformAdminCard>
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminOrders;

