import { useState } from 'react';
import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminProductCard from './PlatformAdminProductCard';
import './PlatformAdminItems.css';

// Icon components
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const mockProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, status: 'active', store: 'Luxury Gifts Co.' },
  { id: '2', name: 'Handmade Pottery Set', description: 'Beautiful ceramic pottery collection', price: 89.99, status: 'active', store: 'Artisan Crafts' },
  { id: '3', name: 'Smart Home Hub', description: 'Control your entire smart home', price: 149.99, status: 'hidden', store: 'Tech Gadgets Store' },
  { id: '4', name: 'Custom Photo Album', description: 'Personalized leather-bound album', price: 59.99, status: 'active', store: 'Personalized Treasures' },
  { id: '5', name: 'Bamboo Utensil Set', description: 'Eco-friendly kitchen essentials', price: 34.99, status: 'active', store: 'Eco-Friendly Gifts' },
  { id: '6', name: 'Educational Robot Kit', description: 'STEM learning robot for kids', price: 79.99, status: 'active', store: 'Kids Wonderland' },
];

function PlatformAdminItems() {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeFilter, setStoreFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = storeFilter === 'all' || product.store === storeFilter;
    return matchesSearch && matchesStore;
  });

  const stores = Array.from(new Set(products.map(p => p.store)));

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <PlatformAdminLayout>
      <div className="platform-admin-items">
        <div className="items-header">
          <div>
            <h1 className="items-title">All Items Management</h1>
            <p className="items-subtitle">View and manage products across all stores</p>
          </div>
        </div>

        <div className="items-filters">
          <div className="items-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="items-search-input"
            />
          </div>
          <select 
            value={storeFilter} 
            onChange={(e) => setStoreFilter(e.target.value)}
            className="items-store-filter"
          >
            <option value="all">All Stores</option>
            {stores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>

        <div className="items-grid">
          {filteredProducts.map((product) => (
            <PlatformAdminProductCard
              key={product.id}
              {...product}
              onEdit={() => handleEdit(product)}
              variant="admin"
            />
          ))}
        </div>

        {/* Edit Product Modal */}
        {isEditModalOpen && selectedProduct && (
          <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Product</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label className="modal-label">Product Name</label>
                  <input type="text" defaultValue={selectedProduct.name} className="modal-input" />
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Description</label>
                  <textarea defaultValue={selectedProduct.description} rows={3} className="modal-textarea"></textarea>
                </div>
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">Price</label>
                    <input type="number" defaultValue={selectedProduct.price} step="0.01" className="modal-input" />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select className="modal-select" defaultValue={selectedProduct.status}>
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Product Images</label>
                  <div className="modal-image-upload">
                    <UploadIcon />
                    <p className="modal-upload-text">Click to upload or drag and drop</p>
                    <p className="modal-upload-hint">PNG, JPG up to 10MB</p>
                    <input type="file" accept="image/*" multiple className="modal-input-file" />
                  </div>
                  <p className="modal-hint">Current product images will be shown here</p>
                </div>
                <div className="modal-actions">
                  <button className="modal-button-primary">
                    Save Changes
                  </button>
                  <button 
                    className="modal-button-outline"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminItems;

