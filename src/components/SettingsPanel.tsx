import React, { useState } from 'react';

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
        userName: localStorage.getItem('onit_userName') || 'Boss',
        theme: (localStorage.getItem('onit_theme') as 'light' | 'dark') || 'dark',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newSettings = { ...settings, [name]: value } as Settings;
        setSettings(newSettings);
        onSettingsChange(newSettings);
        localStorage.setItem(`onit_${name}`, value);
    };

    return (
        <div className="settings-overlay" role="dialog" aria-modal="true" aria-label="Settings">
            <div className="settings-panel">
                <div className="settings-header">
                    <h2>Settings</h2>
                    <button className="close-settings" onClick={onClose} aria-label="Close settings">&times;</button>
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
                    />
                </div>

                <div className="setting-item">
                    <label htmlFor="theme">Theme</label>
                    <select id="theme" name="theme" value={settings.theme} onChange={handleChange}>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>

                <div className="privacy-msg">
                    <p>🔒 Privacy First: All processing happens locally in your browser. No data is sent to external servers.</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
