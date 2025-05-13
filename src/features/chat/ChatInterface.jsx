import { useState, useEffect, useRef } from 'react';
import ConfirmationModal from '../../components/ConfirmationModal';

const ChatInterface = ({ messages, setMessages }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = useState('Disconnected');
  const [ws, setWs] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const connect = () => {
    const websocket = new WebSocket('ws://localhost:8000/ws/chat');
    
    websocket.onopen = () => {
      setStatus('Connected');
    };

    websocket.onclose = () => {
      setStatus('Disconnected - Reconnecting...');
      setTimeout(connect, 1000);
    };

    websocket.onmessage = (event) => {
      const data = event.data;
      
      // Ignore response time messages
      if (data.includes("[Response time:") || data === "\n[END]\n") {
        return;
      }

      // Add the assistant's message
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        
        // If the last message is from the assistant, append to it
        if (lastMessage?.type === 'assistant') {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            content: lastMessage.content + data
          };
          return updatedMessages;
        }
        
        // Otherwise, create a new assistant message
        return [...prevMessages, { type: 'assistant', content: data }];
      });
    };

    setWs(websocket);
  };

  useEffect(() => {
    connect();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !ws) return;

    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    ws.send(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    if (ws) {
      ws.close();
    }
    connect();
  };

  const handleResetChat = () => {
    // Check if there's an active chat (messages exist)
    if (messages.length > 0) {
      setIsModalOpen(true);
    } else {
      resetChat();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-lg font-semibold">Leave Assistant</div>
        <button
          onClick={handleResetChat}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={`${index}-${message.type}`}
            className={`max-w-[80%] p-3 rounded-xl ${
              message.type === 'user'
                ? 'ml-auto bg-green-600 text-white rounded-br-none'
                : 'bg-gray-100 rounded-bl-none'
            }`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="text-center text-sm p-2 text-gray-500">
        {status}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!ws || status !== 'Connected'}
          className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={resetChat}
        message="Do you want to start a new chat?"
      />
    </div>
  );
};

export default ChatInterface; 