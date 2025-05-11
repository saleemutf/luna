import React, { useState, useRef, useEffect } from 'react';
import Message from './Message'; // Import new Message component
import ChatInput from './ChatInput'; // Import new ChatInput component

const ChatPanel = () => {
  // Sample messages - will be managed by state / context / API calls
  // The initial message structure is taken from the original newChat.html, lines 1288-1327
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      text: `👋 Welcome back! I noticed a few things to bring to your attention:<br><br>
            <div class="py-3 px-4 bg-purple-500/10 rounded-lg mb-3">
                <strong class="font-semibold text-purple-700">Previous Leave Discussion</strong><br>
                <span class="text-sm text-gray-700">You were discussing taking annual leave from July 15th to July 20th. Would you like to proceed with this application?</span>
            </div>
            <div class="py-3 px-4 bg-blue-500/10 rounded-lg mb-3">
                <strong class="font-semibold text-blue-700">Upcoming Leave</strong><br>
                <span class="text-sm text-gray-700">You have scheduled leave for August 5th to August 7th. Would you like to review or modify this?</span>
            </div>
            <div class="mt-4 text-sm text-gray-600">
                I can also help you with:
            </div>`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        { label: 'Yes, apply for this leave', action: 'apply_previous_leave', icon: 'fas fa-check-circle'},
        { label: 'No, discard this', action: 'discard_previous_leave', icon: 'fas fa-times-circle'},
        { label: 'Review leave details', action: 'review_upcoming_leave', icon: 'fas fa-eye'},
        // Adding other general quick replies from the HTML example
        { label: 'Check leave balance', action: 'check_balance', icon: 'fas fa-calendar-check' },
        { label: 'Apply for new leave', action: 'apply_new_leave', icon: 'fas fa-plane-departure' },
        { label: 'View leave policies', action: 'view_policies', icon: 'fas fa-book' },
        { label: 'Track requests', action: 'track_requests', icon: 'fas fa-list-check' },
      ]
    },
  ]);
  const chatContainerRef = useRef(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false); // Example state for voice input

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now().toString(),
      text: messageText, // Plain text from user
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // TODO: Implement actual bot response logic (handleUserAction from original HTML)
    console.log("User sent:", messageText);
    // Example: Simulate a bot reply after a short delay
    setTimeout(() => {
        const botReply = {
            id: Date.now().toString() + '-bot',
            text: `I received: "${messageText}". How can I assist further?`,
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickReplies: [
                { label: 'Check leave balance', action: 'check_balance', icon: 'fas fa-calendar-check' },
                { label: 'Apply for new leave', action: 'apply_new_leave', icon: 'fas fa-plane-departure' },
            ]
        };
        // setMessages(prevMessages => [...prevMessages, botReply]);
    }, 1000);
  };

  const handleQuickReplyClick = (action) => {
    console.log("Quick Reply Clicked, action:", action);
    // Find the label for the action to display as user message
    let replyLabel = '';
    messages.forEach(msg => {
        if (msg.quickReplies) {
            const foundReply = msg.quickReplies.find(qr => qr.action === action);
            if (foundReply) replyLabel = foundReply.label;
        }
    });

    if (replyLabel) {
        const userMessageFromQuickReply = {
            id: Date.now().toString(),
            text: replyLabel,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, userMessageFromQuickReply]);
    }
    // TODO: Implement actual action handling (handleUserAction from original HTML)
    // Example: handleUserAction(action);
  };

  const handleVoiceRecord = () => {
    setIsVoiceRecording(!isVoiceRecording);
    console.log(isVoiceRecording ? "Stop voice recording" : "Start voice recording");
    // TODO: Implement actual voice recording logic using Web Speech API or similar
  };

  return (
    <div className="chat-panel flex flex-col flex-grow bg-white rounded-lg shadow-md overflow-hidden">
      <div ref={chatContainerRef} className="chat-messages flex-grow p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.map(msg => (
          <Message 
            key={msg.id} 
            text={msg.text} 
            isUser={msg.isUser} 
            timestamp={msg.timestamp} 
            avatarSrc={msg.avatarSrc} // Pass if available
            quickReplies={msg.quickReplies || []}
            onQuickReplyClick={handleQuickReplyClick}
          />
        ))}
      </div>
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onAttachFile={() => console.log('Attach file clicked')} 
        onVoiceRecord={handleVoiceRecord}
        isRecording={isVoiceRecording}
      />
    </div>
  );
};

export default ChatPanel; 