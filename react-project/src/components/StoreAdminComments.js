import { useState } from 'react';
import StoreAdminLayout from './StoreAdminLayout';
import PlatformAdminCard from './Card';
import './StoreAdminComments.css';

// Icon components
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg 
    width="20" 
    height="20" 
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
  { id: '1', customer: 'John Doe', product: 'Premium Watch', rating: 5, comment: 'Amazing quality! Exceeded my expectations.', date: '2025-11-07', status: 'approved' },
  { id: '2', customer: 'Jane Smith', product: 'Luxury Bag', rating: 4, comment: 'Great product, fast shipping.', date: '2025-11-06', status: 'approved' },
  { id: '3', customer: 'Mike Johnson', product: 'Gift Set', rating: 5, comment: 'Perfect gift for my wife!', date: '2025-11-07', status: 'pending' },
  { id: '4', customer: 'Sarah Wilson', product: 'Premium Watch', rating: 3, comment: 'Good but a bit expensive.', date: '2025-11-05', status: 'pending' },
  { id: '5', customer: 'Tom Brown', product: 'Designer Sunglasses', rating: 2, comment: 'Not what I expected from the photos.', date: '2025-11-04', status: 'rejected' },
];

function StoreAdminComments() {
  const [comments, setComments] = useState(mockComments);
  const [activeTab, setActiveTab] = useState('all');

  const filteredComments = comments.filter(comment => {
    if (activeTab === 'all') return true;
    return comment.status === activeTab;
  });

  const handleApprove = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };

  const handleReject = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved':
        return 'store-comment-badge-approved';
      case 'pending':
        return 'store-comment-badge-pending';
      case 'rejected':
        return 'store-comment-badge-rejected';
      default:
        return 'store-comment-badge-default';
    }
  };

  const pendingCount = comments.filter(c => c.status === 'pending').length;

  return (
    <StoreAdminLayout>
      <div className="store-comments-page">
        <div className="store-comments-header">
          <div>
            <h1 className="store-comments-title">Comments Management</h1>
            <p className="store-comments-subtitle">Review and moderate customer feedback</p>
          </div>
          {pendingCount > 0 && (
            <span className="store-comments-pending-badge">
              {pendingCount} pending review
            </span>
          )}
        </div>

        <div className="store-comments-stats-grid">
          <PlatformAdminCard className="store-comments-stat-card">
            <p className="store-comments-stat-label">Total Comments</p>
            <h3 className="store-comments-stat-value">{comments.length}</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="store-comments-stat-card">
            <p className="store-comments-stat-label">Pending Review</p>
            <h3 className="store-comments-stat-value">{pendingCount}</h3>
          </PlatformAdminCard>
          <PlatformAdminCard className="store-comments-stat-card">
            <p className="store-comments-stat-label">Average Rating</p>
            <div className="store-comments-rating-display">
              <h3 className="store-comments-stat-value">4.2</h3>
              <div className="store-comments-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star < 4} />
                ))}
              </div>
            </div>
          </PlatformAdminCard>
        </div>

        <div className="store-comments-tabs">
          <button
            className={`store-comments-tab ${activeTab === 'all' ? 'store-comments-tab-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`store-comments-tab ${activeTab === 'pending' ? 'store-comments-tab-active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`store-comments-tab ${activeTab === 'approved' ? 'store-comments-tab-active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
          <button
            className={`store-comments-tab ${activeTab === 'rejected' ? 'store-comments-tab-active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </button>
        </div>

        <div className="store-comments-list">
          {filteredComments.map((comment) => (
            <PlatformAdminCard key={comment.id} className="store-comment-card">
              <div className="store-comment-content">
                <div className="store-comment-header">
                  <div className="store-comment-info">
                    <div className="store-comment-customer-row">
                      <p className="store-comment-customer">{comment.customer}</p>
                      <span className={`store-comment-badge ${getStatusBadgeColor(comment.status)}`}>
                        {comment.status}
                      </span>
                    </div>
                    <p className="store-comment-product">{comment.product}</p>
                  </div>
                  <span className="store-comment-date">{comment.date}</span>
                </div>

                <div className="store-comment-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= comment.rating} />
                  ))}
                </div>

                <p className="store-comment-text">{comment.comment}</p>

                {comment.status === 'pending' && (
                  <div className="store-comment-actions">
                    <button
                      className="store-comment-approve-button"
                      onClick={() => handleApprove(comment.id)}
                    >
                      <EyeIcon />
                      <span>Approve</span>
                    </button>
                    <button
                      className="store-comment-reject-button"
                      onClick={() => handleReject(comment.id)}
                    >
                      <EyeOffIcon />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </PlatformAdminCard>
          ))}
        </div>
      </div>
    </StoreAdminLayout>
  );
}

export default StoreAdminComments;

