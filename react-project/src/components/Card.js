import './PlatformAdminCard.css';

function PlatformAdminCard({ className = '', children, ...props }) {
  return (
    <div className={`platform-admin-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export default PlatformAdminCard;

