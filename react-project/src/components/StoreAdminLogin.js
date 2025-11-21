import { useState } from 'react';
import './StoreAdminLogin.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function StoreAdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/store-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Invalid email or password');
        return;
      }

      if (onLogin) {
        onLogin(data.store);
      }
    } catch (err) {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="store-login-container">
      <div className="store-login-card">
        <div className="store-login-header">
          <div className="store-login-icon">
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
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
              <path d="M2 7h20" />
              <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
            </svg>
          </div>
          <h2 className="store-login-title">Store Admin</h2>
          <p className="store-login-subtitle">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="store-login-form">
          <div className="store-login-field">
            <label className="store-login-label">Email Address</label>
            <input
              type="email"
              placeholder="admin@store.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="store-login-input"
            />
          </div>

          <div className="store-login-field">
            <label className="store-login-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="store-login-input"
            />
          </div>

          {error && <p className="store-login-error">{error}</p>}

          <button type="submit" className="store-login-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="store-login-footer">
            <a href="#" className="store-login-forgot">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoreAdminLogin;

