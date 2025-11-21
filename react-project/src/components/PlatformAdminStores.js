import { useState, useEffect } from 'react';
import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminStoreCard from './PlatformAdminStoreCard';
import './PlatformAdminStores.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/media')) {
    const base = API_BASE_URL.replace(/\/$/, '');
    return `${base}${url}`;
  }
  return url;
};

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

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Sample store icon images (SVG format - can be replaced with PNG images)
const sampleStoreIcons = {
  luxury: '/images/store-icons/luxury-gifts.svg',
  artisan: '/images/store-icons/artisan-crafts.svg',
  tech: '/images/store-icons/tech-gadgets.svg',
  personalized: '/images/store-icons/personalized-treasures.svg',
  eco: '/images/store-icons/eco-friendly.svg',
  kids: '/images/store-icons/kids-wonderland.svg',
};

const initialCreateFormState = Object.freeze({
  name: '',
  contactNumber: '',
  email: '',
  password: '',
  description: '',
  package: 'basic',
  themeColor: '#6366f1',
  icon: '',
  featuredImage: '',
});

function PlatformAdminStores() {
  const [stores, setStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [createdStore, setCreatedStore] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [storesError, setStoresError] = useState('');
  const [createError, setCreateError] = useState('');
  const [isSubmittingStore, setIsSubmittingStore] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState(false);
  const [pendingEditData, setPendingEditData] = useState(null);
  const [editErrorMessage, setEditErrorMessage] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  
  // Form state for create store
  const [createFormData, setCreateFormData] = useState({ ...initialCreateFormState });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoadingStores(true);
        setStoresError('');
        const response = await fetch(`${API_BASE_URL}/api/stores`);
        if (!response.ok) {
          throw new Error('Failed to load stores');
        }
        const data = await response.json();
        const normalizedStores = Array.isArray(data.stores)
          ? data.stores.map((store) => ({
              ...store,
              icon: resolveMediaUrl(store.icon),
              image: resolveMediaUrl(store.image),
            }))
          : [];
        setStores(normalizedStores);
      } catch (error) {
        setStoresError('Unable to load stores. Please try again later.');
      } finally {
        setIsLoadingStores(false);
      }
    };

    fetchStores();
  }, []);
  
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleVisibility = (storeId, visible) => {
    setConfirmToggle({ show: true, storeId, newStatus: visible });
  };

  const confirmToggleVisibility = () => {
    if (confirmToggle) {
      setStores(stores.map(store =>
        store.id === confirmToggle.storeId
          ? { ...store, status: confirmToggle.newStatus ? 'active' : 'hidden' }
          : store
      ));
      setConfirmToggle(null);
    }
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setEditFormData({
      name: store.name || '',
      contactNumber: store.contactNumber || '',
      email: store.email || '',
      description: store.description || '',
      package: (store.package || 'basic').toLowerCase(),
      themeColor: store.themeColor || '#6366f1',
      password: '',
    });
    setEditErrorMessage('');
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStore(null);
    setEditFormData(null);
    setPendingEditData(null);
    setIsConfirmEditOpen(false);
    setEditErrorMessage('');
    setIsSavingEdit(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!selectedStore || !editFormData) {
      closeEditModal();
      return;
    }

    const trimmedPassword = (editFormData.password || '').trim();
    const updatedData = {
      name: editFormData.name.trim(),
      contactNumber: editFormData.contactNumber.trim(),
      email: editFormData.email.trim(),
      description: editFormData.description.trim(),
      package: editFormData.package,
      themeColor: editFormData.themeColor,
      password: trimmedPassword.length >= 6 ? trimmedPassword : undefined,
    };

    const hasFieldChanges = ['name', 'contactNumber', 'email', 'description', 'package', 'themeColor'].some((key) => {
      const originalValue = key === 'package'
        ? (selectedStore.package || 'basic').toLowerCase()
        : (selectedStore[key] || '').toString().trim();
      const newValue = updatedData[key]?.toString().trim();
      return originalValue !== newValue;
    });

    const hasPasswordChange = Boolean(updatedData.password);

    if (!hasFieldChanges && !hasPasswordChange) {
      closeEditModal();
      return;
    }

    setPendingEditData(updatedData);
    setIsConfirmEditOpen(true);
  };

  const confirmEditChanges = async () => {
    if (!pendingEditData || !selectedStore) {
      setIsConfirmEditOpen(false);
      return;
    }

    try {
      setIsSavingEdit(true);
      setEditErrorMessage('');

      const response = await fetch(`${API_BASE_URL}/api/stores/${selectedStore.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pendingEditData),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.store) {
        throw new Error(data.message || 'Failed to update store');
      }

      const updatedStore = {
        ...data.store,
        icon: resolveMediaUrl(data.store.icon),
        image: resolveMediaUrl(data.store.image),
      };

      setStores((prev) =>
        prev.map((store) => (store.id === updatedStore.id ? updatedStore : store))
      );
      closeEditModal();
    } catch (error) {
      setEditErrorMessage(error.message || 'Failed to update store');
    } finally {
      setIsSavingEdit(false);
      setIsConfirmEditOpen(false);
      setPendingEditData(null);
    }
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    setCreateError('');
    setIsSubmittingStore(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...createFormData,
          icon: createFormData.icon || sampleStoreIcons.luxury,
          featuredImage: createFormData.featuredImage || createFormData.icon || '',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create store');
      }

      const newStore = {
        ...data.store,
        icon: resolveMediaUrl(data.store?.icon),
        image: resolveMediaUrl(data.store?.image),
      };
      setStores((prev) => [...prev, newStore]);
      setCreatedStore(newStore);
      setIsCreateModalOpen(false);
      setIsSuccessModalOpen(true);
      setCreateFormData({ ...initialCreateFormState });
    } catch (error) {
      setCreateError(error.message || 'Failed to create store');
    } finally {
      setIsSubmittingStore(false);
    }
  };

  const openCreateModal = () => {
    setCreateError('');
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateError('');
    setIsSubmittingStore(false);
    setCreateFormData({ ...initialCreateFormState });
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setCreatedStore(null);
  };

  return (
    <PlatformAdminLayout>
      <div className="platform-admin-stores">
        <div className="stores-header">
          <div>
            <h1 className="stores-title">Store Management</h1>
            <p className="stores-subtitle">Manage all stores on the platform</p>
          </div>
          
          <button 
            className="stores-create-button"
            onClick={openCreateModal}
          >
            <PlusIcon />
            <span>Create Store</span>
          </button>
        </div>

        <div className="stores-filters">
          <div className="stores-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="stores-search-input"
            />
          </div>
          <button className="stores-filter-button">
            <FilterIcon />
            <span>Filter</span>
          </button>
        </div>

        {isLoadingStores ? (
          <div className="stores-status-message">Loading stores...</div>
        ) : storesError ? (
          <div className="stores-status-message stores-error">{storesError}</div>
        ) : filteredStores.length === 0 ? (
          <div className="stores-status-message">No stores found. Try adjusting your search.</div>
        ) : (
          <div className="stores-grid">
            {filteredStores.map((store) => (
              <PlatformAdminStoreCard
                key={store.id}
                {...store}
                onEdit={() => handleEdit(store)}
                onToggleVisibility={(visible) => handleToggleVisibility(store.id, visible)}
                variant="admin"
              />
            ))}
          </div>
        )}

        {/* Create Store Modal */}
        {isCreateModalOpen && (
          <div className="modal-overlay" onClick={closeCreateModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Create New Store</h2>
                <button 
                  className="modal-close"
                  onClick={closeCreateModal}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateStore}>
                  <div className="modal-form-grid">
                    <div className="modal-form-group">
                      <label className="modal-label">Store Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter store name" 
                        className="modal-input"
                        value={createFormData.name}
                        onChange={(e) => setCreateFormData({...createFormData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-label">Contact Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 123-4567" 
                        className="modal-input"
                        value={createFormData.contactNumber}
                        onChange={(e) => setCreateFormData({...createFormData, contactNumber: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Store Admin Email</label>
                    <input 
                      type="email" 
                      placeholder="admin@store.com" 
                      className="modal-input"
                      value={createFormData.email}
                      onChange={(e) => setCreateFormData({...createFormData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Password</label>
                    <input 
                      type="password" 
                      placeholder="Set store admin password" 
                      className="modal-input"
                      value={createFormData.password}
                      onChange={(e) => setCreateFormData({...createFormData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Description</label>
                    <textarea 
                      placeholder="Store description" 
                      rows={3} 
                      className="modal-textarea"
                      value={createFormData.description}
                      onChange={(e) => setCreateFormData({...createFormData, description: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <div className="modal-form-grid">
                    <div className="modal-form-group">
                      <label className="modal-label">Package</label>
                      <select 
                        className="modal-select" 
                        value={createFormData.package}
                        onChange={(e) => setCreateFormData({...createFormData, package: e.target.value})}
                      >
                        <option value="basic">Basic</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-label">Theme Color</label>
                      <input 
                        type="color" 
                        value={createFormData.themeColor}
                        onChange={(e) => setCreateFormData({...createFormData, themeColor: e.target.value})}
                        className="modal-input-color" 
                      />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Store Icon</label>
                    <input 
                      type="file" 
                      accept="image/png,image/jpeg,image/jpg" 
                      className="modal-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCreateFormData((prev) => ({ ...prev, icon: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <p className="modal-hint">Upload a PNG or JPG image for the store icon</p>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Store Featured Image</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="modal-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCreateFormData((prev) => ({ ...prev, featuredImage: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  {createError && <p className="modal-error">{createError}</p>}
                  <div className="modal-actions">
                    <button type="submit" className="modal-button-primary" disabled={isSubmittingStore}>
                      {isSubmittingStore ? 'Creating...' : 'Create Store'}
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

        {/* Edit Store Modal */}
        {isEditModalOpen && selectedStore && editFormData && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Store</h2>
                <button 
                  className="modal-close"
                  onClick={closeEditModal}
                >
                  <XIcon />
                </button>
              </div>
              <form className="modal-body" onSubmit={handleSubmitEdit}>
                {editErrorMessage && (
                  <p className="modal-error">{editErrorMessage}</p>
                )}
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">Store Name</label>
                    <input
                      type="text"
                      className="modal-input"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Contact Number</label>
                    <input
                      type="tel"
                      className="modal-input"
                      value={editFormData.contactNumber}
                      onChange={(e) =>
                        setEditFormData((prev) => ({ ...prev, contactNumber: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Store Admin Email</label>
                  <input
                    type="email"
                    className="modal-input"
                    value={editFormData.email}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
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
                      setEditFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    required
                  ></textarea>
                </div>
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">Package</label>
                    <select
                      className="modal-select"
                      value={editFormData.package}
                      onChange={(e) =>
                        setEditFormData((prev) => ({ ...prev, package: e.target.value }))
                      }
                    >
                      <option value="basic">Basic</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Theme Color</label>
                    <input
                      type="color"
                      className="modal-input-color"
                      value={editFormData.themeColor}
                      onChange={(e) =>
                        setEditFormData((prev) => ({ ...prev, themeColor: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Store Icon</label>
                  {selectedStore.icon && (
                    <div className="modal-icon-preview">
                      <img
                        src={selectedStore.icon}
                        alt="Current store icon"
                        className="modal-icon-preview-image"
                      />
                    </div>
                  )}
                  <p className="modal-hint">Icon editing coming soon</p>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">New Password</label>
                  <input
                    type="password"
                    className="modal-input"
                    value={editFormData.password}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    placeholder="Leave blank to keep current password"
                    minLength={6}
                  />
                  <p className="modal-hint">
                    Minimum 6 characters. Leave blank to keep the existing password.
                  </p>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="modal-button-primary" disabled={isSavingEdit}>
                    {isSavingEdit ? 'Saving...' : 'Save Changes'}
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
        )}

        {/* Confirmation Dialog */}
        {confirmToggle?.show && (
          <div className="modal-overlay" onClick={() => setConfirmToggle(null)}>
            <div className="alert-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="alert-dialog-header">
                <h3 className="alert-dialog-title">Confirm Visibility Change</h3>
                <p className="alert-dialog-description">
                  Are you sure you want to {confirmToggle.newStatus ? 'show' : 'hide'} this store? 
                  {!confirmToggle.newStatus && ' Customers will not be able to see this store.'}
                </p>
              </div>
              <div className="alert-dialog-actions">
                <button 
                  className="modal-button-outline"
                  onClick={() => setConfirmToggle(null)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-button-primary"
                  onClick={confirmToggleVisibility}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Edit Dialog */}
        {isConfirmEditOpen && pendingEditData && selectedStore && (
          <div className="modal-overlay" onClick={() => setIsConfirmEditOpen(false)}>
            <div className="alert-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="alert-dialog-header">
                <h3 className="alert-dialog-title">Apply Changes to Store</h3>
                <p className="alert-dialog-description">
                  You&apos;re about to update <strong>{selectedStore.name}</strong>. Are you sure you
                  want to save these changes?
                </p>
                <ul className="alert-dialog-list">
                  <li>
                    <strong>Name:</strong> {pendingEditData.name}
                  </li>
                  <li>
                    <strong>Contact:</strong> {pendingEditData.contactNumber}
                  </li>
                  <li>
                    <strong>Email:</strong> {pendingEditData.email}
                  </li>
                  <li>
                    <strong>Package:</strong> {pendingEditData.package}
                  </li>
                  {pendingEditData.password && (
                    <li>
                      <strong>Password:</strong> Updated
                    </li>
                  )}
                </ul>
              </div>
              <div className="alert-dialog-actions">
                <button
                  className="modal-button-outline"
                  onClick={() => setIsConfirmEditOpen(false)}
                >
                  Cancel
                </button>
                <button className="modal-button-primary" onClick={confirmEditChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal - Show Created Store Data */}
        {isSuccessModalOpen && createdStore && (
          <div className="modal-overlay" onClick={closeSuccessModal}>
            <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Store Created Successfully!</h2>
                <button 
                  className="modal-close"
                  onClick={closeSuccessModal}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <div className="success-store-info">
                  <div className="success-store-header">
                    {createdStore.icon && (
                      <div className="success-store-icon">
                        {(createdStore.icon.startsWith('http') || createdStore.icon.startsWith('/') || createdStore.icon.startsWith('data:')) ? (
                          <img src={createdStore.icon} alt={`${createdStore.name} icon`} className="success-store-icon-image" />
                        ) : (
                          <span className="success-store-icon-emoji">{createdStore.icon}</span>
                        )}
                      </div>
                    )}
                    <div className="success-store-details">
                      <h3 className="success-store-name">{createdStore.name}</h3>
                      <p className="success-store-description">{createdStore.description}</p>
                    </div>
                  </div>
                  
                  <div className="success-store-data">
                    <div className="success-data-row">
                      <span className="success-data-label">Store ID:</span>
                      <span className="success-data-value">{createdStore.id}</span>
                    </div>
                    <div className="success-data-row">
                      <span className="success-data-label">Email:</span>
                      <span className="success-data-value">{createdStore.email}</span>
                    </div>
                    <div className="success-data-row">
                      <span className="success-data-label">Contact Number:</span>
                      <span className="success-data-value">{createdStore.contactNumber}</span>
                    </div>
                    <div className="success-data-row">
                      <span className="success-data-label">Package:</span>
                      <span className="success-data-value">{createdStore.package}</span>
                    </div>
                    <div className="success-data-row">
                      <span className="success-data-label">Status:</span>
                      <span className="success-data-value">
                        <span className="comment-badge comment-badge-approved">{createdStore.status}</span>
                      </span>
                    </div>
                    <div className="success-data-row">
                      <span className="success-data-label">Theme Color:</span>
                      <span className="success-data-value">
                        <span 
                          className="success-color-preview" 
                          style={{ backgroundColor: createdStore.themeColor }}
                        ></span>
                        {createdStore.themeColor}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-actions">
                  <button 
                    className="modal-button-primary"
                    onClick={closeSuccessModal}
                  >
                    Close
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

export default PlatformAdminStores;

