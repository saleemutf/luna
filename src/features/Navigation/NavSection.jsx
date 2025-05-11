import React, { useState } from 'react';

const NavSection = ({ title, children, iconClass, onAddItem, initiallyOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const handleToggleOpen = (e) => {
    e.preventDefault(); // Prevent default if it's an anchor
    setIsOpen(!isOpen);
  };

  const handleAddItemClick = (e) => {
    e.stopPropagation(); // Prevent toggling section when clicking add
    if (onAddItem) {
      onAddItem();
    }
  };

  return (
    <div className="element mb-1.5">
      <a 
        href="#" 
        onClick={handleToggleOpen}
        className="nav-item flex justify-between items-center py-2 px-2.5 rounded-md hover:bg-gray-700 cursor-pointer text-sm text-gray-200 transition-colors duration-150 focus:outline-none focus:bg-gray-700"
      >
        <span className="flex items-center">
          {iconClass && <i className={`${iconClass} mr-2 text-gray-400`}></i>}
          {title}
        </span>
        <span className="count flex items-center">
          {onAddItem && (
            <button 
              onClick={handleAddItemClick} 
              className="p-1 rounded hover:bg-gray-600 focus:outline-none"
              title={`Add to ${title}`}
            >
              <i className="fas fa-add text-xs text-gray-400 hover:text-white"></i>
            </button>
          )}
          <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'} text-xs ml-2 text-gray-400 transition-transform duration-200`}></i>
        </span>
      </a>
      {isOpen && (
        <div className="submenu pl-3 pr-1 mt-1 border-l border-gray-700 ml-px">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavSection; 