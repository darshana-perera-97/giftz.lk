import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerTopNav.css';

// Icons
const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function CustomerTopNav({ cartCount = 0, onCartClick }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    initials: 'JD'
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
    <div className="customer-top-nav">
      <div className="customer-top-nav-container">
        <div className="customer-top-nav-left">
          <div className="customer-top-nav-logo" onClick={() => navigate('/customer/landing')}>
            <div className="customer-top-nav-logo-icon">
              <GiftIcon />
            </div>
            <div className="customer-top-nav-logo-text">
              <h4 className="customer-top-nav-title">Gift Platform</h4>
              <p className="customer-top-nav-role">Customer View</p>
            </div>
          </div>
        </div>

        <div className="customer-top-nav-right">
          <button
            className="customer-top-nav-cart-button"
            onClick={onCartClick}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="customer-top-nav-cart-badge">{cartCount}</span>
            )}
          </button>

          <div className="customer-top-nav-user-menu" ref={menuRef}>
            <button
              className="customer-top-nav-user-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="customer-top-nav-avatar">
                {userData.initials}
              </div>
              <ChevronDownIcon />
            </button>

            {isMenuOpen && (
              <div className="customer-top-nav-dropdown">
                <div className="customer-top-nav-dropdown-header">
                  <div className="customer-top-nav-dropdown-avatar">
                    {userData.initials}
                  </div>
                  <div className="customer-top-nav-dropdown-user-info">
                    <p className="customer-top-nav-dropdown-name">{userData.name}</p>
                    <p className="customer-top-nav-dropdown-email">{userData.email}</p>
                  </div>
                </div>

                <div className="customer-top-nav-dropdown-separator"></div>

                <div className="customer-top-nav-dropdown-menu">
                  <button className="customer-top-nav-dropdown-item">
                    <UserIcon />
                    <span>My Account</span>
                  </button>
                  <button className="customer-top-nav-dropdown-item">
                    <span>Order History</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerTopNav;

