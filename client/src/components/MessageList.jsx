import { useRef, useEffect } from "react";
import MessageBubble from './MessageBubble';

export default function MessageList({messages}) {
    const currentUser = localStorage.getItem("username");
    const containerRef = useRef(null);

    useEffect(() => {
        if(containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <div
            ref={containerRef}
            style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: 10,
                border: '1px solid #ccc',
                marginBottom: 10,
                boxSizing: 'border-box',
                minHeight: 0
            }}
        >
            {messages.length === 0 && <p>No messages yet. Say hi!</p>}
            {messages.map((msg) => {
                const isCurrentUser = msg.user === currentUser;
                return (
                    <MessageBubble key={msg.id} msg={msg} isCurrentUser={isCurrentUser}/>
                );
            })}
        </div>
    );
}