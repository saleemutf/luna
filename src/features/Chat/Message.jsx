import React from 'react';

// Placeholder for QuickReplyButton - can be a simple button for now
const QuickReplyButton = ({ text, icon, onClick, action }) => (
  <button 
    onClick={() => onClick(action)} // Pass the action to the handler
    className="quick-reply bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium py-1.5 px-3 border border-blue-300 rounded-full transition-colors duration-150 flex items-center shadow-sm hover:shadow-md"
  >
    {icon && <i className={`${icon} mr-1.5 text-blue-600`}></i>}
    {text}
  </button>
);

const Message = ({ text, isUser, avatarSrc, timestamp, quickReplies = [], onQuickReplyClick }) => {
  const avatarInitial = isUser ? 'U' : (avatarSrc || 'L'); // Default to 'L' or User initials
  const avatarColor = isUser ? 'bg-indigo-500' : 'bg-purple-500';

  return (
    <div className={`message flex mb-4 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`avatar w-8 h-8 rounded-full ${avatarColor} text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
        {avatarSrc ? <img src={avatarSrc} alt="avatar" className="w-full h-full rounded-full object-cover" /> : avatarInitial}
      </div>
      
      {/* Content Bubble */}
      <div className={`content-bubble max-w-lg lg:max-w-xl xl:max-w-2xl p-3 rounded-lg shadow-md ${isUser ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}>
        {/* Using dangerouslySetInnerHTML for initial HTML content. Sanitize if from untrusted source. */}
        <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
        
        {quickReplies.length > 0 && (
          <div className="quick-replies mt-2.5 pt-2.5 border-t border-opacity-20 flex flex-wrap gap-2 ${isUser ? 'border-indigo-300' : 'border-gray-300'}">
            {quickReplies.map((reply, index) => (
              <QuickReplyButton 
                key={index} 
                text={reply.label}
                icon={reply.icon}
                onClick={onQuickReplyClick}
                action={reply.action} // Pass the action identifier
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Timestamp (optional, can be shown on hover or below bubble) */}
      {/* <div className={`timestamp text-xs text-gray-400 mt-1 ${isUser ? 'mr-10' : 'ml-10'}`}>{timestamp}</div> */}
    </div>
  );
};

export default Message; 