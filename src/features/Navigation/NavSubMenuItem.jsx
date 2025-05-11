import React, { useState, useRef, useEffect } from 'react';
import ShareSubmenu from './ShareSubmenu'; // Import the new component

// Dummy user data for ShareSubmenu - this should come from props or context eventually
const sampleUsers = [
  { id: 'jd', initials: 'JD', name: 'John Doe' },
  { id: 'js', initials: 'JS', name: 'Jane Smith' },
  { id: 'rj', initials: 'RJ', name: 'Robert Johnson' },
  { id: 'mp', initials: 'MP', name: 'Mary Parker' },
  { id: 'ws', initials: 'WS', name: 'William Scott' },
];

const NavSubMenuItem = ({ 
  title, 
  href = "#", 
  isLocked = false,
  dropdownItems = [],
  itemData // Pass the original item data for context in actions
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareSubmenuOpen, setShareSubmenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const shareTriggerRef = useRef(null);

  const handleToggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(prev => !prev);
    setShareSubmenuOpen(false); 
  };

  const handleToggleShareSubmenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.isShareTrigger) { // Ensure it's the share trigger
        setShareSubmenuOpen(prev => !prev);
    }
  };

  const handleItemAction = (e, actionCallback) => {
    e.stopPropagation();
    if (actionCallback) actionCallback(itemData); // Pass itemData to the action
    setDropdownOpen(false);
    setShareSubmenuOpen(false);
  };

  const handleSelectShareUser = (user) => {
    console.log(`Sharing "${title}" with ${user.name}`);
    // Actual share logic here
    setShareSubmenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShareSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={`submenu-item group relative flex justify-between items-center py-1.5 px-2 rounded-md hover:bg-gray-650 text-xs mb-0.5 transition-colors duration-150 ${isLocked ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300'}`}>
      <a href={isLocked ? undefined : href} className={`nav-itemx flex-grow hover:text-white ${isLocked ? 'pointer-events-none' : ''}`}>
        {title}
      </a>
      {dropdownItems.length > 0 && (
        <button 
            onClick={handleToggleDropdown} 
            className="three-dots cursor-pointer p-1 opacity-0 group-hover:opacity-100 hover:text-white focus:opacity-100 focus:outline-none transition-opacity duration-150"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            title="More actions"
        >
          <i className="fas fa-ellipsis-h text-gray-400"></i>
        </button>
      )}
      
      {dropdownOpen && dropdownItems.length > 0 && (
        <div 
            ref={dropdownRef} 
            className="dropdown-menu absolute right-0 top-full mt-1 w-48 bg-gray-750 rounded-md shadow-xl z-20 py-1 border border-gray-700"
            role="menu"
        >
          {dropdownItems.map((item, index) => (
            <div // Changed from div to button if it's an action item, or li for semantics
              key={index} 
              ref={item.isShareTrigger ? shareTriggerRef : null}
              className="dropdown-item-wrapper relative" // Wrapper for positioning ShareSubmenu
              role="menuitem"
            >
              <button
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-gray-600 cursor-pointer text-gray-300 hover:text-white text-xs focus:outline-none focus:bg-gray-600"
                onClick={(e) => item.isShareTrigger ? handleToggleShareSubmenu(e, item) : handleItemAction(e, item.action)}
              >
                <span className="flex items-center">
                  {item.icon && <i className={`${item.icon} mr-2.5 w-4 text-center text-gray-400`}></i>}
                  {item.label}
                </span>
                {item.isShareTrigger && <i className="fas fa-chevron-right text-gray-500 text-[10px]"></i>}
              </button>

              {item.isShareTrigger && shareSubmenuOpen && (
                <ShareSubmenu 
                    usersData={sampleUsers} 
                    onSelectUser={handleSelectShareUser} 
                    onClose={() => setShareSubmenuOpen(false)} 
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavSubMenuItem; 