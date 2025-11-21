import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlatformAdminTopNav.css';

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

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

function PlatformAdminTopNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const userData = {
    name: 'Admin User',
    email: 'admin@platform.com',
    initials: 'AU'
  };

  const handleLogout = () => {
    navigate('/platformAdmin/login');
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="top-nav">
      <div className="top-nav-container">
        <div className="top-nav-left">
          <div className="top-nav-logo">
            <div className="top-nav-logo-icon">
              <GiftIcon />
            </div>
            <div className="top-nav-logo-text">
              <h4 className="top-nav-title">Gift Platform</h4>
              <p className="top-nav-role">Platform Admin</p>
            </div>
          </div>
        </div>

        <div className="top-nav-right">
          <div className="top-nav-user-menu" ref={menuRef}>
            <button
              className="top-nav-user-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="top-nav-avatar">
                {userData.initials}
              </div>
              <ChevronDownIcon />
            </button>

            {isMenuOpen && (
              <div className="top-nav-dropdown">
                <div className="top-nav-dropdown-header">
                  <div className="top-nav-dropdown-avatar">
                    {userData.initials}
                  </div>
                  <div className="top-nav-dropdown-user-info">
                    <p className="top-nav-dropdown-name">{userData.name}</p>
                    <p className="top-nav-dropdown-email">{userData.email}</p>
                  </div>
                </div>

                <div className="top-nav-dropdown-separator"></div>

                <button
                  className="top-nav-dropdown-item top-nav-dropdown-logout"
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

export default PlatformAdminTopNav;

