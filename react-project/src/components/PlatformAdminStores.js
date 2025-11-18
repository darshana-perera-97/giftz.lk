import { useState } from 'react';
import PlatformAdminLayout from './PlatformAdminLayout';
import PlatformAdminStoreCard from './PlatformAdminStoreCard';
import './PlatformAdminStores.css';

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

const mockStores = [
  { id: '1', name: 'Luxury Gifts Co.', description: 'Premium luxury gifts and exclusive collections', productCount: 45, status: 'active', revenue: '$12,450', icon: sampleStoreIcons.luxury, email: 'admin@luxurygifts.com', contactNumber: '+1 (555) 123-4567', package: 'Pro', themeColor: '#6366f1' },
  { id: '2', name: 'Artisan Crafts', description: 'Handmade artisan products from local creators', productCount: 32, status: 'active', revenue: '$8,920', icon: sampleStoreIcons.artisan, email: 'admin@artisancrafts.com', contactNumber: '+1 (555) 234-5678', package: 'Basic', themeColor: '#8b5cf6' },
  { id: '3', name: 'Tech Gadgets Store', description: 'Latest tech gifts and innovative gadgets', productCount: 67, status: 'hidden', revenue: '$15,670', icon: sampleStoreIcons.tech, email: 'admin@techgadgets.com', contactNumber: '+1 (555) 345-6789', package: 'Enterprise', themeColor: '#3b82f6' },
  { id: '4', name: 'Personalized Treasures', description: 'Custom personalized gifts for every occasion', productCount: 28, status: 'active', revenue: '$6,340', icon: sampleStoreIcons.personalized, email: 'admin@personalizedtreasures.com', contactNumber: '+1 (555) 456-7890', package: 'Pro', themeColor: '#ec4899' },
  { id: '5', name: 'Eco-Friendly Gifts', description: 'Sustainable and environmentally conscious products', productCount: 41, status: 'active', revenue: '$9,820', icon: sampleStoreIcons.eco, email: 'admin@ecofriendly.com', contactNumber: '+1 (555) 567-8901', package: 'Basic', themeColor: '#10b981' },
  { id: '6', name: 'Kids Wonderland', description: 'Amazing gifts and toys for children', productCount: 89, status: 'active', revenue: '$18,450', icon: sampleStoreIcons.kids, email: 'admin@kidswonderland.com', contactNumber: '+1 (555) 678-9012', package: 'Enterprise', themeColor: '#f59e0b' },
];

function PlatformAdminStores() {
  const [stores, setStores] = useState(mockStores);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [createdStore, setCreatedStore] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Form state for create store
  const [createFormData, setCreateFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    description: '',
    package: 'basic',
    themeColor: '#6366f1',
    icon: '',
  });
  
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
    setIsEditModalOpen(true);
  };

  const handleCreateStore = (e) => {
    e.preventDefault();
    
    // Create new store object
    const newStore = {
      id: String(stores.length + 1),
      name: createFormData.name,
      description: createFormData.description,
      productCount: 0,
      status: 'active',
      revenue: '$0',
      icon: createFormData.icon || '/images/store-icons/luxury-gifts.svg',
      email: createFormData.email,
      contactNumber: createFormData.contactNumber,
      package: createFormData.package.charAt(0).toUpperCase() + createFormData.package.slice(1),
      themeColor: createFormData.themeColor,
    };

    // Add to stores list
    setStores([...stores, newStore]);
    
    // Set created store and show success modal
    setCreatedStore(newStore);
    setIsCreateModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Reset form
    setCreateFormData({
      name: '',
      contactNumber: '',
      email: '',
      password: '',
      description: '',
      package: 'basic',
      themeColor: '#6366f1',
      icon: '',
    });
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
            onClick={() => setIsCreateModalOpen(true)}
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

        {/* Create Store Modal */}
        {isCreateModalOpen && (
          <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Create New Store</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsCreateModalOpen(false)}
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
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCreateFormData({...createFormData, icon: reader.result});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <p className="modal-hint">Upload a PNG or JPG image for the store icon</p>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Store Featured Image</label>
                    <input type="file" accept="image/*" className="modal-input" />
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="modal-button-primary">
                      Create Store
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

        {/* Edit Store Modal */}
        {isEditModalOpen && selectedStore && (
          <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Store</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <XIcon />
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">Store Name</label>
                    <input type="text" defaultValue={selectedStore.name} className="modal-input" />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Contact Number</label>
                    <input type="tel" defaultValue={selectedStore.contactNumber} className="modal-input" />
                  </div>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Store Admin Email</label>
                  <input type="email" defaultValue={selectedStore.email} className="modal-input" />
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Password</label>
                  <div className="modal-password-group">
                    <input type="password" placeholder="••••••••" className="modal-input" />
                    <button className="modal-button-small">
                      <EditIcon />
                      <span>Change</span>
                    </button>
                  </div>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Description</label>
                  <textarea defaultValue={selectedStore.description} rows={3} className="modal-textarea"></textarea>
                </div>
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">Package</label>
                    <select className="modal-select" defaultValue={selectedStore.package.toLowerCase()}>
                      <option value="basic">Basic</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Theme Color</label>
                    <input type="color" defaultValue={selectedStore.themeColor} className="modal-input-color" />
                  </div>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Store Icon</label>
                  {selectedStore.icon && (selectedStore.icon.startsWith('http') || selectedStore.icon.startsWith('/') || selectedStore.icon.startsWith('data:')) && (
                    <div className="modal-icon-preview">
                      <img src={selectedStore.icon} alt="Current store icon" className="modal-icon-preview-image" />
                    </div>
                  )}
                  <input type="file" accept="image/png,image/jpeg,image/jpg" className="modal-input" />
                  <p className="modal-hint">Upload a PNG or JPG image for the store icon</p>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">Store Featured Image</label>
                  <input type="file" accept="image/*" className="modal-input" />
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

        {/* Success Modal - Show Created Store Data */}
        {isSuccessModalOpen && createdStore && (
          <div className="modal-overlay" onClick={() => setIsSuccessModalOpen(false)}>
            <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Store Created Successfully!</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsSuccessModalOpen(false)}
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
                    onClick={() => setIsSuccessModalOpen(false)}
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

