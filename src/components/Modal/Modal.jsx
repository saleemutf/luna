import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, footerContent, size = 'md' }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto'; // Ensure scroll is restored
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  let sizeClasses = 'max-w-xl'; // Default medium
  if (size === 'sm') sizeClasses = 'max-w-lg';
  if (size === 'lg') sizeClasses = 'max-w-3xl';
  if (size === 'xl') sizeClasses = 'max-w-5xl';
  if (size === 'full') sizeClasses = 'max-w-full h-full';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`bg-white text-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden w-full ${sizeClasses}`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal content
      >
        {/* Modal Header */}
        {title && (
          <div className="modal-header flex justify-between items-center p-4 border-b border-gray-200">
            <h3 id="modal-title" className="text-lg font-semibold text-gray-800">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-[#90a955] transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#90a955]"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        )}
        
        {/* Modal Body */}
        <div className="modal-body p-4 md:p-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-[#90a955] scrollbar-track-gray-100">
          {children}
        </div>

        {/* Modal Footer */}
        {footerContent && (
          <div className="modal-footer p-4 border-t border-gray-200 bg-white">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 