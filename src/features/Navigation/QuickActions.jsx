import React from 'react';

const QuickActions = ({ onSearchClick, onNewChatClick }) => {
  return (
    <div className="flex items-center justify-start gap-3 mb-6 px-2">
      <button 
        onClick={onSearchClick} 
        className="search-icon-container p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150"
        title="Search"
      >
        <i className="fas fa-search text-gray-800 text-lg"></i>
      </button>
      <button 
        onClick={onNewChatClick} 
        title="New Chat" 
        className="search-icon-container p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150"
      >
        <i className="fa-brands fa-rocketchat text-gray-800 text-lg"></i>
      </button>
    </div>
  );
};

export default QuickActions; 