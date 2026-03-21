import React from 'react';

interface InputControllerProps {
    messageContent: string;
    inputValue: string;
    liveTranscript?: string;
    isListening?: boolean;
    onInputChange: (value: string) => void;
    onMicClick: () => void;
    onSend: () => void;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}

const InputController: React.FC<InputControllerProps> = ({
    messageContent,
    inputValue,
    liveTranscript,
    isListening,
    onInputChange,
    onMicClick,
    onSend,
    inputRef,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="controls-section">
            <div className="response-container">
                <div className="content">
                    {messageContent}
                    {isListening && liveTranscript && (
                        <span className="live-transcript"> {liveTranscript}</span>
                    )}
                </div>
            </div>

            <div className="mic-wrapper">
                <button
                    className={`talk ${isListening ? 'listening' : ''}`}
                    title="Click to talk (Ctrl+M)"
                    onClick={onMicClick}
                    aria-label="Start listening"
                >
                    <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
                </button>
            </div>

            <div className="chat-section">
                <input
                    ref={inputRef}
                    type="text"
                    className="chat-input-box"
                    placeholder="Type a command or press '/' to focus..."
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="send-button" onClick={onSend}>
                    <i className="fas fa-paper-plane" style={{ marginRight: '6px' }}></i>
                    Send
                </button>
            </div>
            <div className="input-hint">
                Press <kbd>?</kbd> for shortcuts
            </div>
        </div>
    );
};

export default InputController;
