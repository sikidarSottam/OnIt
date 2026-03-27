import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMouseSpotlight } from '../hooks/useMouseSpotlight';
import { STORAGE_KEYS, DEFAULT_USER_NAME, DEFAULT_THEME } from '../constants';

interface Settings {
    userName: string;
    theme: 'light' | 'dark';
}

interface SettingsPanelProps {
    onSettingsChange: (settings: Settings) => void;
    onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange, onClose }) => {
    const [settings, setSettings] = useState<Settings>({
        userName: localStorage.getItem(STORAGE_KEYS.USER_NAME) || DEFAULT_USER_NAME,
        theme: (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || DEFAULT_THEME as 'dark',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newSettings = { ...settings, [name]: value } as Settings;
        setSettings(newSettings);
        onSettingsChange(newSettings);
        localStorage.setItem(name === 'userName' ? STORAGE_KEYS.USER_NAME : STORAGE_KEYS.THEME, value);
    };

    const spotlight = useMouseSpotlight();

    return (
        <motion.div 
            className="settings-overlay" 
            role="dialog" 
            aria-modal="true" 
            aria-label="Settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="settings-panel spotlight glass-card"
                onMouseMove={spotlight.onMouseMove}
                onMouseLeave={spotlight.onMouseLeave}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={spotlight.style}
            >
                <div className="settings-header">
                    <h2>Settings</h2>
                    <button className="close-settings holo-shimmer" onClick={onClose} aria-label="Close settings">&times;</button>
                </div>

                <div className="setting-item">
                    <label htmlFor="userName">Your Name</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={settings.userName}
                        onChange={handleChange}
                        placeholder="Enter your name..."
                        className="holo-shimmer"
                    />
                </div>

                <div className="setting-item">
                    <label htmlFor="theme">Theme</label>
                    <select id="theme" name="theme" value={settings.theme} onChange={handleChange} className="holo-shimmer">
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>

                <div className="privacy-msg">
                    <p>🔒 Privacy First: All processing happens locally in your browser. No data is sent to external servers.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SettingsPanel;
