import React from 'react';
import { motion } from 'framer-motion';

interface KeyboardShortcutsProps {
    onClose: () => void;
}

const shortcuts = [
    { keys: ['/', 'Space'], desc: 'Focus command input' },
    { keys: ['Esc'], desc: 'Close panels / Focus mode off' },
    { keys: ['Ctrl', 'M'], desc: 'Toggle microphone' },
    { keys: ['Ctrl', 'T'], desc: 'Open Toolbox' },
    { keys: ['Ctrl', 'F'], desc: 'Toggle Focus Mode' },
    { keys: ['?'], desc: 'Show this cheat sheet' },
];

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ onClose }) => {
    return (
        <motion.div 
            className="shortcuts-overlay open" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div 
                className="shortcuts-panel glass-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <div className="shortcuts-header">
                    <h3>
                        <i className="fas fa-keyboard" style={{ marginRight: '10px' }}></i>
                        Keyboard Shortcuts
                    </h3>
                    <button className="shortcuts-close holo-shimmer" onClick={onClose}>&times;</button>
                </div>
                <div className="shortcuts-list">
                    {shortcuts.map((s, i) => (
                        <motion.div 
                            key={i} 
                            className="shortcut-item"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div className="shortcut-keys">
                                {s.keys.map((k, j) => (
                                    <React.Fragment key={j}>
                                        <kbd>{k}</kbd>
                                        {j < s.keys.length - 1 && <span className="key-separator">+</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <span className="shortcut-desc">{s.desc}</span>
                        </motion.div>
                    ))}
                </div>
                <div className="shortcuts-footer">
                    Press <kbd className="holo-shimmer">?</kbd> anytime to toggle this panel
                </div>
            </motion.div>
        </motion.div>
    );
};

export default KeyboardShortcuts;
