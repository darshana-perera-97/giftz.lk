import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';
import CartSidebar from './CartSidebar';
import CustomerProductCard from './CustomerProductCard';
import CustomerFooter from './CustomerFooter';
import PlatformAdminCard from './Card';
import ToastContainer, { toast } from './ToastContainer';
import { fetchItems, fetchStoreById, resolveMediaUrl } from '../utils/api';
import './CustomerStoreDetail.css';

// Icon components
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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

const reviews = [
  { id: '1', customer: 'John Doe', rating: 5, comment: 'Amazing quality! Exceeded my expectations.', date: '2025-11-05' },
  { id: '2', customer: 'Jane Smith', rating: 5, comment: 'Great products and excellent customer service.', date: '2025-11-04' },
  { id: '3', customer: 'Mike Johnson', rating: 4, comment: 'Beautiful items, fast shipping.', date: '2025-11-03' },
];

function CustomerStoreDetail() {
  const navigate = useNavigate();
  const { id: storeId } = useParams();
  const [activeTab, setActiveTab] = useState('products');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [store, setStore] = useState(null);
  const [storeLoading, setStoreLoading] = useState(true);
  const [storeError, setStoreError] = useState('');
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState('');

  useEffect(() => {
    let ignore = false;
    const loadStore = async () => {
      if (!storeId) {
        setStoreError('Store not found.');
        setStoreLoading(false);
        return;
      }
      try {
        setStoreLoading(true);
        const data = await fetchStoreById(storeId);
        if (!ignore) {
          if (!data) {
            setStoreError('Store not found.');
            setStore(null);
          } else {
            setStore(data);
            setStoreError('');
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to load store', error);
          setStoreError('Unable to load store details right now.');
        }
      } finally {
        if (!ignore) {
          setStoreLoading(false);
        }
      }
    };
    loadStore();
    return () => {
      ignore = true;
    };
  }, [storeId]);

  useEffect(() => {
    let ignore = false;
    const loadItems = async () => {
      if (!storeId) {
        setItems([]);
        setItemsLoading(false);
        return;
      }
      try {
        setItemsLoading(true);
        const data = await fetchItems({ storeId, status: 'active' });
        if (!ignore) {
          setItems(Array.isArray(data) ? data : []);
          setItemsError('');
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to load store items', error);
          setItemsError('Unable to load store products right now.');
        }
      } finally {
        if (!ignore) {
          setItemsLoading(false);
        }
      }
    };
    loadItems();
    return () => {
      ignore = true;
    };
  }, [storeId]);

  const normalizedProducts = useMemo(() => {
    if (store && store.status !== 'active') {
      return [];
    }
    return items
      .filter((item) => item.status === 'active')
      .map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        image: resolveMediaUrl(item.images?.[0]),
      }));
  }, [items, store]);

  const storeName = store?.name || 'Store';
  const storeDescription =
    store?.description ||
    'Discover curated gifts, premium collections, and memorable surprises.';
  const productCount = normalizedProducts.length;
  const storeIcon = resolveMediaUrl(store?.icon);
  const storeImage = resolveMediaUrl(store?.image);
  const isStoreInactive = Boolean(store && store.status !== 'active');
  const storeBackgroundImage = isStoreInactive
    ? ''
    : resolveMediaUrl(store?.backgroundImage || '');

  const headerStyles = storeBackgroundImage
    ? {
        backgroundImage: `url(${storeBackgroundImage})`,
      }
    : undefined;
  const headerClassName = storeBackgroundImage
    ? 'customer-store-detail-header has-background'
    : 'customer-store-detail-header';

  const storeBadgeContent = store?.status === 'active' ? 'Verified' : store?.status || 'Store';

  const cartStoreName = store?.name || 'Store';

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      setIsRegisterModalOpen(true);
    } else {
      setIsCommentModalOpen(true);
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
    setIsCommentModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }
    setIsCommentModalOpen(false);
    setRating(0);
    setComment('');
    toast.success('Thank you for your review!');
  };

  const handleAddToCart = (productId) => {
    const product = normalizedProducts.find(p => p.id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        toast.success(`${product.name} quantity updated in cart`);
      } else {
        setCartItems([...cartItems, {
          id: productId,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          storeName: cartStoreName,
        }]);
        toast.success(`${product.name} added to cart`);
      }
      setIsCartOpen(true);
    }
  };

  return (
    <div className="customer-store-detail">
      <CustomerTopNav cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Store Header */}
      <div className={headerClassName} style={headerStyles}>
        {!storeBackgroundImage && (
          <div className="customer-store-detail-header-emoji">
            {storeImage ? (
              <img src={storeImage} alt={storeName} className="customer-store-detail-header-image" />
            ) : storeIcon ? (
              <img src={storeIcon} alt={`${storeName} icon`} className="customer-store-detail-header-image" />
            ) : (
              '🎁'
            )}
          </div>
        )}
      </div>

      {/* Store Info */}
      <div className="customer-store-detail-content">
        <div className="customer-store-detail-info-card">
          <div className="customer-store-detail-info-content">
            <div className="customer-store-detail-info-left">
              <div className="customer-store-detail-name-row">
                <h1 className="customer-store-detail-name">
                  {storeLoading ? 'Loading store...' : storeName}
                </h1>
                {store && (
                  <span className="customer-store-detail-badge">{storeBadgeContent}</span>
                )}
              </div>
              <p className="customer-store-detail-description">
                {storeError ? storeError : storeDescription}
              </p>
              {isStoreInactive && (
                <p className="customer-store-detail-unavailable-text">
                  This store is currently not visible to customers.
                </p>
              )}
              {store && !isStoreInactive && (
                <div className="customer-store-detail-stats">
                  <div className="customer-store-detail-stat">
                    <div className="customer-store-detail-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={true} />
                      ))}
                    </div>
                    <span>4.8 (342 reviews)</span>
                  </div>
                  <div className="customer-store-detail-stat">
                    <PackageIcon />
                    <span>{productCount} Products</span>
                  </div>
                </div>
              )}
            </div>
            <button className="customer-store-detail-follow-button">
              <HeartIcon />
              <span>Follow Store</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        {!isStoreInactive ? (
          <div className="customer-store-detail-tabs">
            <div className="customer-store-detail-tabs-list">
              <button
                className={`customer-store-detail-tab ${activeTab === 'products' ? 'customer-store-detail-tab-active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`customer-store-detail-tab ${activeTab === 'about' ? 'customer-store-detail-tab-active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`customer-store-detail-tab ${activeTab === 'reviews' ? 'customer-store-detail-tab-active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            {activeTab === 'products' && (
              <div className="customer-store-detail-tab-content">
                {itemsLoading ? (
                  <p className="customer-store-detail-placeholder">Loading products...</p>
                ) : itemsError ? (
                  <p className="customer-store-detail-placeholder">{itemsError}</p>
                ) : normalizedProducts.length === 0 ? (
                  <p className="customer-store-detail-placeholder">No products available from this store yet.</p>
                ) : (
                  <div className="customer-store-detail-products-grid">
                    {normalizedProducts.map((product) => (
                      <CustomerProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="customer-store-detail-tab-content">
                <PlatformAdminCard className="customer-store-detail-about-card">
                  <div className="customer-store-detail-about-content">
                    <h3 className="customer-store-detail-about-title">About Our Store</h3>
                    <p className="customer-store-detail-about-text">
                      Luxury Gifts Co. has been providing premium gifts and exclusive collections since 2015. 
                      We believe that every gift should be special and memorable. Our team carefully curates 
                      products from the finest artisans and luxury brands worldwide.
                    </p>
                    <h4 className="customer-store-detail-about-subtitle">Our Values</h4>
                    <ul className="customer-store-detail-about-list">
                      <li>
                        <ChevronRightIcon />
                        <span>Premium quality guaranteed on every product</span>
                      </li>
                      <li>
                        <ChevronRightIcon />
                        <span>Fast and secure worldwide shipping</span>
                      </li>
                      <li>
                        <ChevronRightIcon />
                        <span>Exceptional customer service</span>
                      </li>
                      <li>
                        <ChevronRightIcon />
                        <span>30-day return policy</span>
                      </li>
                    </ul>
                  </div>
                </PlatformAdminCard>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="customer-store-detail-tab-content">
                <div className="customer-store-detail-reviews">
                  <PlatformAdminCard className="customer-store-detail-reviews-header-card">
                    <div className="customer-store-detail-reviews-header">
                      <div>
                        <h3 className="customer-store-detail-reviews-title">Customer Reviews</h3>
                        <div className="customer-store-detail-reviews-rating">
                          <div className="customer-store-detail-stars-large">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} filled={true} />
                            ))}
                          </div>
                          <span>4.8 out of 5 based on 342 reviews</span>
                        </div>
                      </div>
                      <button 
                        className="customer-store-detail-write-review-button"
                        onClick={handleWriteReview}
                      >
                        <PlusIcon />
                        <span>Write a Review</span>
                      </button>
                    </div>
                  </PlatformAdminCard>

                  {reviews.map((review) => (
                  <PlatformAdminCard key={review.id} className="customer-store-detail-review-card">
                    <div className="customer-store-detail-review-header">
                      <div>
                        <p className="customer-store-detail-review-customer">{review.customer}</p>
                        <span className="customer-store-detail-review-date">{review.date}</span>
                      </div>
                      <div className="customer-store-detail-review-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} filled={star <= review.rating} />
                        ))}
                      </div>
                    </div>
                    <p className="customer-store-detail-review-comment">{review.comment}</p>
                  </PlatformAdminCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="customer-store-detail-unavailable-card">
            <PlatformAdminCard>
              <p>This store is currently hidden from customers.</p>
            </PlatformAdminCard>
          </div>
        )}
      </div>

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="modal-overlay" onClick={() => setIsRegisterModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Register to Write a Review</h2>
              <button 
                className="modal-close"
                onClick={() => setIsRegisterModalOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-text">Please register or log in to write a review for this store.</p>
              <div className="modal-form-group">
                <label className="modal-label">Name</label>
                <input type="text" placeholder="Your name" className="modal-input" />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Email Address</label>
                <input type="email" placeholder="your@email.com" className="modal-input" />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Password</label>
                <input type="password" placeholder="Create a password" className="modal-input" />
              </div>
              <div className="modal-actions">
                <button 
                  className="modal-button-primary"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <button 
                  type="button"
                  className="modal-button-outline"
                  onClick={() => setIsRegisterModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {isCommentModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCommentModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Write a Review</h2>
              <button 
                className="modal-close"
                onClick={() => setIsCommentModalOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label className="modal-label">Your Rating</label>
                <div className="customer-review-stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="customer-review-star-button"
                    >
                      <StarIcon filled={star <= (hoverRating || rating)} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Your Review</label>
                <textarea
                  placeholder="Share your experience with this store..."
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="modal-textarea"
                />
              </div>
              <div className="modal-actions">
                <button
                  className="modal-button-primary"
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || !comment}
                >
                  Submit Review
                </button>
                <button 
                  type="button"
                  className="modal-button-outline"
                  onClick={() => setIsCommentModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, quantity) => {
          setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
        }}
        onRemoveItem={(id) => {
          setCartItems(cartItems.filter(item => item.id !== id));
        }}
        onCheckout={() => {
          setIsCartOpen(false);
          toast.info('Proceeding to checkout...');
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
}

export default CustomerStoreDetail;

