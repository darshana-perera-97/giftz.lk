import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlatformAdminCard from './Card';
import './CustomerProductCard.css';

// Icon components
const GiftIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
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

function CustomerProductCard({
  id,
  name,
  description,
  price,
  image,
  rating = 0,
  reviews = 0,
  onAddToCart,
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    navigate(`/customer/single-product/${id}`);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div 
      className="customer-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PlatformAdminCard className="customer-product-card-inner">
        <div className="customer-product-card-image" onClick={handleClick}>
          {image && !imageError ? (
            <>
              {isLoading && (
                <div className="customer-product-card-image-loading">
                  <div className="customer-product-card-image-spinner"></div>
                </div>
              )}
              <img 
                src={image} 
                alt={name} 
                className={`customer-product-card-image-content ${isHovered ? 'customer-product-card-image-zoom' : ''} ${isLoading ? 'customer-product-card-image-hidden' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="customer-product-card-image-placeholder">
              <GiftIcon />
            </div>
          )}
        </div>
        
        <div className="customer-product-card-content">
          <div className="customer-product-card-info">
            <h4 className="customer-product-card-name" onClick={handleClick}>{name}</h4>
            <p className="customer-product-card-description">{description}</p>
            
            {rating > 0 && (
              <div className="customer-product-card-rating">
                <div className="customer-product-card-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= rating} />
                  ))}
                </div>
                {reviews > 0 && (
                  <span className="customer-product-card-reviews">({reviews})</span>
                )}
              </div>
            )}
          </div>
          
          <div className="customer-product-card-footer">
            <div className="customer-product-card-price">
              <span className="customer-product-card-price-symbol">$</span>
              <span className="customer-product-card-price-amount">{price.toFixed(2)}</span>
            </div>
            
            <button 
              className="customer-product-card-add-button"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) {
                  onAddToCart(id);
                }
              }}
              aria-label={`Add ${name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </PlatformAdminCard>
    </div>
  );
}

export default CustomerProductCard;

