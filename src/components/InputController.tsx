import React from 'react';

interface InputControllerProps {
    messageContent: string;
    inputValue: string;
    onInputChange: (value: string) => void;
    onMicClick: () => void;
    onSend: () => void;
}

const InputController: React.FC<InputControllerProps> = ({
    messageContent,
    inputValue,
    onInputChange,
    onMicClick,
    onSend,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <>
            <div className="input">
                <div className="content">{messageContent}</div>
            </div>

            <div className="mic-button-container">
                <button className="talk" title="Click to talk" onClick={onMicClick} aria-label="Start listening">
                    <i className="fas fa-microphone"></i>
                </button>
            </div>

            <p className="click-hint">🎙 Click to Command</p>

            <div className="chat-section">
                <input
                    type="text"
                    className="chat-input-box"
                    placeholder="Type your command here..."
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="send-button" onClick={onSend}>Send</button>
            </div>
        </>
    );
};

export default InputController;
