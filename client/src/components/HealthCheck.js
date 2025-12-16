import { useEffect, useState } from 'react';
import ApiService from '../services/api';

const HealthCheck = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        // Try to fetch available slots as a health check
        await ApiService.getAvailableSlots();
        setApiStatus('healthy');
        setLastChecked(new Date().toLocaleTimeString());
      } catch (error) {
        console.warn('API health check failed:', error);
        setApiStatus('unhealthy');
        setLastChecked(new Date().toLocaleTimeString());
      }
    };

    // Check immediately
    checkApiHealth();

    // Check every 5 minutes
    const interval = setInterval(checkApiHealth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: apiStatus === 'healthy' ? '#4CAF50' : apiStatus === 'unhealthy' ? '#f44336' : '#ff9800',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      API: {apiStatus} {lastChecked && `(${lastChecked})`}
    </div>
  );
};

export default HealthCheck;