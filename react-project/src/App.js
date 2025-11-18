import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PlatformAdminLogin from './components/PlatformAdminLogin';
import PlatformAdminDashboard from './components/Dashboard';
import PlatformAdminStores from './components/PlatformAdminStores';
import PlatformAdminItems from './components/PlatformAdminItems';
import PlatformAdminOrders from './components/PlatformAdminOrders';
import PlatformAdminComments from './components/PlatformAdminComments';
import StoreAdminLogin from './components/StoreAdminLogin';
import StoreAdminDashboard from './components/StoreAdminDashboard';
import StoreAdminProducts from './components/StoreAdminProducts';
import StoreAdminOrders from './components/StoreAdminOrders';
import StoreAdminComments from './components/StoreAdminComments';
import StoreAdminStoreDetails from './components/StoreAdminStoreDetails';
import CustomerLanding from './components/CustomerLanding';
import CustomerStoreList from './components/CustomerStoreList';
import CustomerStoreDetail from './components/CustomerStoreDetail';
import CustomerAllProducts from './components/CustomerAllProducts';
import CustomerSingleProduct from './components/CustomerSingleProduct';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handlePlatformAdminLogin = () => {
    console.log('Platform admin logged in');
    navigate('/platformAdmin/dashboard');
  };

  const handleStoreAdminLogin = () => {
    console.log('Store admin logged in');
    navigate('/storeAdmin/dashboard');
  };

  return (
    <div className="App">
      <Routes>
        {/* Platform Admin Routes */}
        <Route path="/platformAdmin/login" element={<PlatformAdminLogin onLogin={handlePlatformAdminLogin} />} />
        <Route path="/platformAdmin/dashboard" element={<PlatformAdminDashboard />} />
        <Route path="/platformAdmin/stores" element={<PlatformAdminStores />} />
        <Route path="/platformAdmin/items" element={<PlatformAdminItems />} />
        <Route path="/platformAdmin/orders" element={<PlatformAdminOrders />} />
        <Route path="/platformAdmin/comments" element={<PlatformAdminComments />} />
        <Route path="/platformAdmin" element={<Navigate to="/platformAdmin/login" replace />} />
        
        {/* Store Admin Routes */}
        <Route path="/storeAdmin/login" element={<StoreAdminLogin onLogin={handleStoreAdminLogin} />} />
        <Route path="/storeAdmin/dashboard" element={<StoreAdminDashboard />} />
        <Route path="/storeAdmin/products" element={<StoreAdminProducts />} />
        <Route path="/storeAdmin/orders" element={<StoreAdminOrders />} />
        <Route path="/storeAdmin/comments" element={<StoreAdminComments />} />
        <Route path="/storeAdmin/store-details" element={<StoreAdminStoreDetails />} />
        <Route path="/storeAdmin" element={<Navigate to="/storeAdmin/login" replace />} />
        
        {/* Customer Routes */}
        <Route path="/customer/landing" element={<CustomerLanding />} />
        <Route path="/customer/stores" element={<CustomerStoreList />} />
        <Route path="/customer/store-detail/:id" element={<CustomerStoreDetail />} />
        <Route path="/customer/all-products" element={<CustomerAllProducts />} />
        <Route path="/customer/single-product/:id" element={<CustomerSingleProduct />} />
        <Route path="/customer" element={<Navigate to="/customer/landing" replace />} />
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/customer/landing" replace />} />
      </Routes>
    </div>
  );
}

export default App;
