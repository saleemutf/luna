import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal'; // Generic modal wrapper

const CreateItemModal = ({ 
  isOpen, 
  onClose, 
  modalTitle, 
  inputPlaceholder, 
  onCreate, 
  itemName: initialItemName = '', // For potential edit functionality later, defaults to empty for create
  loading = false
}) => {
  const [itemName, setItemName] = useState(initialItemName);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setItemName(initialItemName); // Reset or set initial name when modal opens
      setError(''); // Clear previous errors
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select(); // Select text if there is initialItemName (for editing)
        }
      }, 100); // Small delay to ensure modal is rendered and focus works
    } else {
      // Reset state when modal is closed and not just hidden
      setItemName('');
      setError('');
    }
  }, [isOpen, initialItemName]);

  const handleCreate = () => {
    if (!itemName.trim()) {
      setError('Item name cannot be empty.');
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    setError('');
    if (onCreate) {
      onCreate(itemName.trim());
    }
    // Optionally close after create, or let parent handle based on onCreate success
    // onClose(); 
  };

  const footer = (
    <div className="flex justify-end gap-3">
      <button 
        type="button"
        onClick={onClose} 
        disabled={loading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
      >
        Close
      </button>
      <button 
        type="button"
        onClick={handleCreate} 
        disabled={loading}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
            <i className="fas fa-spinner fa-spin mr-2"></i>
        ) : (
            <i className="fas fa-plus mr-2"></i>
        )}
        Create
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} footerContent={footer} size="sm">
      <div className="scenario-input-container py-2">
        <input 
          ref={inputRef}
          type="text" 
          id="itemNameInput" 
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
            if (error) setError(''); // Clear error on type
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCreate();
            }
          }}
          placeholder={inputPlaceholder || "Enter name..."} 
          className={`w-full p-2.5 bg-white border text-gray-800 rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
      </div>
      {/* Original HTML had an animation for error shake, can be added with CSS if needed */}
    </Modal>
  );
};

export default CreateItemModal; 