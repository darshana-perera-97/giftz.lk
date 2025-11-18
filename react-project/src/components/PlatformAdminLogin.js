import { useState } from 'react';
import './PlatformAdminLogin.css';

function PlatformAdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="platform-login-container">
      <div className="platform-login-card">
        <div className="platform-login-header">
          <div className="platform-login-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </div>
          <h2 className="platform-login-title">Platform Admin</h2>
          <p className="platform-login-subtitle">Sign in to manage the platform</p>
        </div>

        <form onSubmit={handleSubmit} className="platform-login-form">
          <div className="platform-login-field">
            <label className="platform-login-label">Email Address</label>
            <input
              type="email"
              placeholder="admin@platform.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="platform-login-input"
            />
          </div>

          <div className="platform-login-field">
            <label className="platform-login-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="platform-login-input"
            />
          </div>

          <button type="submit" className="platform-login-button">
            Sign In
          </button>

          <div className="platform-login-footer">
            <a href="#" className="platform-login-forgot">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlatformAdminLogin;

