import React from 'react';

interface AssistantViewProps {
    status: string; // e.g., "Idle", "Listening", "Speaking"
}

const AssistantView: React.FC<AssistantViewProps> = ({ status }) => {
    return (
        <div className="robot-image">
            <img src="/robot.gif" alt="Robot Assistant" />
            <div className={`status-indicator ${status.toLowerCase()}`}>
                {status}
            </div>
        </div>
    );
};

export default AssistantView;
