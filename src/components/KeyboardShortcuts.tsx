import React from 'react';

interface KeyboardShortcutsProps {
    isOpen: boolean;
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

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="shortcuts-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="shortcuts-panel">
                <div className="shortcuts-header">
                    <h3>
                        <i className="fas fa-keyboard" style={{ marginRight: '10px' }}></i>
                        Keyboard Shortcuts
                    </h3>
                    <button className="shortcuts-close" onClick={onClose}>&times;</button>
                </div>
                <div className="shortcuts-list">
                    {shortcuts.map((s, i) => (
                        <div key={i} className="shortcut-item">
                            <div className="shortcut-keys">
                                {s.keys.map((k, j) => (
                                    <React.Fragment key={j}>
                                        <kbd>{k}</kbd>
                                        {j < s.keys.length - 1 && <span className="key-separator">+</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <span className="shortcut-desc">{s.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="shortcuts-footer">
                    Press <kbd>?</kbd> anytime to toggle this panel
                </div>
            </div>
        </div>
    );
};

export default KeyboardShortcuts;
