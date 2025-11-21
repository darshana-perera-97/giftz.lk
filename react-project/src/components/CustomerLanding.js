import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';
import CartSidebar from './CartSidebar';
import CustomerStoreCard from './CustomerStoreCard';
import CustomerProductCard from './CustomerProductCard';
import CustomerFooter from './CustomerFooter';
import ToastContainer, { toast } from './ToastContainer';
import { fetchItems, fetchStores, resolveMediaUrl } from '../utils/api';
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

const MAX_FEATURED_STORES = 3;
const MAX_FEATURED_PRODUCTS = 4;

function CustomerLanding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoadingStores, setIsLoadingStores] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [storesError, setStoresError] = useState('');
  const [itemsError, setItemsError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadStores = async () => {
      try {
        setIsLoadingStores(true);
        const data = await fetchStores();
        if (!ignore) {
          setStores(Array.isArray(data) ? data : []);
          setStoresError('');
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to load stores', error);
          setStoresError('Unable to load stores right now.');
        }
      } finally {
        if (!ignore) {
          setIsLoadingStores(false);
        }
      }
    };
    loadStores();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadItems = async () => {
      try {
        setIsLoadingItems(true);
        const data = await fetchItems({ status: 'active' });
        if (!ignore) {
          setItems(Array.isArray(data) ? data : []);
          setItemsError('');
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to load items', error);
          setItemsError('Unable to load items right now.');
        }
      } finally {
        if (!ignore) {
          setIsLoadingItems(false);
        }
      }
    };
    loadItems();
    return () => {
      ignore = true;
    };
  }, []);

  const activeItems = useMemo(
    () => items.filter((item) => item.status === 'active'),
    [items]
  );

  const storeLookup = useMemo(() => {
    return stores.reduce((acc, store) => {
      acc[store.id] = store;
      return acc;
    }, {});
  }, [stores]);

  const activeStoreIds = useMemo(
    () => stores.filter((store) => store.status === 'active').map((store) => store.id),
    [stores]
  );

  const activeStoreIdSet = useMemo(() => new Set(activeStoreIds), [activeStoreIds]);

  const storeItemCounts = useMemo(() => {
    return activeItems.reduce((acc, item) => {
      if (!item.storeId || !activeStoreIdSet.has(item.storeId)) {
        return acc;
      }
      acc[item.storeId] = (acc[item.storeId] || 0) + 1;
      return acc;
    }, {});
  }, [activeItems, activeStoreIdSet]);

  const featuredStores = useMemo(() => {
    return stores
      .filter((store) => activeStoreIdSet.has(store.id))
      .map((store) => ({
        ...store,
        productCount: storeItemCounts[store.id] ?? store.productCount ?? 0,
        image: resolveMediaUrl(store.image),
        icon: resolveMediaUrl(store.icon),
      }))
      .slice(0, MAX_FEATURED_STORES);
  }, [storeItemCounts, stores]);

  const featuredProducts = useMemo(() => {
    return activeItems
      .filter((item) => (item.storeId ? activeStoreIdSet.has(item.storeId) : false))
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      )
      .slice(0, MAX_FEATURED_PRODUCTS)
      .map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        image: resolveMediaUrl(item.images?.[0]),
      }));
  }, [activeItems, activeStoreIdSet]);

  const handleAddToCart = (productId) => {
    const product = activeItems.find((p) => p.id === productId);
    if (product) {
      if (!product.storeId || !activeStoreIdSet.has(product.storeId)) {
        toast.error('This product is not available right now.');
        return;
      }
      const existingItem = cartItems.find(item => item.id === productId);
      const resolvedImage = resolveMediaUrl(product.images?.[0]);
      const storeName = storeLookup[product.storeId]?.name || 'Featured Store';
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
          price: Number(product.price) || 0,
          quantity: 1,
          image: resolvedImage,
          storeName,
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
          <p className="customer-section-subtitle">
            {storesError || 'Discover our handpicked selection of premium stores'}
          </p>
        </div>

        {isLoadingStores ? (
          <p className="customer-section-subtitle">Loading available stores...</p>
        ) : featuredStores.length === 0 ? (
          <p className="customer-section-subtitle">No stores available yet. Please check back soon.</p>
        ) : (
          <div className="customer-stores-grid">
            {featuredStores.map((store) => (
              <CustomerStoreCard key={store.id} {...store} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="customer-section customer-section-gray">
        <div className="customer-section-header">
          <h2 className="customer-section-title">Trending Gifts</h2>
          <p className="customer-section-subtitle">
            {itemsError || 'Most popular gifts this season'}
          </p>
        </div>
        
        {isLoadingItems ? (
          <p className="customer-section-subtitle">Loading featured gifts...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="customer-section-subtitle">No items available yet. New gifts will appear here soon.</p>
        ) : (
          <div className="customer-products-grid">
            {featuredProducts.map((product) => (
              <CustomerProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
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

