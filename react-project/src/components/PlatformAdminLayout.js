import PlatformAdminTopNav from './TopNav';
import PlatformAdminSidebar from './PlatformAdminSidebar';
import './PlatformAdminLayout.css';

function PlatformAdminLayout({ children }) {
  return (
    <div className="platform-admin-layout">
      <PlatformAdminTopNav />
      <div className="platform-admin-content">
        <PlatformAdminSidebar />
        <main className="platform-admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default PlatformAdminLayout;

