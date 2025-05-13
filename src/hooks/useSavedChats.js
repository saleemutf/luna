import { useState, useEffect } from 'react';

const useSavedChats = () => {
  const [savedChats, setSavedChats] = useState([]);

  useEffect(() => {
    loadSavedChats();
  }, []);

  const loadSavedChats = () => {
    const chats = JSON.parse(localStorage.getItem('savedChats') || '[]');
    setSavedChats(chats);
  };

  const groupChatsByDate = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return savedChats.reduce((groups, chat) => {
      const chatDate = new Date(chat.createdAt);
      
      if (chatDate.toDateString() === today.toDateString()) {
        groups.today.push(chat);
      } else if (chatDate >= sevenDaysAgo) {
        groups.prev7Days.push(chat);
      } else {
        groups.older.push(chat);
      }
      
      return groups;
    }, { today: [], prev7Days: [], older: [] });
  };

  const deleteChat = (chatId) => {
    const updatedChats = savedChats.filter(chat => chat.id !== chatId);
    localStorage.setItem('savedChats', JSON.stringify(updatedChats));
    setSavedChats(updatedChats);
  };

  return {
    savedChats,
    groupedChats: groupChatsByDate(),
    loadSavedChats,
    deleteChat
  };
};

export default useSavedChats; 