import { useState } from 'react';
import PlatformAdminCard from './Card';
import './PlatformAdminProductCard.css';

// Simple icon components
const GiftIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

function PlatformAdminProductCard({
  name,
  description,
  price,
  image,
  status,
  store,
  onEdit,
  variant = 'admin'
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="platform-admin-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PlatformAdminCard className="product-card-inner">
        <div className="product-card-image">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className={`product-card-image-content ${isHovered ? 'product-card-image-zoom' : ''}`}
            />
          ) : (
            <div className="product-card-image-placeholder">
              <GiftIcon />
            </div>
          )}
          
          {variant === 'admin' && status && (
            <span className={`product-card-badge ${status === 'active' ? 'badge-active' : 'badge-hidden'}`}>
              {status.toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="product-card-content">
          <div className="product-card-info">
            <h4 className="product-card-name">{name}</h4>
            <p className="product-card-description">{description}</p>
            {store && (
              <p className="product-card-store">Store: {store}</p>
            )}
          </div>
          
          <div className="product-card-footer">
            <div className="product-card-price">
              <span className="product-card-price-symbol">$</span>
              <span className="product-card-price-amount">{price.toFixed(2)}</span>
            </div>
            
            {variant === 'admin' && (
              <button 
                className="product-card-edit-button"
                onClick={onEdit}
              >
                <EditIcon />
                <span>Edit Product</span>
              </button>
            )}
          </div>
        </div>
      </PlatformAdminCard>
    </div>
  );
}

export default PlatformAdminProductCard;

