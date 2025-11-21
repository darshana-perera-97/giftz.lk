const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export const resolveMediaUrl = (url) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('http')) {
    return url;
  }
  if (url.startsWith('/media')) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
};

export async function fetchStores() {
  const response = await fetch(`${API_BASE_URL}/api/stores`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to load stores');
  }

  return Array.isArray(data?.stores) ? data.stores : [];
}

export async function fetchStoreById(storeId) {
  if (!storeId) {
    return null;
  }
  const stores = await fetchStores();
  return stores.find((store) => store.id === storeId) || null;
}

export async function fetchItems({ storeId, status } = {}) {
  const params = new URLSearchParams();
  if (storeId) {
    params.append('storeId', storeId);
  }
  if (status) {
    params.append('status', status);
  }

  const response = await fetch(`${API_BASE_URL}/api/items${params.toString() ? `?${params.toString()}` : ''}`);
  const data = await response.json();

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || 'Failed to load items');
  }

  return Array.isArray(data?.items) ? data.items : [];
}

export { API_BASE_URL };

export async function updateStore(storeId, payload) {
  if (!storeId) {
    throw new Error('Store ID is required');
  }

  const response = await fetch(`${API_BASE_URL}/api/stores/${storeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || 'Failed to update store');
  }

  return data.store;
}


