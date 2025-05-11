import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal/Modal';

const SearchResultItem = ({ icon, text, onClick }) => (
  <div 
    className="search-result flex items-center p-2.5 hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
    onClick={onClick}
  >
    <i className={`${icon} text-purple-400 text-sm mr-3 w-5 text-center`}></i>
    <span className="text-gray-300 text-sm truncate">{text}</span>
  </div>
);

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const recentSearches = [
    { id: 'rec1', icon: 'fas fa-history', text: 'Annual Leave Request (July 15-20)' },
    { id: 'rec2', icon: 'fas fa-history', text: 'Sick Leave Policy' },
    { id: 'rec3', icon: 'fas fa-history', text: 'Parental Leave Benefits' },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    const mockResults = [
      { id: 'res1', icon: 'fas fa-calendar-check', text: `Leave Request matching "${searchTerm}"` },
      { id: 'res2', icon: 'fas fa-book', text: `Policy containing "${searchTerm}"` },
      { id: 'res3', icon: 'fas fa-calculator', text: `Leave scenario with "${searchTerm}"` },
    ].filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()));
    setResults(mockResults);
  }, [searchTerm]);

  const handleSearchItemClick = (item) => {
    console.log('Search item clicked:', item.text);
    onClose();
  };

  const itemsToDisplay = searchTerm.trim() ? results : recentSearches;

  const customHeader = (
    <div className="flex items-center w-full bg-gray-800 py-2 px-3 md:px-4 border-b border-gray-700">
      <i className="fas fa-search text-gray-500 text-base md:text-lg mr-2 md:mr-3"></i>
      <input 
        ref={inputRef}
        type="text" 
        className="flex-grow bg-transparent text-gray-200 text-sm md:text-base focus:outline-none placeholder-gray-500"
        placeholder="Search leave requests, policies, or scenarios..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        onClick={onClose} 
        className="text-gray-400 hover:text-white transition-colors p-1 ml-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
        aria-label="Close search modal"
      >
        <i className="fas fa-times text-lg md:text-xl"></i>
      </button>
    </div>
  );

  const customFooter = (
    <div className="flex items-center justify-center text-xs text-gray-500 py-2.5 px-4 bg-gray-800 border-t border-gray-700">
      <div className="search-shortcut">
        <span className="key bg-gray-700 px-1.5 py-0.5 rounded-sm font-mono text-gray-300">⌘</span>
        <span className="key bg-gray-700 px-1.5 py-0.5 rounded-sm font-mono ml-0.5 text-gray-300">K</span>
        <span className="ml-1.5 text-gray-400">to open,</span>
        <span className="key bg-gray-700 px-1.5 py-0.5 rounded-sm font-mono ml-1.5 text-gray-300">ESC</span>
        <span className="ml-1.5 text-gray-400">to close</span>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={null} size="lg"> 
      {customHeader}
      <div className="search-modal-body py-3 px-2 min-h-[200px] max-h-[calc(80vh-120px)] md:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {itemsToDisplay.length > 0 ? (
          itemsToDisplay.map(item => (
            <SearchResultItem 
              key={item.id} 
              icon={item.icon} 
              text={item.text} 
              onClick={() => handleSearchItemClick(item)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8 text-sm">
            {searchTerm ? 'No results found for "' + searchTerm + '"' : 'No recent searches.'}
          </div>
        )}
      </div>
      {customFooter}
    </Modal>
  );
};

export default SearchModal; 