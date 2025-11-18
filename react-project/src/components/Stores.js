import PlatformAdminLayout from './PlatformAdminLayout';
import './Page.css';

function PlatformAdminStores() {
  return (
    <PlatformAdminLayout>
      <div className="page-content">
        <h2 className="page-title">Stores</h2>
        <p className="page-subtitle">Manage all stores on the platform</p>
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminStores;

