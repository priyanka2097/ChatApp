import { useChat } from "../contexts/ChatContext";

export function useRoomMessages(roomId) {
    const {messagesByRoom} = useChat();
    const messages = messagesByRoom[roomId] || [];
    return {messages};
}