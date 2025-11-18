import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';
import CartSidebar from './CartSidebar';
import CustomerStoreCard from './CustomerStoreCard';
import CustomerFooter from './CustomerFooter';
import ToastContainer, { toast } from './ToastContainer';
import './CustomerStoreList.css';

// Icon components
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const StoreIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </svg>
);

const allStores = [
  { id: '1', name: 'Luxury Gifts Co.', description: 'Premium luxury gifts and exclusive collections', productCount: 45, status: 'active' },
  { id: '2', name: 'Artisan Crafts', description: 'Handmade artisan products from local creators', productCount: 32, status: 'active' },
  { id: '3', name: 'Tech Gadgets Store', description: 'Latest tech gifts and innovative gadgets', productCount: 67, status: 'active' },
  { id: '4', name: 'Personalized Treasures', description: 'Custom personalized gifts for every occasion', productCount: 28, status: 'active' },
  { id: '5', name: 'Eco-Friendly Gifts', description: 'Sustainable and environmentally conscious products', productCount: 41, status: 'active' },
  { id: '6', name: 'Kids Wonderland', description: 'Amazing gifts and toys for children', productCount: 89, status: 'active' },
  { id: '7', name: 'Gourmet Delights', description: 'Premium food and beverage gifts', productCount: 52, status: 'active' },
  { id: '8', name: 'Home & Living', description: 'Elegant home decor and lifestyle products', productCount: 73, status: 'active' },
];

function CustomerStoreList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const filteredStores = allStores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Luxury', 'Tech', 'Artisan', 'Kids', 'Home'];

  return (
    <div className="customer-store-list">
      <CustomerTopNav cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Header */}
      <div className="customer-store-list-header">
        <div className="customer-store-list-header-content">
          <h1 className="customer-store-list-title">Explore All Stores</h1>
          <p className="customer-store-list-subtitle">
            Browse through our collection of {allStores.length} premium gift stores
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="customer-store-list-filters">
        <div className="customer-store-list-search-card">
          <div className="customer-store-list-search-container">
            <div className="customer-store-list-search-wrapper">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="customer-store-list-search-input"
              />
            </div>
            <button className="customer-store-list-filter-button">
              <FilterIcon />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="customer-store-list-categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`customer-store-list-category ${selectedCategory === category.toLowerCase() ? 'customer-store-list-category-active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Store Grid */}
      <div className="customer-store-list-content">
        {filteredStores.length === 0 ? (
          <div className="customer-store-list-empty">
            <StoreIcon />
            <h3 className="customer-store-list-empty-title">No stores found</h3>
            <p className="customer-store-list-empty-text">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="customer-store-list-grid">
            {filteredStores.map((store) => (
              <CustomerStoreCard key={store.id} {...store} />
            ))}
          </div>
        )}
      </div>

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

export default CustomerStoreList;

