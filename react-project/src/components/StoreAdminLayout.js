import StoreAdminTopNav from './StoreAdminTopNav';
import StoreAdminSidebar from './StoreAdminSidebar';
import StoreAdminBottomNav from './StoreAdminBottomNav';
import './StoreAdminLayout.css';

function StoreAdminLayout({ children }) {
  return (
    <div className="store-admin-layout">
      <StoreAdminTopNav />
      <div className="store-admin-content">
        <StoreAdminSidebar />
        <main className="store-admin-main">
          {children}
        </main>
      </div>
      <StoreAdminBottomNav />
    </div>
  );
}

export default StoreAdminLayout;

