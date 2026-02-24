import React from 'react';

interface CameraViewProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ videoRef, onClose }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <video
                ref={videoRef}
                style={{ width: '300px', borderRadius: '10px', border: '2px solid #00e5ff', backgroundColor: '#000' }}
                autoPlay
                muted
                playsInline
            />
            <button
                onClick={onClose}
                style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Close Camera
            </button>
        </div>
    );
};

export default CameraView;
