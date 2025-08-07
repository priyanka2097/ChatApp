import { createContext, useContext, useState, useEffect } from 'react';

const COLOR_PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
  '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'
];
const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [userColors, setUserColors] = useState({});
  const [username, setUsername] = useState('');
  const [messagesByRoom, setmessagesByRoom] = useState(() => {
    const data = {};
    for (let key in localStorage) {
      if(key.startsWith('chatMessages_')) {
          const roomId = key.replace('chatMessages_', '');
          try{
              data[roomId] = JSON.parse(localStorage.getItem(key));
          } catch(e) {
              data[roomId] = [];
          }
      }
    }
    return data;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      const name = prompt("Enter your name");
      if (name && name.trim() !== '') {
        setUsername(name);
        localStorage.setItem("username", name);
      }
    }
  }, []);

  useEffect(() => {
    for(let roomId in messagesByRoom) {
        localStorage.setItem(`chatMessages_${roomId}`, JSON.stringify(messagesByRoom[roomId]));
    }
  }, [messagesByRoom]);

  useEffect(() => {
    const allUsers = new Set();
    Object.values(messagesByRoom).flat().forEach(msg => {
      if(msg.user) {
        allUsers.add(msg.user);
      }
    });
    setUserColors(prev => {
      const updated = { ...prev };
      const usedColors = Object.values(prev);
      const availableColors = COLOR_PALETTE.filter(c => !usedColors.includes(c));
      let colorIndex = 0;
  
      for (let user of allUsers) {
        if (!updated[user]) {
          updated[user] = availableColors[colorIndex] || '#000';
          colorIndex++;
        }
      }
  
      return updated;
    });
  }, [messagesByRoom]);


  function addMessage(roomId, message) {
    if (!message.text || !message.text.trim()) return;
    console.log('Assigning color to', message.user);  
    setmessagesByRoom(prev => {
        const updated = {
            ...prev,
            [roomId]: [...(prev[roomId] || []), message],
        };
        return updated;
      });
  }

  return (
    <ChatContext.Provider value={{ username, messagesByRoom, addMessage, userColors }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
