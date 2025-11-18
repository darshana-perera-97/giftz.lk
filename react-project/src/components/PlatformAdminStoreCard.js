import { useState } from 'react';
import PlatformAdminCard from './Card';
import './PlatformAdminStoreCard.css';

// Simple icon components
const StoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

function PlatformAdminStoreCard({
  name,
  description,
  productCount,
  status,
  revenue,
  image,
  icon,
  package: packageType,
  onEdit,
  onToggleVisibility,
  variant = 'admin'
}) {
  const [isVisible, setIsVisible] = useState(status === 'active');

  const handleToggle = (checked) => {
    setIsVisible(checked);
    if (onToggleVisibility) {
      onToggleVisibility(checked);
    }
  };

  return (
    <PlatformAdminCard className="platform-admin-store-card">
      <div className="store-card-image">
        {image ? (
          <img src={image} alt={name} className="store-card-image-content" />
        ) : (
          <div className="store-card-image-placeholder">
            <StoreIcon />
          </div>
        )}
        {variant === 'admin' && (
          <span className={`store-card-badge ${status === 'active' ? 'badge-active' : 'badge-hidden'}`}>
            {status === 'active' ? 'ACTIVE' : 'HIDDEN'}
          </span>
        )}
      </div>
      
      <div className="store-card-content">
        <div className="store-card-header">
          {icon && (
            <div className="store-card-icon">
              {(icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:') || icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg')) ? (
                <img src={icon} alt={`${name} icon`} className="store-card-icon-image" />
              ) : (
                <span className="store-card-icon-emoji">{icon}</span>
              )}
            </div>
          )}
          <div className="store-card-info">
            <h3 className="store-card-name">{name}</h3>
            <p className="store-card-description">{description}</p>
          </div>
        </div>
        
        <div className="store-card-stats">
          <div className="store-card-stat">
            <PackageIcon />
            <span>{productCount} Products</span>
          </div>
          {revenue && (
            <div className="store-card-stat">
              <DollarIcon />
              <span>{revenue}</span>
            </div>
          )}
        </div>
        
        {variant === 'admin' && (
          <div className="store-card-actions">
            <div className="store-card-visibility">
              <span className="store-card-visibility-label">Visibility</span>
              <label className="store-card-switch">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => handleToggle(e.target.checked)}
                />
                <span className="store-card-switch-slider"></span>
              </label>
            </div>
            <button 
              className="store-card-edit-button"
              onClick={onEdit}
            >
              <EditIcon />
              <span>Edit</span>
            </button>
          </div>
        )}
        
        {variant === 'customer' && (
          <button className="store-card-view-button">
            View Store
          </button>
        )}
      </div>
    </PlatformAdminCard>
  );
}

export default PlatformAdminStoreCard;

