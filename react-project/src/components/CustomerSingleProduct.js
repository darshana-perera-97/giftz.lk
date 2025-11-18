import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';
import CartSidebar from './CartSidebar';
import CustomerProductCard from './CustomerProductCard';
import CustomerFooter from './CustomerFooter';
import PlatformAdminCard from './Card';
import ToastContainer, { toast } from './ToastContainer';
import './CustomerSingleProduct.css';

// Icon components
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
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

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const productImages = [
  'https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjI0ODQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
];

const relatedProducts = [
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, rating: 5, reviews: 94 },
  { id: '5', name: 'Silk Scarf Collection', description: 'Premium silk scarves', price: 79.99, rating: 4, reviews: 56 },
  { id: '6', name: 'Watch Bundle', description: 'Set of 3 elegant watches', price: 549.99, rating: 5, reviews: 189 },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, rating: 5, reviews: 203 },
];

function CustomerSingleProduct() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    contactNumber: '',
  });

  const handleConfirmPurchase = () => {
    if (!customerData.name || !customerData.email || !customerData.contactNumber) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsBuyModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const confirmOrder = () => {
    setIsConfirmModalOpen(false);
    toast.success('Order confirmed! Thank you for your purchase.');
    // Reset form
    setCustomerData({ name: '', email: '', contactNumber: '' });
    setQuantity(1);
  };

  const handleAddToCart = () => {
    const product = {
      id: '1',
      name: 'Premium Watch',
      price: 299.99,
      quantity: quantity,
      image: productImages[0],
      storeName: 'Luxury Gifts Co.'
    };
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    setIsBuyModalOpen(true);
  };

  const renderStars = (rating) => {
    return (
      <div className="customer-product-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= rating} />
        ))}
      </div>
    );
  };

  return (
    <div className="customer-single-product">
      <CustomerTopNav cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="customer-single-product-content">
        {/* Breadcrumb */}
        <div className="customer-single-product-breadcrumb">
          <button onClick={() => navigate('/customer/landing')}>Home</button>
          <ChevronRightIcon />
          <button onClick={() => navigate('/customer/all-products')}>All Products</button>
          <ChevronRightIcon />
          <span>Premium Watch</span>
        </div>

        <div className="customer-single-product-main">
          {/* Images */}
          <div className="customer-single-product-images">
            <div className="customer-single-product-main-image">
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="customer-single-product-image-content"
              />
            </div>
            <div className="customer-single-product-thumbnails">
              {productImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`customer-single-product-thumbnail ${selectedImage === idx ? 'customer-single-product-thumbnail-active' : ''}`}
                >
                  <img src={image} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="customer-single-product-info">
            <div className="customer-single-product-header">
              <span className="customer-single-product-badge">Luxury</span>
              <h1 className="customer-single-product-name">Premium Watch</h1>
              <div className="customer-single-product-rating-row">
                {renderStars(5)}
                <span className="customer-single-product-reviews">(128 reviews)</span>
              </div>
              <h2 className="customer-single-product-price">$299.99</h2>
            </div>

            <div className="customer-single-product-description-section">
              <p className="customer-single-product-description">
                Luxury timepiece with premium materials. This exquisite watch combines traditional craftsmanship with modern design. Features include sapphire crystal glass, water resistance, and automatic movement. Perfect for any occasion.
              </p>
            </div>

            <div className="customer-single-product-actions-section">
              <div className="customer-single-product-quantity">
                <label className="customer-single-product-quantity-label">Quantity</label>
                <div className="customer-single-product-quantity-controls">
                  <button
                    className="customer-single-product-quantity-button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="customer-single-product-quantity-value">{quantity}</span>
                  <button
                    className="customer-single-product-quantity-button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="customer-single-product-buttons">
                <button
                  className="customer-single-product-buy-button"
                  onClick={handleBuyNow}
                  aria-label="Buy now"
                >
                  <CartIcon />
                  <span>Buy Now</span>
                </button>
                <button 
                  className="customer-single-product-wishlist-button"
                  onClick={handleAddToCart}
                  aria-label="Add to wishlist"
                >
                  <HeartIcon />
                </button>
              </div>
            </div>

            <div className="customer-single-product-details">
              <div className="customer-single-product-detail-item">
                <StoreIcon />
                <span>Sold by: <strong>Luxury Gifts Co.</strong></span>
              </div>
              <div className="customer-single-product-detail-item">
                <PackageIcon />
                <span>Free shipping on orders over $100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="customer-single-product-related">
          <h2 className="customer-single-product-related-title">You May Also Like</h2>
          <div className="customer-single-product-related-grid">
            {relatedProducts.map((product) => (
              <CustomerProductCard
                key={product.id}
                {...product}
                onAddToCart={() => {
                  setCartItems([...cartItems, { ...product, quantity: 1, storeName: 'Store' }]);
                  setIsCartOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {isBuyModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBuyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Complete Your Purchase</h2>
              <button 
                className="modal-close"
                onClick={() => setIsBuyModalOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="customer-purchase-summary">
                <div className="customer-purchase-item">
                  <span>Premium Watch × {quantity}</span>
                  <span>${(299.99 * quantity).toFixed(2)}</span>
                </div>
                <div className="customer-purchase-total">
                  <span>Total</span>
                  <span>${(299.99 * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={customerData.contactNumber}
                  onChange={(e) => setCustomerData({ ...customerData, contactNumber: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div className="modal-actions">
                <button
                  className="modal-button-primary"
                  onClick={handleConfirmPurchase}
                >
                  Continue to Payment
                </button>
                <button 
                  type="button"
                  className="modal-button-outline"
                  onClick={() => setIsBuyModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmModalOpen && (
        <div className="modal-overlay" onClick={() => setIsConfirmModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Confirm Your Order</h2>
              <button 
                className="modal-close"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-text">
                Are you sure you want to purchase Premium Watch × {quantity} for ${(299.99 * quantity).toFixed(2)}?
              </p>
              <div className="customer-confirm-details">
                <p><strong>Name:</strong> {customerData.name || 'Not provided'}</p>
                <p><strong>Email:</strong> {customerData.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> {customerData.contactNumber || 'Not provided'}</p>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="modal-button-outline"
                  onClick={() => setIsConfirmModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="modal-button-primary"
                  onClick={confirmOrder}
                >
                  Confirm Order
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

export default CustomerSingleProduct;

