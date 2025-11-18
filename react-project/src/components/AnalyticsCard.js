import './PlatformAdminAnalyticsCard.css';

// Icon components
const StoreIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const PackageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
    <path d="m3.5 9.27 9 5.15 9-5.15" />
    <path d="M12 18V9" />
  </svg>
);

const DollarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const iconMap = {
  store: StoreIcon,
  trendingUp: TrendingUpIcon,
  package: PackageIcon,
  dollar: DollarIcon,
};

function PlatformAdminAnalyticsCard({ title, value, change, changeType = 'neutral', icon, gradient = 'from-primary-500 to-primary-700' }) {
  const Icon = iconMap[icon] || StoreIcon;
  
  const changeColors = {
    positive: '#10b981',
    negative: '#ef4444',
    neutral: '#64748b'
  };

  const gradientClasses = {
    'from-primary-500 to-primary-700': 'analytics-card-gradient-primary',
    'from-status-success to-emerald-600': 'analytics-card-gradient-success',
    'from-secondary-500 to-orange-600': 'analytics-card-gradient-secondary',
    'from-purple-500 to-purple-700': 'analytics-card-gradient-purple',
  };

  return (
    <div className="analytics-card">
      <div className="analytics-card-content">
        <div className="analytics-card-info">
          <p className="analytics-card-title">{title}</p>
          <h2 className="analytics-card-value">{value}</h2>
          {change && (
            <div className="analytics-card-change">
              {changeType === 'positive' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={changeColors.positive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              )}
              {changeType === 'negative' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={changeColors.negative} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}>
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              )}
              <span style={{ color: changeColors[changeType] }}>{change}</span>
            </div>
          )}
        </div>
        
        <div className={`analytics-card-icon ${gradientClasses[gradient] || gradientClasses['from-primary-500 to-primary-700']}`}>
          <Icon />
        </div>
      </div>
    </div>
  );
}

export default PlatformAdminAnalyticsCard;

