import React from 'react';

interface CameraViewProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ videoRef, onClose }) => {
    return (
        <div className="camera-container">
            <video
                ref={videoRef}
                className="camera-feed"
                autoPlay
                muted
                playsInline
            />
            <button
                onClick={onClose}
                className="camera-close-btn"
            >
                Close Camera
            </button>
        </div>
    );
};

export default CameraView;
