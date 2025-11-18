import { useState } from "react";
import { TopNav } from "./components/TopNav";
import { AdminSidebar } from "./components/AdminSidebar";
import { CartSidebar } from "./components/CartSidebar";
import { PlatformAdminDashboard } from "./components/screens/PlatformAdminDashboard";
import { PlatformAdminStores } from "./components/screens/PlatformAdminStores";
import { PlatformAdminItems } from "./components/screens/PlatformAdminItems";
import { PlatformAdminOrders } from "./components/screens/PlatformAdminOrders";
import { PlatformAdminComments } from "./components/screens/PlatformAdminComments";
import { PlatformAdminLogin } from "./components/screens/PlatformAdminLogin";
import { StoreAdminDashboard } from "./components/screens/StoreAdminDashboard";
import { StoreAdminProducts } from "./components/screens/StoreAdminProducts";
import { StoreAdminOrders } from "./components/screens/StoreAdminOrders";
import { StoreAdminComments } from "./components/screens/StoreAdminComments";
import { StoreAdminStoreDetails } from "./components/screens/StoreAdminStoreDetails";
import { StoreAdminLogin } from "./components/screens/StoreAdminLogin";
import { CustomerLanding } from "./components/screens/CustomerLanding";
import { CustomerStoreList } from "./components/screens/CustomerStoreList";
import { CustomerStoreDetail } from "./components/screens/CustomerStoreDetail";
import { CustomerAllProducts } from "./components/screens/CustomerAllProducts";
import { CustomerSingleProduct } from "./components/screens/CustomerSingleProduct";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "motion/react";

type Role = 'platform-admin' | 'store-admin' | 'customer';

// Sample cart data
const sampleCartItems = [
  {
    id: '1',
    name: 'Premium Watch',
    price: 299.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjI0ODQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    storeName: 'Luxury Gifts Co.',
  },
  {
    id: '2',
    name: 'Luxury Leather Bag',
    price: 399.99,
    quantity: 1,
    storeName: 'Artisan Crafts',
  },
  {
    id: '3',
    name: 'Designer Sunglasses',
    price: 189.99,
    quantity: 2,
    storeName: 'Luxury Gifts Co.',
  },
];

function App() {
  const [role, setRole] = useState<Role>('customer');
  const [platformAdminPage, setPlatformAdminPage] = useState('dashboard');
  const [storeAdminPage, setStoreAdminPage] = useState('dashboard');
  const [customerPage, setCustomerPage] = useState('landing');
  const [isPlatformAdminLoggedIn, setIsPlatformAdminLoggedIn] = useState(false);
  const [isStoreAdminLoggedIn, setIsStoreAdminLoggedIn] = useState(false);
  
  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const renderContent = () => {
    if (role === 'platform-admin') {
      if (!isPlatformAdminLoggedIn) {
        return <PlatformAdminLogin onLogin={() => setIsPlatformAdminLoggedIn(true)} />;
      }
      switch (platformAdminPage) {
        case 'dashboard':
          return <PlatformAdminDashboard />;
        case 'stores':
          return <PlatformAdminStores />;
        case 'items':
          return <PlatformAdminItems />;
        case 'orders':
          return <PlatformAdminOrders />;
        case 'comments':
          return <PlatformAdminComments />;
        default:
          return <PlatformAdminDashboard />;
      }
    }

    if (role === 'store-admin') {
      if (!isStoreAdminLoggedIn) {
        return <StoreAdminLogin onLogin={() => setIsStoreAdminLoggedIn(true)} />;
      }
      switch (storeAdminPage) {
        case 'dashboard':
          return <StoreAdminDashboard />;
        case 'products':
          return <StoreAdminProducts />;
        case 'orders':
          return <StoreAdminOrders />;
        case 'comments':
          return <StoreAdminComments />;
        case 'store-details':
          return <StoreAdminStoreDetails />;
        default:
          return <StoreAdminDashboard />;
      }
    }

    if (role === 'customer') {
      switch (customerPage) {
        case 'landing':
          return <CustomerLanding />;
        case 'stores':
          return <CustomerStoreList />;
        case 'store-detail':
          return <CustomerStoreDetail />;
        case 'all-products':
          return <CustomerAllProducts />;
        case 'single-product':
          return <CustomerSingleProduct />;
        default:
          return <CustomerLanding />;
      }
    }

    return null;
  };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    // Reset to default pages when switching roles
    if (newRole === 'platform-admin') {
      setPlatformAdminPage('dashboard');
      setIsPlatformAdminLoggedIn(false);
    } else if (newRole === 'store-admin') {
      setStoreAdminPage('dashboard');
      setIsStoreAdminLoggedIn(false);
    } else {
      setCustomerPage('landing');
    }
  };

  const showNavigation = (role === 'platform-admin' && isPlatformAdminLoggedIn) || 
                        (role === 'store-admin' && isStoreAdminLoggedIn) || 
                        role === 'customer';

  return (
    <div className="min-h-screen bg-surface-white">
      {showNavigation && (
        <TopNav 
          role={role} 
          onRoleChange={handleRoleChange} 
          cartCount={cartItems.length} 
          onCartClick={() => setIsCartOpen(true)}
        />
      )}
      
      <div className="flex">
        {/* Show sidebar for admin roles when logged in */}
        {((role === 'platform-admin' && isPlatformAdminLoggedIn) || 
          (role === 'store-admin' && isStoreAdminLoggedIn)) && (
          <AdminSidebar
            role={role}
            activeItem={role === 'platform-admin' ? platformAdminPage : storeAdminPage}
            onItemClick={(id) => {
              if (role === 'platform-admin') {
                setPlatformAdminPage(id);
              } else {
                setStoreAdminPage(id);
              }
            }}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 ${role === 'customer' ? '' : 'bg-surface-white'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${role}-${role === 'platform-admin' ? platformAdminPage : role === 'store-admin' ? storeAdminPage : customerPage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Customer Navigation */}
      {role === 'customer' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <motion.div
            className="bg-white rounded-full shadow-2xl px-6 py-4 flex gap-4 border border-border-light"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setCustomerPage('landing')}
              className={`px-6 py-2 rounded-full transition-all ${
                customerPage === 'landing'
                  ? 'bg-primary-700 text-white'
                  : 'hover:bg-surface-gray100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCustomerPage('all-products')}
              className={`px-6 py-2 rounded-full transition-all ${
                customerPage === 'all-products'
                  ? 'bg-primary-700 text-white'
                  : 'hover:bg-surface-gray100'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCustomerPage('stores')}
              className={`px-6 py-2 rounded-full transition-all ${
                customerPage === 'stores'
                  ? 'bg-primary-700 text-white'
                  : 'hover:bg-surface-gray100'
              }`}
            >
              Stores
            </button>
            <button
              onClick={() => setCustomerPage('single-product')}
              className={`px-6 py-2 rounded-full transition-all ${
                customerPage === 'single-product'
                  ? 'bg-primary-700 text-white'
                  : 'hover:bg-surface-gray100'
              }`}
            >
              Product
            </button>
          </motion.div>
        </div>
      )}

      {/* Cart Sidebar */}
      {role === 'customer' && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={(id, quantity) => {
            setCartItems(cartItems.map(item => 
              item.id === id ? { ...item, quantity } : item
            ));
          }}
          onRemoveItem={(id) => {
            setCartItems(cartItems.filter(item => item.id !== id));
          }}
          onCheckout={() => {
            setIsCartOpen(false);
            alert('Proceeding to checkout...');
          }}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;