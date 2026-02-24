import React, { useEffect, useRef } from 'react';

export interface ChatMessage {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: Date;
}

interface ChatHistoryProps {
    messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-history-container">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                        <div className="message-time">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default ChatHistory;
