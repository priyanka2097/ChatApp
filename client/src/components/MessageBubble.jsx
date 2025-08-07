import { useChat } from '../contexts/ChatContext';

export default function MessageBubble({ msg, isCurrentUser }) {
  const { userColors } = useChat();
  const usernameColor = userColors[msg.user] || '#555'; // default fallback
  console.log('Rendering MessageBubble for:', msg.user, 'with color:', userColors[msg.user]);
    return (
      <div
        style={{
          padding: '8px 12px',
          marginBottom: 6,
          backgroundColor: isCurrentUser ? '#dcf8c6' : '#f1f1f1',
          borderRadius: 8,
          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
          maxWidth: '80%',
          marginLeft: isCurrentUser ? 'auto' : 0,
          marginRight: isCurrentUser ? 0 : 'auto'
        }}
      >
        <div style={{
          fontSize: 12,
          color: usernameColor,
          marginBottom: 4,
          fontWeight: 'bold',
        }}>
          {msg.user}
        </div>
        <div style={{ fontSize: 16 }}>
          {msg.text}
        </div>
      </div>
    );
  }