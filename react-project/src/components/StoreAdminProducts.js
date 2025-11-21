import { useEffect, useState } from 'react';
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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const MAX_IMAGES = 5;

function StoreAdminProducts() {
  const storeId = typeof window !== 'undefined' ? localStorage.getItem('storeAdminStoreId') : null;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [createError, setCreateError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const [editError, setEditError] = useState('');
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    category: 'luxury',
    price: '',
    status: 'active',
  });
  const [productImages, setProductImages] = useState([]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/media')) {
      const base = API_BASE_URL.replace(/\/$/, '');
      return `${base}${url}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeId) {
        setError('Store ID not found. Please log in again.');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(`${API_BASE_URL}/api/store-items?storeId=${storeId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load products');
        }
        const normalized = Array.isArray(data.items)
          ? data.items.map((item) => ({
              ...item,
              previewImage: item.images?.length ? resolveMediaUrl(item.images[0]) : '',
            }))
          : [];
        setProducts(normalized);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [storeId]);

  const resetCreateForm = () => {
    setCreateFormData({
      name: '',
      description: '',
      category: 'luxury',
      price: '',
      status: 'active',
    });
    setProductImages([]);
    setCreateError('');
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    resetCreateForm();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name || '',
      description: product.description || '',
      category: (product.category || 'luxury').toLowerCase(),
      price: product.price ? String(product.price) : '',
      status: product.status || 'active',
    });
    setEditError('');
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setEditFormData(null);
    setIsEditSubmitting(false);
    setEditError('');
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const availableSlots = MAX_IMAGES - productImages.length;
    if (availableSlots <= 0) {
      setCreateError(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const filesToProcess = files.slice(0, availableSlots);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    try {
      const base64Images = await Promise.all(filesToProcess.map((file) => toBase64(file)));
      setProductImages((prev) => [...prev, ...base64Images]);
      setCreateError('');
    } catch (err) {
      setCreateError('Failed to read one of the images. Please try again.');
    }
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    if (!storeId) {
      setCreateError('Store ID not found. Please log in again.');
      return;
    }

    if (!createFormData.name.trim() || !createFormData.description.trim()) {
      setCreateError('Name and description are required.');
      return;
    }

    if (!createFormData.price || Number(createFormData.price) <= 0) {
      setCreateError('Enter a valid price greater than 0.');
      return;
    }

    try {
      setIsSubmitting(true);
      setCreateError('');
      const response = await fetch(`${API_BASE_URL}/api/store-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId,
          name: createFormData.name,
          description: createFormData.description,
          category: createFormData.category,
          price: Number(createFormData.price),
          status: createFormData.status,
          images: productImages,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create product');
      }

      const newItem = {
        ...data.item,
        previewImage: data.item.images?.length ? resolveMediaUrl(data.item.images[0]) : '',
      };
      setProducts((prev) => [...prev, newItem]);
      closeCreateModal();
    } catch (err) {
      setCreateError(err.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (event) => {
    event.preventDefault();
    if (!storeId || !selectedProduct || !editFormData) {
      setEditError('Unable to update this product. Please reload and try again.');
      return;
    }

    if (!editFormData.name.trim() || !editFormData.description.trim()) {
      setEditError('Name and description are required.');
      return;
    }

    if (!editFormData.price || Number(editFormData.price) <= 0) {
      setEditError('Enter a valid price greater than 0.');
      return;
    }

    try {
      setIsEditSubmitting(true);
      setEditError('');
      const response = await fetch(`${API_BASE_URL}/api/store-items/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId,
          name: editFormData.name,
          description: editFormData.description,
          category: editFormData.category,
          price: Number(editFormData.price),
          status: editFormData.status,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update product');
      }

      const updatedItem = {
        ...selectedProduct,
        ...data.item,
        previewImage: selectedProduct.previewImage,
      };

      setProducts((prev) =>
        prev.map((product) => (product.id === updatedItem.id ? updatedItem : product))
      );
      closeEditModal();
    } catch (err) {
      setEditError(err.message || 'Failed to update product');
    } finally {
      setIsEditSubmitting(false);
    }
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
            onClick={() => {
              resetCreateForm();
              setIsCreateModalOpen(true);
            }}
            disabled={!storeId}
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

        {isLoading ? (
          <div className="store-products-status">Loading products...</div>
        ) : error ? (
          <div className="store-products-status store-products-status-error">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="store-products-status">No products found. Use the button above to add one.</div>
        ) : (
          <div className="store-products-grid">
            {filteredProducts.map((product) => (
              <PlatformAdminProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={Number(product.price) || 0}
                status={product.status}
                image={product.previewImage}
                onEdit={() => handleEdit(product)}
                variant="admin"
              />
            ))}
          </div>
        )}

        {/* Create Product Modal */}
        {isCreateModalOpen && (
          <div className="modal-overlay" onClick={closeCreateModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Add New Product</h2>
                <button 
                  className="modal-close"
                  onClick={closeCreateModal}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateProduct}>
                  <div className="modal-form-group">
                    <label className="modal-label">Product Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter product name" 
                      className="modal-input"
                      value={createFormData.name}
                      onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Description</label>
                    <textarea 
                      placeholder="Product description" 
                      rows={3} 
                      className="modal-textarea"
                      value={createFormData.description}
                      onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="modal-form-grid">
                    <div className="modal-form-group">
                      <label className="modal-label">Category</label>
                      <select 
                        className="modal-select" 
                        value={createFormData.category}
                        onChange={(e) => setCreateFormData({ ...createFormData, category: e.target.value })}
                      >
                        <option value="luxury">Luxury</option>
                        <option value="tech">Tech</option>
                        <option value="artisan">Artisan</option>
                        <option value="personalized">Personalized</option>
                      </select>
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-label">Price</label>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        step="0.01" 
                        min="0"
                        className="modal-input"
                        value={createFormData.price}
                        onChange={(e) => setCreateFormData({ ...createFormData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select 
                      className="modal-select" 
                      value={createFormData.status}
                      onChange={(e) => setCreateFormData({ ...createFormData, status: e.target.value })}
                    >
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
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="modal-input-file"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {productImages.length > 0 && (
                      <div className="modal-images-preview">
                        {productImages.map((img, idx) => (
                          <div key={idx} className="modal-image-preview-item">
                            <img src={img} alt={`Selected ${idx + 1}`} className="modal-image-preview-image" />
                            <button
                              type="button"
                              className="modal-image-remove"
                              onClick={() => handleRemoveImage(idx)}
                            >
                              <XIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {createError && <p className="modal-error">{createError}</p>}
                  <div className="modal-actions">
                    <button type="submit" className="modal-button-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Adding...' : 'Add Product'}
                    </button>
                    <button 
                      type="button"
                      className="modal-button-outline"
                      onClick={closeCreateModal}
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
        {isEditModalOpen && selectedProduct && editFormData && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Product</h2>
                <button 
                  className="modal-close"
                  onClick={closeEditModal}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditProduct}>
                  <div className="modal-form-group">
                    <label className="modal-label">Product Name</label>
                    <input
                      type="text"
                      className="modal-input"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Description</label>
                    <textarea
                      rows={3}
                      className="modal-textarea"
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, description: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="modal-form-grid">
                    <div className="modal-form-group">
                      <label className="modal-label">Category</label>
                      <select
                        className="modal-select"
                        value={editFormData.category}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, category: e.target.value })
                        }
                      >
                        <option value="luxury">Luxury</option>
                        <option value="tech">Tech</option>
                        <option value="artisan">Artisan</option>
                        <option value="personalized">Personalized</option>
                      </select>
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-label">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="modal-input"
                        value={editFormData.price}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select
                      className="modal-select"
                      value={editFormData.status}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Product Images (Max 5)</label>
                    {selectedProduct.previewImage ? (
                      <div className="modal-images-preview">
                        <div className="modal-image-preview-item">
                          <img
                            src={selectedProduct.previewImage}
                            alt={selectedProduct.name}
                            className="modal-image-preview-image"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="modal-image-preview-placeholder">
                        <ImageIcon />
                      </div>
                    )}
                    <p className="modal-hint">Image updates are not supported yet.</p>
                  </div>
                  {editError && <p className="modal-error">{editError}</p>}
                  <div className="modal-actions">
                    <button
                      type="submit"
                      className="modal-button-primary"
                      disabled={isEditSubmitting}
                    >
                      {isEditSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button"
                      className="modal-button-outline"
                      onClick={closeEditModal}
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

