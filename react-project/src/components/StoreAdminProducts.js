import { useState } from 'react';
import StoreAdminLayout from './StoreAdminLayout';
import PlatformAdminProductCard from './PlatformAdminProductCard';
import PlatformAdminCard from './Card';
import './StoreAdminProducts.css';

// Icon components
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

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

const ImageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const mockProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, status: 'active', category: 'Luxury' },
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, status: 'active', category: 'Luxury' },
  { id: '3', name: 'Designer Sunglasses', description: 'Stylish UV protection eyewear', price: 189.99, status: 'hidden', category: 'Tech' },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, status: 'active', category: 'Artisan' },
  { id: '5', name: 'Silk Scarf Collection', description: 'Premium silk scarves', price: 79.99, status: 'active', category: 'Personalized' },
  { id: '6', name: 'Watch Bundle', description: 'Set of 3 elegant watches', price: 549.99, status: 'active', category: 'Luxury' },
];

function StoreAdminProducts() {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <StoreAdminLayout>
      <div className="store-products-page">
        <div className="store-products-header">
          <div>
            <h1 className="store-products-title">Products Management</h1>
            <p className="store-products-subtitle">Manage your store products</p>
          </div>
          
          <button 
            className="store-products-create-button"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusIcon />
            <span>Add Product</span>
          </button>
        </div>

        <div className="store-products-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="store-products-search-input"
          />
        </div>

        <div className="store-products-grid">
          {filteredProducts.map((product) => (
            <PlatformAdminProductCard
              key={product.id}
              {...product}
              onEdit={() => handleEdit(product)}
              variant="admin"
            />
          ))}
        </div>

        {/* Create Product Modal */}
        {isCreateModalOpen && (
          <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Add New Product</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="modal-form-group">
                    <label className="modal-label">Product Name</label>
                    <input type="text" placeholder="Enter product name" className="modal-input" />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Description</label>
                    <textarea placeholder="Product description" rows={3} className="modal-textarea"></textarea>
                  </div>
                  <div className="modal-form-grid">
                    <div className="modal-form-group">
                      <label className="modal-label">Category</label>
                      <select className="modal-select" defaultValue="luxury">
                        <option value="luxury">Luxury</option>
                        <option value="tech">Tech</option>
                        <option value="artisan">Artisan</option>
                        <option value="personalized">Personalized</option>
                      </select>
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-label">Price</label>
                      <input type="number" placeholder="0.00" step="0.01" className="modal-input" />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select className="modal-select" defaultValue="active">
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Product Images (Max 5)</label>
                    <div className="modal-upload-area">
                      <UploadIcon />
                      <p className="modal-upload-text">Click to upload or drag and drop</p>
                      <p className="modal-upload-hint">PNG, JPG up to 10MB (Maximum 5 images)</p>
                      <input type="file" accept="image/*" multiple className="modal-input-file" />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="modal-button-primary">
                      Add Product
                    </button>
                    <button 
                      type="button"
                      className="modal-button-outline"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

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
                <form>
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
                      <label className="modal-label">Category</label>
                      <select className="modal-select" defaultValue={selectedProduct.category.toLowerCase()}>
                        <option value="luxury">Luxury</option>
                        <option value="tech">Tech</option>
                        <option value="artisan">Artisan</option>
                        <option value="personalized">Personalized</option>
                      </select>
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-label">Price</label>
                      <input type="number" defaultValue={selectedProduct.price} step="0.01" className="modal-input" />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select className="modal-select" defaultValue={selectedProduct.status}>
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Product Images (Max 5)</label>
                    <div className="modal-images-preview">
                      {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="modal-image-preview-item">
                          <div className="modal-image-preview-placeholder">
                            <ImageIcon />
                          </div>
                          <button className="modal-image-remove">
                            <XIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="modal-upload-area">
                      <UploadIcon />
                      <p className="modal-upload-text">Add more images (Max 5 total)</p>
                      <input type="file" accept="image/*" multiple className="modal-input-file" />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="modal-button-primary">
                      Save Changes
                    </button>
                    <button 
                      type="button"
                      className="modal-button-outline"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreAdminLayout>
  );
}

export default StoreAdminProducts;

