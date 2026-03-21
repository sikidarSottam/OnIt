import React, { useEffect, useRef } from 'react';

export interface ChatMessage {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: Date;
}

interface ChatHistoryProps {
    messages: ChatMessage[];
    onRerun?: (text: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, onRerun }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="chat-history-container chat-empty">
                <div className="chat-empty-state">
                    <i className="fas fa-comments" style={{ fontSize: '2rem', opacity: 0.2, marginBottom: '12px' }}></i>
                    <p style={{ opacity: 0.4, fontSize: '0.9rem' }}>Your conversation will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-history-container">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.sender}`}>
                        <div className="message-content-text">
                            {msg.text}
                        </div>
                        <div className="message-footer">
                            <span className="message-time">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.sender === 'user' && onRerun && (
                                <button
                                    className="rerun-btn"
                                    onClick={() => onRerun(msg.text)}
                                    title="Re-run this command"
                                >
                                    <i className="fas fa-redo-alt"></i>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default ChatHistory;
