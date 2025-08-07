import {io} from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { useRoomMessages } from '../hooks/useRoomMessages';
import UserHeader from '../components/UserHeader';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import RoomSwitcher from '../components/RoomSwitcher';

export default function ChatRoom() {
  const { roomId } = useParams();
  const {username,addMessage} = useChat();
  const scrollRef = useRef();
  const socketRef = useRef(null);
  const {messages} = useRoomMessages(roomId);
  const [typingUser, setTypingUser] = useState(null);

  // 🔹 Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.on('connect', () => {
        console.log('Connected to WebSocket:', socket.id);
        socket.emit('join', roomId);
    });

    socket.on('Chat message', (newMsg) => {
        if(newMsg.room === roomId) {
            addMessage(roomId, newMsg);
        }
    });

    socket.on('typing', ({ user }) => {
      if (user !== username) {
        console.log('Typing event received from:', user);
        setTypingUser(user);

        setTimeout(() => {
          setTypingUser(null);
        }, 2000);
      }
    });

    return () => {
        socket.disconnect();
        console.log('Disconnected from WebSocket');
    }
  }, [roomId, addMessage]);

  function sendMessage(text) {
    if(text.trim() === '') return;

    const newMsg = {
      id: Date.now(),
      text,
      user: username,
      room: roomId
    };

    socketRef.current.emit('Chat message', newMsg);

    addMessage(roomId, newMsg);
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '600px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        fontFamily: 'Arial, sans-serif',
      }}>
        <h2 style={{ textAlign: 'center' }}>Room: {roomId}</h2>
        <RoomSwitcher currentRoom={roomId} />
        <UserHeader name={username} />
        <MessageList messages={messages} scrollRef={scrollRef} />
        {typingUser && typingUser !== username && (
          <div style={{ fontSize: '12px', color: '#cc5500', padding: '4px' }}>
            {typingUser} is typing...
          </div>
        )}
        <ChatInput onSend={sendMessage} 
          onTyping={() => {
            console.log('Sending typing event');
            socketRef.current.emit('typing', {room: roomId, user: username});
          }}
        />
      </div>
    </div>
  );
}
