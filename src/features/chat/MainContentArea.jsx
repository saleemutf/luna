import React from 'react';

const MainContentArea = ({ onTogglePanel, leftPanelCollapsed }) => {
  return (
    <div className="main-content flex-grow bg-white p-4 flex flex-col relative">
      {/* Button to toggle left panel */}
      <button 
        onClick={onTogglePanel} 
        className="toggle-panel absolute top-4 left-0 -ml-3 bg-gray-700 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-600 transition-colors"
      >
        <i className={`fas fa-chevron-${leftPanelCollapsed ? 'right' : 'left'}`}></i>
      </button>
      
      <div className="flex-1 flex flex-col">
        {/* Add your main content here */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-semibold mb-4">Main Content Area</h1>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default MainContentArea; 