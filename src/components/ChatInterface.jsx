import React, { useState } from 'react';

const ChatInterface = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission here
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-4xl px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">How can I help you?</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Anything here... (Press Enter to send)"
            className="w-full px-6 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-24 shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-3">
            <button
              type="button"
              className="p-2.5 text-gray-500 hover:text-gray-700"
              aria-label="Record voice"
            >
              <i className="fas fa-microphone h-6 w-6"></i>
            </button>
            <button
              type="submit"
              className="p-2.5 text-white bg-[#90a955] rounded-full hover:bg-[#7c9346]"
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane h-6 w-6"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface; 