import React from 'react';

const HistorySidebarItem = ({ title, icon, time, status, onItemClick }) => (
  <div 
    className="history-item flex items-center text-xs text-gray-700 py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-150"
    onClick={onItemClick}
  >
    {/* Original HTML did not consistently use icons here, but can be added if desired */}
    {/* icon && <i className={`${icon} icon mr-2 text-gray-500`}></i> */}
    <span className="title flex-grow truncate hover:text-gray-900" title={title}>{title}</span>
    {/* time && <span className="time text-gray-500 text-[10px] ml-2">{time}</span> */}
    {/* status && <span className={`status text-[10px] ml-2 ${status === 'Draft' ? 'text-yellow-400' : 'text-green-400'}`}>{status}</span> */}
  </div>
);

const HistorySidebarSection = ({ title, items, onItemClick = () => {} }) => {
  // The original HTML had toggle icons for sections, but they were commented out or not functional.
  // For simplicity, sections are always open here.
  return (
    <div className="history-section mb-3">
      <div className="section-title text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
        {title}
        {/* <i className="fas fa-chevron-down toggle ml-1"></i> */}
      </div>
      {items.map((item, index) => (
        <HistorySidebarItem 
          key={index} 
          title={item.title} 
          icon={item.icon} // Pass icon if available in data
          time={item.time}
          status={item.status}
          onItemClick={() => onItemClick(item)} 
        />
      ))}
    </div>
  );
};

export default HistorySidebarSection; 