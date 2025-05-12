import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatPanel from './ChatPanel'; // Import actual ChatPanel
import DetailsPanel from './DetailsPanel'; // Import actual DetailsPanel

const MainContentArea = ({ onTogglePanel, leftPanelCollapsed }) => {
  const location = useLocation();
  const shouldShowHeading = location.pathname !== '/my-leave-requests/pl2';

  return (
    <div className="main-content-area flex-grow bg-white p-4 flex relative transition-all duration-300">
      <button 
        onClick={onTogglePanel} 
        className="toggle-panel absolute top-1/2 -left-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white px-1.5 py-3 md:px-2 rounded-r-md shadow-lg z-20 transition-all duration-300 focus:outline-none h-16 md:h-20 flex items-center justify-center"
        title={leftPanelCollapsed ? "Open Panel" : "Close Panel"}
        aria-label={leftPanelCollapsed ? "Open navigation panel" : "Close navigation panel"}
      >
        <i className={`fas ${leftPanelCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm md:text-base`}></i>
      </button>
      
      <div className={`flex flex-col w-full transition-all duration-300 ${leftPanelCollapsed ? 'ml-0' : 'ml-6'}`}>
        {shouldShowHeading && (
          <h1 className="chat-heading text-xl font-semibold text-gray-700 mb-4 px-1">
            How can I help you?
          </h1>
        )}
        
        <div className="flex flex-row flex-grow overflow-hidden">
            <ChatPanel />
            <DetailsPanel />
        </div>
      </div>
    </div>
  );
};

export default MainContentArea; 