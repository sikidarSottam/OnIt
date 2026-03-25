import React, { useMemo } from 'react';
import VoiceWaveform from './VoiceWaveform';

interface AssistantViewProps {
    status: string;
}

function getTimeTheme(): { gradient: string; glow: string; label: string; primary: string } {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return { gradient: 'linear-gradient(135deg, #f59e0b, #fb923c)', glow: 'rgba(245, 158, 11, 0.6)', primary: '#f59e0b', label: 'morning' };
    } else if (hour >= 12 && hour < 17) {
        return { gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)', glow: 'rgba(99, 102, 241, 0.6)', primary: '#6366f1', label: 'afternoon' };
    } else if (hour >= 17 && hour < 21) {
        return { gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', glow: 'rgba(236, 72, 153, 0.6)', primary: '#ec4899', label: 'evening' };
    } else {
        return { gradient: 'linear-gradient(135deg, #312e81, #1e1b4b)', glow: 'rgba(49, 46, 129, 0.6)', primary: '#6366f1', label: 'night' };
    }
}

const AssistantView: React.FC<AssistantViewProps> = ({ status }) => {
    const timeTheme = useMemo(() => getTimeTheme(), []);
    const isListening = status.toLowerCase() === 'listening';

    const orbStyle = status.toLowerCase() === 'active'
        ? { background: timeTheme.gradient, boxShadow: `0 0 100px ${timeTheme.glow}` }
        : {};

    return (
        <div className="assistant-aura-container">
            <div
                className={`aura-orb ${status.toLowerCase()}`}
                style={orbStyle}
                data-time={timeTheme.label}
            ></div>
            <div className="aura-ring"></div>
            <div className="aura-ring"></div>
            <div className="aura-ring"></div>
            
            <VoiceWaveform 
                isActive={isListening} 
                color={isListening ? '#ffffff' : timeTheme.primary} 
            />

            <div className={`status-indicator ${status.toLowerCase()}`}>
                {status}
            </div>
        </div>
    );
};

export default AssistantView;
