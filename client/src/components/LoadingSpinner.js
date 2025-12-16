import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#667eea' }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  const spinnerStyle = {
    width: spinnerSize,
    height: spinnerSize,
    border: `3px solid rgba(102, 126, 234, 0.1)`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;