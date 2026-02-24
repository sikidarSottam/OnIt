import React, { useState, useEffect } from 'react';
import { speechService } from '../services/speechService';

interface Settings {
    userName: string;
    preferredVoice: string;
    theme: 'light' | 'dark';
}

interface SettingsPanelProps {
    onSettingsChange: (settings: Settings) => void;
    onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange, onClose }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [settings, setSettings] = useState<Settings>({
        userName: localStorage.getItem('onit_userName') || 'Boss',
        preferredVoice: localStorage.getItem('onit_preferredVoice') || '',
        theme: (localStorage.getItem('onit_theme') as 'light' | 'dark') || 'dark',
    });

    useEffect(() => {
        // Load voices — may be empty initially, so listen for voiceschanged
        const loadVoices = () => {
            const available = speechService.getVoices();
            if (available.length > 0) {
                setVoices(available);
            }
        };

        loadVoices();

        // Voices load asynchronously in most browsers; listen for the event
        const handleVoicesChanged = () => loadVoices();
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        };
    }, []);

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
                    <label htmlFor="preferredVoice">Assistant Voice</label>
                    <select
                        id="preferredVoice"
                        name="preferredVoice"
                        value={settings.preferredVoice}
                        onChange={handleChange}
                    >
                        <option value="">Default (Auto)</option>
                        {voices.map(voice => (
                            <option key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
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
