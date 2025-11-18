import { useState } from 'react';
import StoreAdminLayout from './StoreAdminLayout';
import PlatformAdminCard from './Card';
import './StoreAdminOrders.css';

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

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', email: 'john@example.com', products: 2, total: 599.98, status: 'completed', date: '2025-11-05' },
  { id: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', products: 1, total: 149.99, status: 'processing', date: '2025-11-06' },
  { id: '#ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', products: 3, total: 849.97, status: 'shipped', date: '2025-11-06' },
  { id: '#ORD-004', customer: 'Sarah Wilson', email: 'sarah@example.com', products: 1, total: 549.99, status: 'completed', date: '2025-11-07' },
  { id: '#ORD-005', customer: 'Tom Brown', email: 'tom@example.com', products: 2, total: 399.98, status: 'processing', date: '2025-11-07' },
];

function StoreAdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'store-order-badge-completed';
      case 'processing':
        return 'store-order-badge-processing';
      case 'shipped':
        return 'store-order-badge-shipped';
      default:
        return 'store-order-badge-default';
    }
  };

  const handleChangeStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsStatusModalOpen(true);
  };

  const saveStatusChange = () => {
    if (selectedOrder) {
      setOrders(orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: newStatus }
          : order
      ));
      setIsStatusModalOpen(false);
    }
  };

  return (
    <StoreAdminLayout>
      <div className="store-orders-page">
        <div className="store-orders-header">
          <div>
            <h1 className="store-orders-title">Orders Management</h1>
            <p className="store-orders-subtitle">Track and manage customer orders</p>
          </div>
        </div>

        <div className="store-orders-stats-grid">
          <PlatformAdminCard className="store-orders-stat-card">
            <p className="store-orders-stat-label">Total Orders</p>
            <h3 className="store-orders-stat-value">142</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="store-orders-stat-card">
            <p className="store-orders-stat-label">Processing</p>
            <h3 className="store-orders-stat-value">23</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="store-orders-stat-card">
            <p className="store-orders-stat-label">Shipped</p>
            <h3 className="store-orders-stat-value">45</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="store-orders-stat-card">
            <p className="store-orders-stat-label">Completed</p>
            <h3 className="store-orders-stat-value">74</h3>
          </PlatformAdminCard>
        </div>

        <div className="store-orders-filters">
          <div className="store-orders-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="store-orders-search-input"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="store-orders-filter-select"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <PlatformAdminCard className="store-orders-table-card">
          <table className="store-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th className="store-orders-table-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div>
                      <p>{order.customer}</p>
                      <p className="store-orders-table-email">{order.email}</p>
                    </div>
                  </td>
                  <td>{order.products} items</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`store-order-badge ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td className="store-orders-table-actions">
                    <div className="store-orders-actions-group">
                      <button className="store-orders-action-button">
                        <EyeIcon />
                        <span>View</span>
                      </button>
                      <button 
                        className="store-orders-action-button"
                        onClick={() => handleChangeStatus(order)}
                      >
                        <EditIcon />
                        <span>Status</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PlatformAdminCard>

        {/* Change Status Modal */}
        {isStatusModalOpen && selectedOrder && (
          <div className="modal-overlay" onClick={() => setIsStatusModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Change Order Status</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsStatusModalOpen(false)}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label className="modal-label">Order ID</label>
                  <p className="modal-readonly-field">{selectedOrder.id}</p>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Customer</label>
                  <p className="modal-readonly-field">{selectedOrder.customer}</p>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">New Status</label>
                  <select 
                    className="modal-select" 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button 
                    className="modal-button-primary"
                    onClick={saveStatusChange}
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    className="modal-button-outline"
                    onClick={() => setIsStatusModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreAdminLayout>
  );
}

export default StoreAdminOrders;

