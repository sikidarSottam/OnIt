import React, { useState, useEffect } from 'react';

interface OfflineIndicatorProps {
    status: 'Idle' | 'Active' | 'Listening';
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ status }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline && status !== 'Idle') return null;

    return (
        <div className={`offline-banner ${!isOnline ? 'offline' : 'idle'}`}>
            <i className={`fas ${!isOnline ? 'fa-wifi-slash' : 'fa-moon'}`} style={{ marginRight: '8px' }}></i>
            {!isOnline ? (
                <>
                    <span>You're offline</span>
                    <span className="offline-sub"> — Some features may be limited</span>
                </>
            ) : null}
        </div>
    );
};

export default OfflineIndicator;
