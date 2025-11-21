import { useEffect, useMemo, useState } from 'react';
import StoreAdminLayout from './StoreAdminLayout';
import PlatformAdminCard from './Card';
import ToastContainer, { toast } from './ToastContainer';
import { fetchStoreById, resolveMediaUrl, updateStore } from '../utils/api';
import './StoreAdminStoreDetails.css';

// Icon components
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

const OrdersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CommentsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const MAX_BACKGROUND_SIZE_MB = 5;
const MAX_ICON_SIZE_MB = 2;

function StoreAdminStoreDetails() {
  const storeId =
    typeof window !== 'undefined' ? localStorage.getItem('storeAdminStoreId') : null;
  const [storeData, setStoreData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    keywords: '',
    themeColor: '#6366f1',
  });
  const [backgroundImageState, setBackgroundImageState] = useState({
    preview: '',
    value: '',
  });
  const [storeIconState, setStoreIconState] = useState({
    preview: '',
    value: '',
  });

  useEffect(() => {
    let ignore = false;
    const loadStore = async () => {
      if (!storeId) {
        setLoadError('Store ID not found. Please log in again.');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await fetchStoreById(storeId);
        if (!ignore) {
          if (!data) {
            setLoadError('Store not found.');
            setStoreData(null);
          } else {
            setStoreData(data);
            setLoadError('');
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to load store details', error);
          setLoadError('Unable to load store details right now.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    loadStore();
    return () => {
      ignore = true;
    };
  }, [storeId]);

  useEffect(() => {
    if (!storeData) {
      return;
    }
    setFormData({
      description: storeData.description || '',
      keywords: storeData.keywords || '',
      themeColor: storeData.themeColor || '#6366f1',
    });
    setBackgroundImageState({
      preview: '',
      value: '',
    });
    setStoreIconState({
      preview: '',
      value: '',
    });
  }, [storeData]);

  const handleBackgroundImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const maxBytes = MAX_BACKGROUND_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`Background image must be under ${MAX_BACKGROUND_SIZE_MB}MB.`);
      return;
    }

    const toBase64 = (blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

    try {
      const base64 = await toBase64(file);
      setBackgroundImageState({
        preview: base64,
        value: base64,
      });
    } catch (error) {
      console.error('Failed to read background image', error);
      toast.error('Failed to read the selected image. Please try again.');
    }
  };

  const handleIconChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const maxBytes = MAX_ICON_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`Icon image must be under ${MAX_ICON_SIZE_MB}MB.`);
      return;
    }

    const toBase64 = (blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

    try {
      const base64 = await toBase64(file);
      setStoreIconState({
        preview: base64,
        value: base64,
      });
    } catch (error) {
      console.error('Failed to read icon image', error);
      toast.error('Failed to read the selected icon. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!storeId) {
      toast.error('Store ID not found. Please log in again.');
      return;
    }
    try {
      setIsSaving(true);
      const payload = {
        description: formData.description,
        keywords: formData.keywords,
        themeColor: formData.themeColor,
      };

      if (backgroundImageState.value) {
        payload.backgroundImage = backgroundImageState.value;
      }
    if (storeIconState.value) {
      payload.icon = storeIconState.value;
    }

      const updated = await updateStore(storeId, payload);
      setStoreData(updated);
      toast.success('Store details updated successfully.');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update store details', error);
      toast.error(error.message || 'Failed to update store details.');
    } finally {
      setIsSaving(false);
    }
  };

  const backgroundPreview = useMemo(() => {
    if (backgroundImageState.preview) {
      return backgroundImageState.preview;
    }
    return resolveMediaUrl(storeData?.backgroundImage || storeData?.image || '');
  }, [backgroundImageState.preview, storeData]);

  const iconPreview = useMemo(() => {
    if (storeIconState.preview) {
      return storeIconState.preview;
    }
    return resolveMediaUrl(storeData?.icon || '');
  }, [storeIconState.preview, storeData]);

  if (isLoading) {
    return (
      <StoreAdminLayout>
        <div className="store-details-loading">Loading store details...</div>
      </StoreAdminLayout>
    );
  }

  if (loadError) {
    return (
      <StoreAdminLayout>
        <div className="store-details-error">{loadError}</div>
        <ToastContainer />
      </StoreAdminLayout>
    );
  }

  return (
    <StoreAdminLayout>
      <div className="store-details-page">
        <div className="store-details-header">
          <div>
            <h1 className="store-details-title">Store Details</h1>
            <p className="store-details-subtitle">Manage your store information and settings</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="store-details-edit-button"
            >
              <EditIcon />
              <span>Edit Details</span>
            </button>
          ) : (
            <div className="store-details-actions">
              <button
                onClick={handleSave}
                className="store-details-save-button"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="store-details-cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setBackgroundImageState({ preview: '', value: '' });
                  setStoreIconState({ preview: '', value: '' });
                  setFormData({
                    description: storeData.description || '',
                    keywords: storeData.keywords || '',
                    themeColor: storeData.themeColor || '#6366f1',
                  });
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="store-details-grid">
          {/* Store Info - Read Only */}
          <PlatformAdminCard className="store-details-info-card">
            <div className="store-details-card-header">
              <h3 className="store-details-card-title">Store Information</h3>
              <p className="store-details-card-subtitle">View-only information set by Platform Admin</p>
            </div>

            <div className="store-details-info-list">
              <div className="store-details-info-item">
                <label className="store-details-info-label">Store Name</label>
                <p className="store-details-info-value">{storeData?.name || '—'}</p>
              </div>

              <div className="store-details-info-item">
                <label className="store-details-info-label">Email</label>
                <p className="store-details-info-value">{storeData?.email || '—'}</p>
              </div>

              <div className="store-details-info-item">
                <label className="store-details-info-label">Contact Number</label>
                <p className="store-details-info-value">{storeData?.contactNumber || '—'}</p>
              </div>

              <div className="store-details-info-item">
                <label className="store-details-info-label">Package</label>
                <span className="store-details-package-badge">{storeData?.package || '—'}</span>
              </div>
            </div>
          </PlatformAdminCard>

          {/* Editable Store Details */}
          <PlatformAdminCard className="store-details-content-card">
            <div className="store-details-card-header">
              <h3 className="store-details-card-title">Store Content</h3>
              <p className="store-details-card-subtitle">Customize your store appearance and content</p>
            </div>

            <div className="store-details-content-form">
              <div className="store-details-form-group">
                <label className="store-details-form-label">About Store</label>
                {isEditing ? (
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Describe your store..."
                    className="store-details-textarea"
                  />
                ) : (
                  <p className="store-details-readonly-field">{storeData?.description || 'No description added yet.'}</p>
                )}
              </div>

              <div className="store-details-form-group">
                <label className="store-details-form-label">Keywords</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="luxury, gifts, premium..."
                    className="store-details-input"
                  />
                ) : (
                  <p className="store-details-readonly-field">
                    {storeData?.keywords || 'No keywords added yet.'}
                  </p>
                )}
                <p className="store-details-hint">Comma-separated keywords for better discoverability</p>
              </div>

              <div className="store-details-form-group">
                <label className="store-details-form-label">Store Theme Color</label>
                <div className="store-details-color-group">
                  {isEditing ? (
                    <>
                      <input
                        type="color"
                        value={formData.themeColor}
                        onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                        className="store-details-color-input"
                      />
                      <input
                        type="text"
                        value={formData.themeColor}
                        onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                        placeholder="#6366f1"
                        className="store-details-color-text"
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className="store-details-color-preview"
                        style={{ backgroundColor: storeData?.themeColor || '#6366f1' }}
                      />
                      <p className="store-details-readonly-field">{storeData?.themeColor || '#6366f1'}</p>
                    </>
                  )}
                </div>
                <p className="store-details-hint">This color will be used throughout your store</p>
              </div>

              <div className="store-details-form-group">
                <label className="store-details-form-label">Store Background Image</label>
                <div className="store-details-background-upload">
                  <div
                    className={`store-details-background-preview ${
                      backgroundPreview ? 'has-background' : ''
                    }`}
                    style={
                      backgroundPreview
                        ? { backgroundImage: `url(${backgroundPreview})` }
                        : undefined
                    }
                  >
                    {backgroundPreview ? (
                      <span>Current background preview</span>
                    ) : (
                      <span>No background selected</span>
                    )}
                  </div>
                  {isEditing && (
                    <div className="store-details-background-actions">
                      <label className="store-details-upload-button">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBackgroundImageChange}
                        />
                        Upload Background
                      </label>
                      <p className="store-details-hint">
                        Recommended 1600x600px, max {MAX_BACKGROUND_SIZE_MB}MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="store-details-form-group">
                <label className="store-details-form-label">Store Icon</label>
                <div className="store-details-icon-upload">
                  <div className="store-details-icon-preview">
                    {iconPreview ? (
                      <img src={iconPreview} alt="Store icon preview" />
                    ) : (
                      <span>Logo</span>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="store-details-icon-actions">
                      <label className="store-details-upload-button">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleIconChange}
                        />
                        Upload Icon
                      </label>
                      <p className="store-details-hint">
                        Recommended square image, max {MAX_ICON_SIZE_MB}MB
                      </p>
                    </div>
                  ) : (
                    <p className="store-details-hint">This icon appears on customer pages.</p>
                  )}
                </div>
              </div>
            </div>
          </PlatformAdminCard>
        </div>

        {/* Statistics */}
        <div className="store-details-stats-grid">
          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-primary">
                <PackageIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Total Products</p>
                <h3 className="store-details-stat-value">45</h3>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-secondary">
                <OrdersIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Total Orders</p>
                <h3 className="store-details-stat-value">142</h3>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-success">
                <StarIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Average Rating</p>
                <h3 className="store-details-stat-value">4.8</h3>
              </div>
            </div>
          </PlatformAdminCard>

          <PlatformAdminCard className="store-details-stat-card">
            <div className="store-details-stat-content">
              <div className="store-details-stat-icon store-details-stat-icon-purple">
                <CommentsIcon />
              </div>
              <div>
                <p className="store-details-stat-label">Total Reviews</p>
                <h3 className="store-details-stat-value">87</h3>
              </div>
            </div>
          </PlatformAdminCard>
        </div>
      </div>
      <ToastContainer />
    </StoreAdminLayout>
  );
}

export default StoreAdminStoreDetails;

