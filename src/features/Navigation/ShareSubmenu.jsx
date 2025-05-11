import React, { useState, useEffect, useRef } from 'react';

const ShareSubmenu = ({ usersData = [], onSelectUser, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Focus input when submenu opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    if (onSelectUser) {
      onSelectUser(user);
    }
    if (onClose) {
      onClose(); // Close submenu after selection
    }
  };

  return (
    <div className="share-submenu absolute left-full top-0 mt-0 ml-1 w-60 bg-gray-750 rounded-md shadow-xl z-30 p-2 border border-gray-700">
      <div className="share-search mb-2">
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search people..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-1.5 bg-gray-800 text-xs text-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500"
        />
      </div>
      <div className="share-list max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div 
              key={user.id} 
              className="share-item flex items-center p-1.5 hover:bg-gray-600 rounded-sm cursor-pointer transition-colors duration-150"
              onClick={() => handleUserClick(user)}
              title={`Share with ${user.name}`}
            >
              <div className="avatar w-6 h-6 bg-purple-500 text-white text-xs flex items-center justify-center rounded-full mr-2 flex-shrink-0">{user.initials}</div>
              <span className="text-xs text-gray-300 truncate">{user.name}</span>
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-500 p-1.5 text-center">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ShareSubmenu; 