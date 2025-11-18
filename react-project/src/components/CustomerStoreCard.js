import { useNavigate } from 'react-router-dom';
import PlatformAdminCard from './Card';
import './CustomerStoreCard.css';

// Icon components
const StoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
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

function CustomerStoreCard({
  id,
  name,
  description,
  productCount,
  image,
  icon,
}) {
  const navigate = useNavigate();

  const handleViewStore = () => {
    navigate(`/customer/store-detail/${id}`);
  };

  return (
    <PlatformAdminCard className="customer-store-card">
      <div className="customer-store-card-image" onClick={handleViewStore}>
        {image ? (
          <img src={image} alt={name} className="customer-store-card-image-content" />
        ) : (
          <div className="customer-store-card-image-placeholder">
            {icon ? (
              (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:') || icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg')) ? (
                <img src={icon} alt={`${name} icon`} className="customer-store-card-icon-image" />
              ) : (
                <span className="customer-store-card-icon-emoji">{icon}</span>
              )
            ) : (
              <StoreIcon />
            )}
          </div>
        )}
      </div>
      
      <div className="customer-store-card-content">
        <div className="customer-store-card-header">
          {icon && !image && (
            <div className="customer-store-card-icon">
              {(icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:') || icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg')) ? (
                <img src={icon} alt={`${name} icon`} className="customer-store-card-icon-image" />
              ) : (
                <span className="customer-store-card-icon-emoji">{icon}</span>
              )}
            </div>
          )}
          <div className="customer-store-card-info">
            <h3 className="customer-store-card-name">{name}</h3>
            <p className="customer-store-card-description">{description}</p>
          </div>
        </div>
        
        <div className="customer-store-card-stats">
          <div className="customer-store-card-stat">
            <PackageIcon />
            <span>{productCount} Products</span>
          </div>
        </div>
        
        <button 
          className="customer-store-card-view-button"
          onClick={handleViewStore}
        >
          View Store
        </button>
      </div>
    </PlatformAdminCard>
  );
}

export default CustomerStoreCard;

