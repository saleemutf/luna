import React from 'react';

const MorePopupContent = ({ sections = [], onItemClick = () => {} }) => {
  if (!sections || sections.length === 0) {
    return (
      <div className="more-popup absolute left-full top-0 ml-2 w-72 bg-gray-750 rounded-lg shadow-xl z-30 p-3 border border-gray-700 text-xs">
        <div className="text-gray-400 text-center py-4">No items to display.</div>
      </div>
    );
  }

  return (
    <div className="more-popup absolute left-full top-0 ml-2 w-72 bg-gray-750 rounded-lg shadow-xl z-30 p-3 border border-gray-700 text-xs">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="history-section mb-3 last:mb-0">
          <div className="history-section-title font-semibold text-gray-200 mb-1.5 text-[11px] uppercase tracking-wider">
            {section.title}
          </div>
          <div className="history-list scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 max-h-60 overflow-y-auto">
            {section.items && section.items.length > 0 ? (
              section.items.map((item, itemIndex) => (
                <div 
                  key={item.id || itemIndex} // Use item.id if available
                  className="history-list-item flex items-center p-1.5 rounded-md hover:bg-gray-650 cursor-pointer text-gray-300 hover:text-white transition-colors duration-150"
                  onClick={() => onItemClick(item)}
                  title={item.title}
                >
                  {item.icon && <i className={`${item.icon} mr-2.5 text-gray-400 w-4 text-center flex-shrink-0`}></i>}
                  <div className="history-item-content flex flex-col flex-grow min-w-0"> {/* min-w-0 for ellipsis */} 
                    <span className="history-item-title text-xs leading-tight truncate">{item.title}</span>
                    {item.meta && <span className="history-item-meta text-[10px] text-gray-500 truncate">{item.meta}</span>}
                  </div>
                  {item.status && (
                    <span className={`ml-2 history-item-status text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${item.status.toLowerCase() === 'pending' ? 'bg-yellow-500/30 text-yellow-300' : item.status.toLowerCase() === 'approved' ? 'bg-green-500/30 text-green-300' : 'bg-gray-500/30 text-gray-300'}`}>
                      {item.status}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-xs p-1.5">No items in this section.</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MorePopupContent; 