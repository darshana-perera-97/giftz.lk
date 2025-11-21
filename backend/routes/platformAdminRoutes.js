const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

const PLATFORM_ADMIN = {
  email: 'admin@gmail.com',
  password: 'admin@gmail.com',
  name: 'Platform Administrator',
  role: 'platform-admin',
};

const dataDir = path.join(__dirname, '..', 'data');
const storesFilePath = path.join(dataDir, 'stores.json');
const imagesDir = path.join(dataDir, 'images');
const itemsFilePath = path.join(dataDir, 'items.json');
const DEFAULT_STORE_ICON = '/images/store-icons/luxury-gifts.svg';
const DEFAULT_STORE_IMAGE = '/images/store-icons/luxury-gifts.svg';
const dashboardFilePath = path.join(dataDir, 'platformAdminDashboardData.json');

async function ensureStoresFile() {
  try {
    const file = await fs.readFile(storesFilePath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(storesFilePath, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
}

async function writeStoresFile(stores) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(storesFilePath, JSON.stringify(stores, null, 2), 'utf-8');
}

async function readDashboardData() {
  try {
    const file = await fs.readFile(dashboardFilePath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const defaultData = {
        metrics: {},
        trend: { labels: [], revenue: [], orders: [] },
        topStores: [],
        recentActivity: [],
      };
      await fs.writeFile(dashboardFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    throw error;
  }
}
function sanitizeStore(store = {}) {
  const { password, ...rest } = store;
  return rest;
}

async function saveBase64Image(dataUrl, prefix = 'upload') {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return null;
  }

  const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (!match) {
    return null;
  }

  const mimeType = match[1];
  const base64Data = match[2];
  const extension = mimeType.split('/')[1] || 'png';
  const fileName = `${prefix}-${Date.now()}.${extension}`;
  const filePath = path.join(imagesDir, fileName);

  await fs.mkdir(imagesDir, { recursive: true });
  await fs.writeFile(filePath, Buffer.from(base64Data, 'base64'));

  return `/media/${fileName}`;
}

router.get('/', (_, res) => {
  res.json({
    service: 'Giftz API',
    version: '1.0.0',
    status: 'running',
    loginEndpoint: '/api/login',
    timestamp: new Date(),
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  if (
    normalizedEmail === PLATFORM_ADMIN.email.toLowerCase() &&
    password === PLATFORM_ADMIN.password
  ) {
    return res.json({
      success: true,
      user: {
        name: PLATFORM_ADMIN.name,
        email: PLATFORM_ADMIN.email,
        role: PLATFORM_ADMIN.role,
      },
      token: 'mock-platform-admin-token',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password',
  });
});

async function ensureItemsFile() {
  try {
    const file = await fs.readFile(itemsFilePath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(itemsFilePath, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
}

async function writeItemsFile(items) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf-8');
}

router.get('/stores', async (_, res) => {
  try {
    const stores = await ensureStoresFile();
    res.json({
      count: stores.length,
      stores: stores.map(sanitizeStore),
    });
  } catch (error) {
    console.error('Failed to load stores:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load stores',
    });
  }
});

router.post('/stores', async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      email,
      password,
      description,
      package: packageTier = 'basic',
      themeColor = '#6366f1',
      icon,
      featuredImage,
      backgroundImage,
      keywords,
    } = req.body || {};

    if (!name || !contactNumber || !email || !password || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, contact number, email, password, and description are required',
      });
    }

    const stores = await ensureStoresFile();
    const normalizedPackage =
      typeof packageTier === 'string' && packageTier.trim().length > 0
        ? packageTier.charAt(0).toUpperCase() + packageTier.slice(1).toLowerCase()
        : 'Basic';
    const normalizedThemeColor =
      typeof themeColor === 'string' && themeColor.trim().length > 0
        ? themeColor
        : '#6366f1';
    const savedFeaturedImagePath = await saveBase64Image(featuredImage, 'featured');
    const savedBackgroundImagePath = await saveBase64Image(backgroundImage, 'background');
    const savedIconPath = await saveBase64Image(icon, 'icon');

    const newStore = {
      id: `store-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      contactNumber: contactNumber.trim(),
      email: email.trim(),
      password,
      status: 'active',
      productCount: 0,
      revenue: '$0',
      package: normalizedPackage,
      themeColor: normalizedThemeColor,
      icon: savedIconPath || icon || DEFAULT_STORE_ICON,
      image: savedFeaturedImagePath || featuredImage || DEFAULT_STORE_IMAGE,
      backgroundImage:
        savedBackgroundImagePath ||
        backgroundImage ||
        savedFeaturedImagePath ||
        featuredImage ||
        DEFAULT_STORE_IMAGE,
      keywords: typeof keywords === 'string' ? keywords.trim() : '',
      createdAt: new Date().toISOString(),
    };

    stores.push(newStore);
    await writeStoresFile(stores);

    return res.status(201).json({
      success: true,
      store: sanitizeStore(newStore),
    });
  } catch (error) {
    console.error('Failed to create store:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create store',
    });
  }
});

router.put('/stores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      contactNumber,
      email,
      description,
      package: packageTier,
      themeColor,
      password,
      backgroundImage,
      keywords,
    } = req.body || {};

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Store ID is required',
      });
    }

    const stores = await ensureStoresFile();
    const storeIndex = stores.findIndex((store) => store.id === id);

    if (storeIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Store not found',
      });
    }

    const store = stores[storeIndex];

    const savedBackgroundImagePath = await saveBase64Image(backgroundImage, 'background');

    const updatedStore = {
      ...store,
      name: name ? name.trim() : store.name,
      contactNumber: contactNumber ? contactNumber.trim() : store.contactNumber,
      email: email ? email.trim() : store.email,
      description: description ? description.trim() : store.description,
      package: packageTier
        ? packageTier.charAt(0).toUpperCase() + packageTier.slice(1).toLowerCase()
        : store.package,
      themeColor: themeColor || store.themeColor,
    };

    if (password && password.trim().length >= 6) {
      updatedStore.password = password;
    }

    if (typeof keywords === 'string') {
      updatedStore.keywords = keywords.trim();
    }

    if (backgroundImage === null) {
      updatedStore.backgroundImage = '';
    } else if (savedBackgroundImagePath) {
      updatedStore.backgroundImage = savedBackgroundImagePath;
    }

    if (icon === null) {
      updatedStore.icon = DEFAULT_STORE_ICON;
    } else if (savedIconPath) {
      updatedStore.icon = savedIconPath;
    }

    stores[storeIndex] = updatedStore;
    await writeStoresFile(stores);

    return res.json({
      success: true,
      store: sanitizeStore(updatedStore),
    });
  } catch (error) {
    console.error('Failed to update store:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update store',
    });
  }
});

router.post('/store-login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const stores = await ensureStoresFile();
    const store = stores.find(
      (s) =>
        (s.email || '').toLowerCase() === normalizedEmail &&
        s.password === password
    );

    if (!store) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    return res.json({
      success: true,
      store: sanitizeStore(store),
    });
  } catch (error) {
    console.error('Failed to authenticate store:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to authenticate store admin',
    });
  }
});

router.get('/store-items', async (req, res) => {
  try {
    const { storeId } = req.query || {};
    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: 'storeId query parameter is required',
      });
    }

    const items = await ensureItemsFile();
    const filtered = items.filter((item) => item.storeId === storeId);
    return res.json({
      success: true,
      items: filtered,
    });
  } catch (error) {
    console.error('Failed to load store items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load items',
    });
  }
});

router.get('/items', async (req, res) => {
  try {
    const { status, storeId } = req.query || {};
    const items = await ensureItemsFile();
    let filtered = Array.isArray(items) ? [...items] : [];

    if (storeId) {
      filtered = filtered.filter((item) => item.storeId === storeId);
    }

    if (status) {
      const normalizedStatus = String(status).toLowerCase();
      if (normalizedStatus === 'active') {
        filtered = filtered.filter((item) => item.status !== 'hidden');
      } else if (normalizedStatus === 'hidden') {
        filtered = filtered.filter((item) => item.status === 'hidden');
      }
    }

    return res.json({
      success: true,
      count: filtered.length,
      items: filtered,
    });
  } catch (error) {
    console.error('Failed to load items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load items',
    });
  }
});

router.post('/store-items', async (req, res) => {
  try {
    const {
      storeId,
      name,
      description,
      category = 'general',
      price,
      status = 'active',
      images = [],
    } = req.body || {};

    if (!storeId || !name || !description || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: 'Store ID, name, description, and price are required',
      });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number',
      });
    }

    const items = await ensureItemsFile();
    const imagePaths = Array.isArray(images)
      ? await Promise.all(
          images.slice(0, 5).map((image, idx) =>
            saveBase64Image(image, `product-${storeId}-${Date.now()}-${idx}`)
          )
        )
      : [];

    const newItem = {
      id: `item-${Date.now()}`,
      storeId,
      name: name.trim(),
      description: description.trim(),
      category: category.trim() || 'general',
      price: numericPrice,
      status: status === 'hidden' ? 'hidden' : 'active',
      images: imagePaths.filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    items.push(newItem);
    await writeItemsFile(items);

    return res.status(201).json({
      success: true,
      item: newItem,
    });
  } catch (error) {
    console.error('Failed to create store item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
    });
  }
});

router.put('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      storeId,
      name,
      description,
      category,
      price,
      status,
    } = req.body || {};

    if (!id || !storeId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and store ID are required',
      });
    }

    const items = await ensureItemsFile();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const existingItem = items[itemIndex];

    if (existingItem.storeId !== storeId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this product',
      });
    }

    let updatedPrice = existingItem.price;
    if (price !== undefined && price !== null) {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a valid positive number',
        });
      }
      updatedPrice = numericPrice;
    }

    const updatedItem = {
      ...existingItem,
      name: name ? name.trim() : existingItem.name,
      description: description ? description.trim() : existingItem.description,
      category: category ? category.trim() : existingItem.category,
      price: updatedPrice,
      status: status === 'hidden' ? 'hidden' : 'active',
    };

    items[itemIndex] = updatedItem;
    await writeItemsFile(items);

    return res.json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    console.error('Failed to update product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
    });
  }
});

router.get('/dashboard', async (_, res) => {
  try {
    const data = await readDashboardData();
    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard data',
    });
  }
});

router.use((_, res) => {
  res.status(404).json({
    error: 'API route not found',
  });
});

module.exports = router;

