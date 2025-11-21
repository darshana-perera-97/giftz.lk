import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StoreAdminTopNav.css';

// Icons
const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function StoreAdminTopNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order Received', message: 'Order #ORD-001 has been placed', time: '2 minutes ago', unread: true },
    { id: 2, title: 'Product Review', message: 'New review received for Premium Watch', time: '15 minutes ago', unread: true },
    { id: 3, title: 'Order Shipped', message: 'Order #ORD-002 has been shipped', time: '1 hour ago', unread: false },
    { id: 4, title: 'Low Stock Alert', message: 'Luxury Bag is running low on stock', time: '2 hours ago', unread: true },
    { id: 5, title: 'Payment Received', message: 'Payment received for Order #ORD-003', time: '3 hours ago', unread: false },
  ]);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);

  const userData = {
    name: 'Store Manager',
    email: 'admin@luxurygifts.com',
    initials: 'SM'
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleRemoveNotification = (notificationId, e) => {
    e.stopPropagation(); // Prevent triggering the notification item click
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const handleLogout = () => {
    localStorage.removeItem('storeAdminStoreId');
    navigate('/storeAdmin/login');
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    if (isMenuOpen || isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isNotificationOpen]);

  return (
    <div className="store-top-nav">
      <div className="store-top-nav-container">
        <div className="store-top-nav-left">
          <div className="store-top-nav-logo">
            <div className="store-top-nav-logo-icon">
              <GiftIcon />
            </div>
            <div className="store-top-nav-logo-text">
              <h4 className="store-top-nav-title">Gift Platform</h4>
              <p className="store-top-nav-role">Store Admin</p>
            </div>
          </div>
        </div>

        <div className="store-top-nav-right">
          <div className="store-top-nav-notification-menu" ref={notificationRef}>
            <button
              className="store-top-nav-notification-button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="store-top-nav-notification-badge">{unreadCount}</span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="store-top-nav-notification-dropdown">
                <div className="store-top-nav-notification-header">
                  <h3 className="store-top-nav-notification-title">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="store-top-nav-notification-count">{unreadCount} new</span>
                  )}
                </div>

                <div className="store-top-nav-notification-list">
                  {notifications.length === 0 ? (
                    <div className="store-top-nav-notification-empty">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`store-top-nav-notification-item ${notification.unread ? 'store-top-nav-notification-item-unread' : ''}`}
                      >
                        <div className="store-top-nav-notification-content">
                          <h4 className="store-top-nav-notification-item-title">{notification.title}</h4>
                          <p className="store-top-nav-notification-item-message">{notification.message}</p>
                          <span className="store-top-nav-notification-item-time">{notification.time}</span>
                        </div>
                        <div className="store-top-nav-notification-item-right">
                          {notification.unread && (
                            <div className="store-top-nav-notification-dot"></div>
                          )}
                          <button
                            className="store-top-nav-notification-close"
                            onClick={(e) => handleRemoveNotification(notification.id, e)}
                            title="Remove notification"
                          >
                            <XIcon />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="store-top-nav-notification-footer">
                  <button className="store-top-nav-notification-view-all">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="store-top-nav-user-menu" ref={menuRef}>
            <button
              className="store-top-nav-user-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="store-top-nav-avatar">
                {userData.initials}
              </div>
              <ChevronDownIcon />
            </button>

            {isMenuOpen && (
              <div className="store-top-nav-dropdown">
                <div className="store-top-nav-dropdown-header">
                  <div className="store-top-nav-dropdown-avatar">
                    {userData.initials}
                  </div>
                  <div className="store-top-nav-dropdown-user-info">
                    <p className="store-top-nav-dropdown-name">{userData.name}</p>
                    <p className="store-top-nav-dropdown-email">{userData.email}</p>
                  </div>
                </div>

                <div className="store-top-nav-dropdown-separator"></div>

                <div className="store-top-nav-dropdown-menu">
                  <button className="store-top-nav-dropdown-item">
                    <UserIcon />
                    <span>Profile Settings</span>
                  </button>
                  <button className="store-top-nav-dropdown-item">
                    <SettingsIcon />
                    <span>Account Settings</span>
                  </button>
                  <button className="store-top-nav-dropdown-item">
                    <HelpIcon />
                    <span>Help & Support</span>
                  </button>
                </div>

                <div className="store-top-nav-dropdown-separator"></div>

                <button
                  className="store-top-nav-dropdown-item store-top-nav-dropdown-logout"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreAdminTopNav;

