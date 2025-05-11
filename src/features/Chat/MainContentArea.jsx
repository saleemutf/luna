import React from 'react';
import ChatPanel from './ChatPanel'; // Import actual ChatPanel
import DetailsPanel from './DetailsPanel'; // Import actual DetailsPanel

const MainContentArea = ({ onTogglePanel, leftPanelCollapsed }) => {
  return (
    <div className="main-content-area flex-grow bg-gray-200 p-4 md:p-6 flex relative transition-all duration-300">
      <button 
        onClick={onTogglePanel} 
        className="toggle-panel absolute top-1/2 -left-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white px-1.5 py-3 md:px-2 rounded-r-md shadow-lg z-20 transition-all duration-300 focus:outline-none h-16 md:h-20 flex items-center justify-center"
        style={{ /* Adjust positioning if necessary, ensure it's visually accessible */ }}
        title={leftPanelCollapsed ? "Open Panel" : "Close Panel"}
        aria-label={leftPanelCollapsed ? "Open navigation panel" : "Close navigation panel"}
      >
        <i className={`fas ${leftPanelCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm md:text-base`}></i>
      </button>
      
      {/* This div will ensure content doesn't overlap with the button if the panel is part of the flow 
          Adding padding-left to account for the button area when panel is open or to adjust content start point 
          The amount of padding should ideally match or exceed the button's width + its negative margin if it overlaps
      */}
      <div className={`flex flex-col w-full transition-all duration-300 ${leftPanelCollapsed ? 'ml-0' : 'ml-6 md:ml-8'}`}>
        {/* Heading from original HTML for the chat area */}
        <h1 className="chat-heading text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 px-1">
          How can I help you?
        </h1>
        
        {/* Main chat and details area */}
        <div className="flex flex-row flex-grow overflow-hidden">
            <ChatPanel />
            <DetailsPanel />
        </div>
      </div>
    </div>
  );
};

export default MainContentArea; 