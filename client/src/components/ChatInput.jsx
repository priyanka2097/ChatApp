import { useEffect, useState, useRef } from "react"

export default function ChatInput({onSend, onTyping}) {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onSend(input);
        setInput('');
        inputRef.current?.focus();
    }

    function handleChange(e) {
        setInput(e.target.value);
        if (onTyping) {
            onTyping();
        }
    }
    return(
        <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                flexWrap: 'wrap',
            }}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={handleChange}
                style={{
                    flexGrow: 1,
                    padding: 10,
                    fontSize: 16,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    minWidth: 0,
                    flexBasis: '70%',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '10px 16px',
                    fontSize: 16,
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    flexBasis: '25%',
                }}
            >Send
            </button>
        </form>
    )
}