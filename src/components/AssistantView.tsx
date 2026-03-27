import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const isActive = status.toLowerCase() === 'active';

    const orbStyle = isActive
        ? { background: timeTheme.gradient, boxShadow: `0 0 100px ${timeTheme.glow}` }
        : {};

    return (
        <div className="assistant-aura-container">
            <motion.div
                className={`aura-orb ${status.toLowerCase()} holo-shimmer`}
                style={orbStyle}
                data-time={timeTheme.label}
                animate={isActive ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                } : isListening ? {
                    scale: [1, 1.1, 1],
                } : {
                    scale: 1,
                    rotate: 0,
                }}
                transition={{
                    duration: isActive ? 4 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <AnimatePresence>
                {[...Array(3)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="aura-ring"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: i,
                            ease: "linear"
                        }}
                    />
                ))}
            </AnimatePresence>
            
            <VoiceWaveform 
                isActive={isListening} 
                color={isListening ? '#ffffff' : timeTheme.primary} 
            />

            <motion.div 
                className={`status-indicator ${status.toLowerCase()}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={status}
            >
                {status}
            </motion.div>
        </div>
    );
};

export default AssistantView;
