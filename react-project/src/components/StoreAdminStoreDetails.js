import { useState } from 'react';
import StoreAdminLayout from './StoreAdminLayout';
import PlatformAdminCard from './Card';
import './StoreAdminStoreDetails.css';

// Icon components
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
    <path d="m3.5 9.27 9 5.15 9-5.15" />
    <path d="M12 18V9" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CommentsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

function StoreAdminStoreDetails() {
  const [storeData, setStoreData] = useState({
    name: 'Luxury Gifts Co.',
    email: 'admin@luxurygifts.com',
    contactNumber: '+1 (555) 123-4567',
    package: 'Pro',
    description: 'Premium luxury gifts and exclusive collections for every special occasion.',
    keywords: 'luxury, gifts, premium, exclusive',
    themeColor: '#6366f1',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <StoreAdminLayout>
      <div className="store-details-page">
        <div className="store-details-header">
          <div>
            <h1 className="store-details-title">Store Details</h1>
            <p className="store-details-subtitle">Manage your store information and settings</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="store-details-edit-button"
            >
              <EditIcon />
              <span>Edit Details</span>
            </button>
          ) : (
            <div className="store-details-actions">
              <button
                onClick={() => setIsEditing(false)}
                className="store-details-save-button"
              >
                Save Changes
              </button>
              <button 
                className="store-details-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="store-details-grid">
          {/* Store Info - Read Only */}
          <PlatformAdminCard className="store-details-info-card">
            <div className="store-details-card-header">
              <h3 className="store-details-card-title">Store Information</h3>
              <p className="store-details-card-subtitle">View-only information set by Platform Admin</p>
            </div>

            <div className="store-details-info-list">
              <div className="store-details-info-item">
                <label className="store-details-info-label">Store Name</label>
                <p className="store-details-info-value">{storeData.name}</p>
              </div>

              <div className="store-details-info-item">
                <label className="store-details-info-label">Email</label>
                <p className="store-details-info-value">{storeData.email}</p>
              </div>

              <div className="store-details-info-item">
                <label className="store-details-info-label">Contact Number</label>
                <p className="store-details-info-value">{storeData.contactNumber}</p>
              </div>

              <div className="store-details-info-item">
                <label className="store-details-info-label">Package</label>
                <span className="store-details-package-badge">{storeData.package}</span>
              </div>
            </div>
          </PlatformAdminCard>

          {/* Editable Store Details */}
          <PlatformAdminCard className="store-details-content-card">
            <div className="store-details-card-header">
              <h3 className="store-details-card-title">Store Content</h3>
              <p className="store-details-card-subtitle">Customize your store appearance and content</p>
            </div>

            <div className="store-details-content-form">
              <div className="store-details-form-group">
                <label className="store-details-form-label">About Store</label>
                {isEditing ? (
                  <textarea
                    value={storeData.description}
                    onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                    rows={4}
                    placeholder="Describe your store..."
                    className="store-details-textarea"
                  />
                ) : (
                  <p className="store-details-readonly-field">{storeData.description}</p>
                )}
              </div>

              <div className="store-details-form-group">
                <label className="store-details-form-label">Keywords</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={storeData.keywords}
                    onChange={(e) => setStoreData({ ...storeData, keywords: e.target.value })}
                    placeholder="luxury, gifts, premium..."
                    className="store-details-input"
                  />
                ) : (
                  <p className="store-details-readonly-field">{storeData.keywords}</p>
                )}
                <p className="store-details-hint">Comma-separated keywords for better discoverability</p>
              </div>

              <div className="store-details-form-group">
                <label className="store-details-form-label">Store Theme Color</label>
                <div className="store-details-color-group">
                  {isEditing ? (
                    <>
                      <input
                        type="color"
                        value={storeData.themeColor}
                        onChange={(e) => setStoreData({ ...storeData, themeColor: e.target.value })}
                        className="store-details-color-input"
                      />
                      <input
                        type="text"
                        value={storeData.themeColor}
                        onChange={(e) => setStoreData({ ...storeData, themeColor: e.target.value })}
                        placeholder="#6366f1"
                        className="store-details-color-text"
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className="store-details-color-preview"
                        style={{ backgroundColor: storeData.themeColor }}
                      />
                      <p className="store-details-readonly-field">{storeData.themeColor}</p>
                    </>
                  )}
                </div>
                <p className="store-details-hint">This color will be used throughout your store</p>
              </div>
            </div>
          </PlatformAdminCard>
        </div>

        {/* Statistics */}
        <div className="store-details-stats-grid">
          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-primary">
                <PackageIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Total Products</p>
                <h3 className="store-details-stat-value">45</h3>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-secondary">
                <OrdersIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Total Orders</p>
                <h3 className="store-details-stat-value">142</h3>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-success">
                <StarIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Average Rating</p>
                <h3 className="store-details-stat-value">4.8</h3>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-purple">
                <CommentsIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Total Reviews</p>
                <h3 className="store-details-stat-value">87</h3>
              </div>
            </div>
          </PlatformAdminCard>
        </div>
      </div>
    </StoreAdminLayout>
  );
}

export default StoreAdminStoreDetails;

