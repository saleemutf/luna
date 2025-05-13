import React from 'react';
// Assuming you will move davavo_logo.png to src/assets/images/
// import davavoLogo from '../../assets/images/davavo_logo.png';

const Logo = () => {
  // If using src/assets:
  // const logoSrc = davavoLogo;
  // If using public/images:
  const logoSrc = '/images/davavo_logo.png'; // Make sure this path is correct based on your setup

  return (
    <div className="logo-container mb-6">
      <a href="/" style={{ textDecoration: 'none' }} title="LUNA Home"> {/* Changed to root href */}
        <div className="logo-text flex items-center justify-center mb-1">
          <img 
            src={logoSrc} 
            alt="LUNA Logo" 
            className="max-w-[120px] h-auto md:max-w-[150px]" // Responsive max-width
          />
        </div>
        <div className="system-text text-center text-xs text-gray-600 font-medium">
          Luna Leave Management
        </div>
      </a>
    </div>
  );
};

export default Logo; 