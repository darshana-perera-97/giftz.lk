import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';
import CartSidebar from './CartSidebar';
import CustomerStoreCard from './CustomerStoreCard';
import CustomerProductCard from './CustomerProductCard';
import CustomerFooter from './CustomerFooter';
import ToastContainer, { toast } from './ToastContainer';
import './CustomerLanding.css';

// Icon components
const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const GiftIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const PackageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
    <path d="m3.5 9.27 9 5.15 9-5.15" />
    <path d="M12 18V9" />
  </svg>
);

const HeartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const TagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const heroSlides = [
  {
    title: 'Discover Premium Gifts',
    description: 'Explore curated collections from the finest stores. Find the perfect gift for every occasion.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600',
  },
  {
    title: 'Luxury Collections',
    description: 'Handpicked luxury items from around the world. Exceptional quality meets timeless design.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600',
  },
  {
    title: 'Perfect for Every Occasion',
    description: 'From birthdays to anniversaries, find gifts that create unforgettable moments.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600',
  },
];

const featuredStores = [
  { id: '1', name: 'Luxury Gifts Co.', description: 'Premium luxury gifts and exclusive collections', productCount: 45, status: 'active', icon: '🎁', image: 'https://images.unsplash.com/photo-1700142678566-601b048b39db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0c3xlbnwxfHx8fDE3NjI0ODQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '2', name: 'Artisan Crafts', description: 'Handmade artisan products from local creators', productCount: 32, status: 'active', icon: '🎨', image: 'https://images.unsplash.com/photo-1669207261271-a0041d4b0948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc3RvcmV8ZW58MXx8fHwxNzYyNDg0OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '3', name: 'Personalized Treasures', description: 'Custom personalized gifts for every occasion', productCount: 28, status: 'active', icon: '✨', image: 'https://images.unsplash.com/photo-1625552185153-7a8d8f3794a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwcHJlc2VudHxlbnwxfHx8fDE3NjI0MzI4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
];

const featuredProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, rating: 5, reviews: 128, image: 'https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjI0ODQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, rating: 5, reviews: 94 },
  { id: '3', name: 'Designer Sunglasses', description: 'Stylish UV protection eyewear', price: 189.99, rating: 4, reviews: 67 },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, rating: 5, reviews: 203 },
];

function CustomerLanding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (productId) => {
    const product = featuredProducts.find(p => p.id === productId);
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
          storeName: 'Featured Store'
        }]);
        toast.success(`${product.name} added to cart`);
      }
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsCartOpen(false);
    toast.info('Proceeding to checkout...');
    // Navigate to checkout page would go here
  };

  return (
    <div className="customer-landing">
      <CustomerTopNav cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Slider */}
      <section className="customer-hero">
        <div className="customer-hero-slide">
          <div className="customer-hero-overlay"></div>
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="customer-hero-image"
          />
          <div className="customer-hero-content">
            <div className="customer-hero-text">
              <h1 className="customer-hero-title">{heroSlides[currentSlide].title}</h1>
              <p className="customer-hero-description">
                {heroSlides[currentSlide].description}
              </p>
              <div className="customer-hero-actions">
                <button 
                  className="customer-hero-button customer-hero-button-primary"
                  onClick={() => navigate('/customer/stores')}
                >
                  Browse Stores
                </button>
                <button 
                  className="customer-hero-button customer-hero-button-outline"
                  onClick={() => navigate('/customer/all-products')}
                >
                  View Gifts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="customer-hero-dots">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`customer-hero-dot ${idx === currentSlide ? 'customer-hero-dot-active' : ''}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="customer-hero-nav customer-hero-nav-left"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="customer-hero-nav customer-hero-nav-right"
        >
          <ChevronRightIcon />
        </button>
      </section>

      {/* Banner Section 1 */}
      <section className="customer-banner-section customer-banner-section-primary">
        <div className="customer-banner-content">
          <p className="customer-banner-label">Limited Time • Premium Gifts</p>
          <h2 className="customer-banner-title">Luxury Gift Festival</h2>
          <p className="customer-banner-subtitle">Save up to 30% on curated premium bundles, handcrafted exclusives, and personalized treasures.</p>
          <div className="customer-banner-highlights">
            <div>
              <span className="customer-banner-highlight-value">120+</span>
              <span className="customer-banner-highlight-label">Curated Sets</span>
            </div>
            <div>
              <span className="customer-banner-highlight-value">48h</span>
              <span className="customer-banner-highlight-label">Express Delivery</span>
            </div>
            <div>
              <span className="customer-banner-highlight-value">15</span>
              <span className="customer-banner-highlight-label">Partner Stores</span>
            </div>
          </div>
          <div className="customer-banner-actions">
            <button 
              className="customer-banner-button"
              onClick={() => navigate('/customer/all-products')}
            >
              Shop Festival Deals
            </button>
            <button 
              className="customer-banner-button-outline"
              onClick={() => navigate('/customer/stores')}
            >
              Explore Stores
            </button>
          </div>
        </div>
        <div className="customer-banner-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&fm=png"
            alt="Premium gift illustration"
            className="customer-banner-image"
            loading="lazy"
          />
        </div>
      </section>

      {/* Featured Stores */}
      <section className="customer-section">
        <div className="customer-section-header">
          <h2 className="customer-section-title">Featured Stores</h2>
          <p className="customer-section-subtitle">Discover our handpicked selection of premium stores</p>
        </div>
        
        <div className="customer-stores-grid">
          {featuredStores.map((store) => (
            <CustomerStoreCard key={store.id} {...store} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="customer-section customer-section-gray">
        <div className="customer-section-header">
          <h2 className="customer-section-title">Trending Gifts</h2>
          <p className="customer-section-subtitle">Most popular gifts this season</p>
        </div>
        
        <div className="customer-products-grid">
          {featuredProducts.map((product) => (
            <CustomerProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Banner Section 2 */}
      <section className="customer-banner-section customer-banner-section-secondary">
        <div className="customer-banner-content">
          <p className="customer-banner-label">Season 02 • Signature Line</p>
          <h2 className="customer-banner-title">Midnight Luxe Collection</h2>
          <p className="customer-banner-subtitle">Handpicked statement pieces featuring navy, gold, and smoked glass finishes—perfect for evening gifting.</p>
          <ul className="customer-banner-list">
            <li>Artisan-crafted décor with limited edition finishes</li>
            <li>Complimentary engraving & premium wrap service</li>
            <li>Priority concierge support for members</li>
          </ul>
          <div className="customer-banner-actions">
            <button 
              className="customer-banner-button-secondary"
              onClick={() => navigate('/customer/store-detail/1')}
            >
              View Collection
            </button>
            <button 
              className="customer-banner-button-outline"
              onClick={() => navigate('/customer/all-products')}
            >
              Browse All Gifts
            </button>
          </div>
        </div>
        <div className="customer-banner-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&fm=png"
            alt="Gift box illustration"
            className="customer-banner-image"
            loading="lazy"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="customer-section">
        <div className="customer-section-header">
          <h2 className="customer-section-title">Shop by Category</h2>
          <p className="customer-section-subtitle">Find exactly what you're looking for</p>
        </div>
        
        <div className="customer-categories-grid">
          <button className="customer-category-card customer-category-luxury">
            <GiftIcon />
            <h4>Luxury</h4>
          </button>
          <button className="customer-category-card customer-category-tech">
            <PackageIcon />
            <h4>Tech</h4>
          </button>
          <button className="customer-category-card customer-category-artisan">
            <HeartIcon />
            <h4>Artisan</h4>
          </button>
          <button className="customer-category-card customer-category-personalized">
            <TagIcon />
            <h4>Personalized</h4>
          </button>
        </div>
      </section>

      {/* Join as Seller */}
      <section className="customer-seller-section">
        <div className="customer-seller-content">
          <h2 className="customer-seller-title">Join as a Seller</h2>
          <p className="customer-seller-subtitle">
            Start your own store and reach thousands of customers. Set up your shop in minutes.
          </p>
          <div className="customer-seller-form">
            <input
              type="text"
              placeholder="Your name"
              className="customer-seller-input"
            />
            <input
              type="email"
              placeholder="Your email"
              className="customer-seller-input"
            />
            <input
              type="text"
              placeholder="Store name"
              className="customer-seller-input"
            />
            <button className="customer-seller-button">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
}

export default CustomerLanding;

