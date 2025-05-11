import React, { useState, useRef, useEffect } from 'react';
import MorePopupContent from './MorePopupContent'; // Import the extracted component

const MoreLinkWithPopup = ({ popupTitle, sections, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null); // Ref for the popup content itself
  const triggerRef = useRef(null); // Ref for the "More..." trigger link

  const handleTogglePopup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the trigger and the popup
      if (
        triggerRef.current && !triggerRef.current.contains(event.target) &&
        popupRef.current && !popupRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) { // Only add listener if popup is open
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Re-run effect if isOpen changes

  return (
    <div className="relative mt-1"> {/* Added mt-1 to match original spacing of more trigger*/}
      <button 
        ref={triggerRef}
        className="submenu-item more-trigger w-full text-left text-xs text-gray-400 hover:text-gray-200 cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-650 focus:outline-none focus:bg-gray-650 transition-colors duration-150"
        onClick={handleTogglePopup}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        More...
      </button>
      {isOpen && (
        // The MorePopupContent component is absolutely positioned relative to its nearest positioned ancestor.
        // If <div className="relative"> above is not enough, ensure NavSection or NavSubMenuItem provides a positioning context.
        // For now, MorePopupContent styles itself with absolute positioning. We just need to ensure it is rendered.
        <div ref={popupRef}> {/* This div is mainly for the ref to detect outside clicks */} 
            <MorePopupContent sections={sections} onItemClick={onItemClick} />
        </div>
      )}
    </div>
  );
};

export default MoreLinkWithPopup; 