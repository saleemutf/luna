import React, { useState } from 'react';

const NavSection = ({ title, children, iconClass, onAddItem, initiallyOpen = true, allowCollapse = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const handleToggleOpen = (e) => {
    e.preventDefault(); // Prevent default if it's an anchor
    if (allowCollapse) {
      setIsOpen(!isOpen);
    }
  };

  const handleAddItemClick = (e) => {
    e.stopPropagation(); // Prevent toggling section when clicking add
    if (onAddItem) {
      onAddItem();
    }
  };

  return (
    <div className="element mb-1.5">
      <div 
        className="nav-item flex justify-between items-center py-2 px-2.5 rounded-md hover:bg-gray-100 text-sm text-gray-800 transition-colors duration-150"
      >
        <a 
          href="#" 
          onClick={handleToggleOpen}
          className={`flex items-center flex-grow ${allowCollapse ? 'cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100' : 'pointer-events-none'}`}
        >
          <span className="flex items-center">
            {iconClass && <i className={`${iconClass} mr-2 text-gray-600`}></i>}
            {title}
          </span>
        </a>
        <span className="count flex items-center">
          {onAddItem && (
            <button 
              onClick={handleAddItemClick} 
              className="p-1 rounded hover:bg-gray-200 focus:outline-none cursor-pointer"
              title={`Add to ${title}`}
            >
              <i className="fas fa-add text-xs text-gray-600 hover:text-gray-800"></i>
            </button>
          )}
          {allowCollapse && (
            <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'} text-xs ml-2 text-gray-600 transition-transform duration-200`}></i>
          )}
        </span>
      </div>
      {(isOpen || !allowCollapse) && (
        <div className="submenu pl-3 pr-1 mt-1 border-l border-gray-200 ml-px">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavSection; 