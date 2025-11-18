import PlatformAdminLayout from './PlatformAdminLayout';
import './Page.css';

function PlatformAdminOrders() {
  return (
    <PlatformAdminLayout>
      <div className="page-content">
        <h2 className="page-title">Orders</h2>
        <p className="page-subtitle">View and manage all orders</p>
      </div>
    </PlatformAdminLayout>
  );
}

export default PlatformAdminOrders;

