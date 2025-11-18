import PlatformAdminLayout from './PlatformAdminLayout';
import './Page.css';

function PlatformAdminItems() {
  return (
    <PlatformAdminLayout>
      <div className="page-content">
        <h2 className="page-title">All Items</h2>
        <p className="page-subtitle">View and manage all items across all stores</p>
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminItems;

