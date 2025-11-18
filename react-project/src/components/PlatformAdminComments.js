import { useState } from 'react';
import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminCard from './Card';
import './PlatformAdminComments.css';

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

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const mockComments = [
  { id: '1', customer: 'John Doe', store: 'Luxury Gifts Co.', rating: 5, comment: 'Amazing products! High quality and fast shipping.', date: '2025-11-05', status: 'approved' },
  { id: '2', customer: 'Jane Smith', store: 'Artisan Crafts', rating: 4, comment: 'Beautiful handmade items. Will order again.', date: '2025-11-06', status: 'approved' },
  { id: '3', customer: 'Mike Johnson', store: 'Tech Gadgets Store', rating: 5, comment: 'Great tech selection with competitive prices.', date: '2025-11-06', status: 'pending' },
  { id: '4', customer: 'Sarah Wilson', store: 'Personalized Treasures', rating: 5, comment: 'Perfect personalization! Exceeded expectations.', date: '2025-11-07', status: 'approved' },
  { id: '5', customer: 'Tom Brown', store: 'Eco-Friendly Gifts', rating: 4, comment: 'Love the sustainable options available here.', date: '2025-11-07', status: 'pending' },
];

function PlatformAdminComments() {
  const [comments, setComments] = useState(mockComments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    const matchesStore = storeFilter === 'all' || comment.store === storeFilter;
    return matchesSearch && matchesStatus && matchesStore;
  });

  const stores = Array.from(new Set(comments.map(c => c.store)));

  const renderStars = (rating) => {
    return (
      <div className="comments-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= rating} />
        ))}
      </div>
    );
  };

  const handleApprove = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, status: 'approved' }
        : comment
    ));
  };

  return (
    <PlatformAdminLayout>
      <div className="platform-admin-comments">
        <div className="comments-header">
          <div>
            <h1 className="comments-title">All Comments</h1>
            <p className="comments-subtitle">Manage customer reviews across all stores</p>
          </div>
        </div>

        <div className="comments-stats-grid">
          <PlatformAdminCard className="comments-stat-card">
            <p className="comments-stat-label">Total Reviews</p>
            <h3 className="comments-stat-value">1,248</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="comments-stat-card">
            <p className="comments-stat-label">Pending</p>
            <h3 className="comments-stat-value">34</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="comments-stat-card">
            <p className="comments-stat-label">Approved</p>
            <h3 className="comments-stat-value">1,214</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="comments-stat-card">
            <p className="comments-stat-label">Average Rating</p>
            <h3 className="comments-stat-value">4.7</h3>
          </PlatformAdminCard>
        </div>

        <div className="comments-filters">
          <div className="comments-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="comments-search-input"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="comments-status-filter"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
          <select 
            value={storeFilter} 
            onChange={(e) => setStoreFilter(e.target.value)}
            className="comments-store-filter"
          >
            <option value="all">All Stores</option>
            {stores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>

        <PlatformAdminCard className="comments-table-card">
          <div className="comments-table-container">
            <table className="comments-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Store</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="comments-table-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.customer}</td>
                    <td>{comment.store}</td>
                    <td>{renderStars(comment.rating)}</td>
                    <td className="comments-comment-cell">{comment.comment}</td>
                    <td>{comment.date}</td>
                    <td>
                      <span className={`comment-badge ${comment.status === 'approved' ? 'comment-badge-approved' : 'comment-badge-pending'}`}>
                        {comment.status}
                      </span>
                    </td>
                    <td className="comments-table-actions">
                      <div className="comments-actions-group">
                        {comment.status === 'pending' && (
                          <button 
                            className="comments-approve-button"
                            onClick={() => handleApprove(comment.id)}
                          >
                            <CheckIcon />
                            <span>Approve</span>
                          </button>
                        )}
                        <button className="comments-view-button">
                          <EyeIcon />
                          <span>View</span>
                        </button>
                      </div>
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

export default PlatformAdminComments;

