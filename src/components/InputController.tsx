import React, { useState } from 'react';
import { useInteractiveCard } from '../hooks/useInteractiveCard';

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
    const [bloomAction, setBloomAction] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            triggerSend();
        }
    };

    const triggerSend = () => {
        if (inputValue.trim()) {
            setBloomAction(true);
            setTimeout(() => setBloomAction(false), 500);
            onSend();
        }
    };

    const triggerMic = () => {
        setBloomAction(true);
        setTimeout(() => setBloomAction(false), 500);
        onMicClick();
    };

    // Use upgraded interactive hook for 3D tilt + spotlight (more aggressive for visibility)
    const spotlightResp = useInteractiveCard(12); 
    const spotlightChat = useInteractiveCard(15);

    return (
        <div className="controls-section">
            <div 
                className={`response-container spotlight shimmer-border ${bloomAction ? 'bloom-effect' : ''}`} 
                onMouseMove={spotlightResp.onMouseMove}
                onMouseLeave={spotlightResp.onMouseLeave}
                style={spotlightResp.style}
            >
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
                    onClick={triggerMic}
                    aria-label="Start listening"
                >
                    <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
                </button>
            </div>

            <div 
                className={`chat-section spotlight shimmer-border ${bloomAction ? 'bloom-effect' : ''}`}
                onMouseMove={spotlightChat.onMouseMove}
                onMouseLeave={spotlightChat.onMouseLeave}
                style={spotlightChat.style}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="chat-input-box"
                    placeholder="Type a command or press '/' to focus..."
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="send-button" onClick={triggerSend}>
                    <i className="fas fa-paper-plane" style={{ marginRight: '6px' }}></i>
                    Send
                </button>
            </div>
            <div className="input-hint">
                Press <KbdShortcut>?</KbdShortcut> for shortcuts
            </div>
        </div>
    );
};

const KbdShortcut: React.FC<{children: React.ReactNode}> = ({children}) => (
    <kbd style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '0.7rem'
    }}>{children}</kbd>
);

export default InputController;
