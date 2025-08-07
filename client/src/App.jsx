import {Routes, Route, Navigate} from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Navigate to="/chat/general" replace />} />
      <Route path="/chat/:roomId" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;