import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';
import CartSidebar from './CartSidebar';
import CustomerProductCard from './CustomerProductCard';
import CustomerFooter from './CustomerFooter';
import ToastContainer, { toast } from './ToastContainer';
import { fetchItems, fetchStores, resolveMediaUrl } from '../utils/api';
import './CustomerAllProducts.css';

// Icon components
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

function CustomerAllProducts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [stores, setStores] = useState([]);
  const [storesError, setStoresError] = useState('');

  useEffect(() => {
    let ignore = false;
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchItems({ status: 'active' });
        if (!ignore) {
          setProducts(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to load products', err);
          setError('Unable to load products right now.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadStores = async () => {
      try {
        const data = await fetchStores();
        if (!ignore) {
          setStores(Array.isArray(data) ? data : []);
          setStoresError('');
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to load stores', err);
          setStoresError('Unable to load store information.');
        }
      }
    };
    loadStores();
    return () => {
      ignore = true;
    };
  }, []);

  const activeStoreIds = useMemo(
    () => stores.filter((store) => store.status === 'active').map((store) => store.id),
    [stores]
  );

  const activeStoreIdSet = useMemo(() => new Set(activeStoreIds), [activeStoreIds]);

  const activeProducts = useMemo(
    () =>
      products
        .filter(
          (product) =>
            product.status === 'active' &&
            product.storeId &&
            activeStoreIdSet.has(product.storeId)
        )
        .map((product) => ({
          ...product,
          price: Number(product.price) || 0,
          image: resolveMediaUrl(product.images?.[0]),
          category: (product.category || 'general').toLowerCase(),
        })),
    [products, activeStoreIdSet]
  );

  const categoryOptions = useMemo(() => {
    const categories = new Set();
    activeProducts.forEach((product) => {
      categories.add(product.category);
    });
    return ['all', ...Array.from(categories).sort()];
  }, [activeProducts]);

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' ||
        product.category === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [activeProducts, categoryFilter, searchQuery]);

  const sortedProducts = useMemo(() => {
    const sortable = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sortable.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortable.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortable.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popular':
      default:
        return sortable.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
    }
  }, [filteredProducts, sortBy]);

  const handleAddToCart = (productId) => {
    const product = activeProducts.find(p => p.id === productId);
    if (product) {
      if (!product.storeId || !activeStoreIdSet.has(product.storeId)) {
        toast.error('This product is not available right now.');
        return;
      }
      const existingItem = cartItems.find(item => item.id === productId);
      const resolvedImage = product.image || resolveMediaUrl(product.images?.[0]);
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
          storeName: 'Store'
        }]);
        toast.success(`${product.name} added to cart`);
      }
      setIsCartOpen(true);
    }
  };

  return (
    <div className="customer-all-products">
      <CustomerTopNav cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Header */}
      <div className="customer-all-products-header">
        <div className="customer-all-products-header-content">
          <h1 className="customer-all-products-title">All Products</h1>
          <p className="customer-all-products-subtitle">Discover our complete collection of premium gifts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="customer-all-products-filters">
        <div className="customer-all-products-filters-content">
          <div className="customer-all-products-search-wrapper">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="customer-all-products-search-input"
            />
          </div>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="customer-all-products-filter-select"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="customer-all-products-filter-select"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="customer-all-products-content">
        <div className="customer-all-products-count">
          {error || storesError || `Showing ${sortedProducts.length} products`}
        </div>

        {isLoading ? (
          <p className="customer-all-products-subtitle">Loading products...</p>
        ) : sortedProducts.length === 0 ? (
          <p className="customer-all-products-subtitle">No products found. Try a different search or filter.</p>
        ) : (
          <div className="customer-all-products-grid">
            {sortedProducts.map((product) => (
              <CustomerProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
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

export default CustomerAllProducts;

