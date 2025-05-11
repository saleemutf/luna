import React, { useState, useRef } from 'react';

const ChatInput = ({ onSendMessage, onAttachFile, onVoiceRecord, isRecording = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      // Max height for textarea (e.g., 5 lines, approx 20px per line + padding)
      const maxHeight = 5 * 20 + parseFloat(getComputedStyle(textareaRef.current).paddingTop) + parseFloat(getComputedStyle(textareaRef.current).paddingBottom);
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after send
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // TODO: Implement attachment preview logic if onAttachFile is used
  // const [attachments, setAttachments] = useState([]); 

  return (
    <div className="input-container bg-white p-3 border-t border-gray-200 shadow-top mt-auto">
      {/* Attachment preview area - Placeholder */}
      {/* {attachments.length > 0 && <AttachmentPreview items={attachments} />} */}
      
      <div className="input-wrapper flex items-end gap-2">
        {/* Attach button can be added here if functionality is desired */}
        {/* 
        <button 
            onClick={onAttachFile}
            className="input-action p-2.5 text-gray-500 hover:text-purple-600 rounded-full hover:bg-purple-100 transition-colors focus:outline-none"
            title="Attach file"
        >
            <i className="fas fa-paperclip text-lg"></i>
        </button> 
        */}
        <textarea 
          ref={textareaRef}
          className="input-field flex-grow p-2.5 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 leading-snug max-h-[120px]" // Added leading-snug and max-h
          placeholder="Ask Anything here... (Press Enter to send)" 
          rows="1"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{lineHeight: '1.5rem'}} // Ensure consistent line height for scrollHeight calculation
        />
        <div className="input-actions flex items-center flex-shrink-0 gap-1">
          <button 
            onClick={onVoiceRecord} 
            className={`input-action p-2.5 rounded-full transition-colors focus:outline-none ${isRecording ? 'text-red-500 bg-red-100 hover:bg-red-200' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-100'}`}
            title={isRecording ? "Stop voice recording" : "Start voice recording"}
          >
            <i className={`fas ${isRecording ? 'fa-stop-circle' : 'fa-microphone'} text-lg`}></i>
          </button>
          <button 
            onClick={handleSend} 
            className={`input-action send p-2.5 rounded-full text-white transition-colors focus:outline-none ${message.trim() ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
            title="Send message"
            disabled={!message.trim()}
          >
            <i className="fas fa-paper-plane text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput; 