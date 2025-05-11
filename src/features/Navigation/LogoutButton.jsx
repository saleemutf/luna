import React from 'react';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default action from HTML: window.location.href = 'login.html';
      // This should be handled by the application's routing logic in a React context.
      console.log('Logout action triggered. Implement navigation to login.');
      // For example, if using React Router: history.push('/login');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="logout-btn bg-gradient-to-r from-[#90a955] to-[#7c9346] hover:from-[#7c9346] hover:to-[#6b8039] text-white p-2.5 rounded-md text-sm w-full flex items-center justify-center gap-2 mt-4 focus:outline-none focus:ring-2 focus:ring-[#90a955] focus:ring-opacity-50 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg"
    >
      <i className="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton; 