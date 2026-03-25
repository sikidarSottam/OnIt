import React, { useEffect, useRef } from 'react';

interface VoiceWaveformProps {
    isActive: boolean;
    color?: string;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isActive, color = '#6366f1' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number>(0);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        if (isActive) {
            initAudio();
        } else {
            stopAudio();
        }

        return () => {
            stopAudio();
        };
    }, [isActive]);

    const initAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            const audioContext = new AudioContextClass();
            audioContextRef.current = audioContext;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            sourceRef.current = source;

            const bufferLength = analyser.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            const draw = () => {
                if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const analyserNode = analyserRef.current;
                const dataArray = dataArrayRef.current;
                const width = canvas.width;
                const height = canvas.height;

                animationFrameRef.current = requestAnimationFrame(draw);
                analyserNode.getByteFrequencyData(dataArray as any);

                ctx.clearRect(0, 0, width, height);

                // Calculate average volume for scale
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                const average = sum / dataArray.length;
                const volumeScale = Math.max(0.05, average / 128);

                // Helper to draw a single wave
                const drawWave = (
                    amplitude: number,
                    frequency: number,
                    colorStr: string,
                    opacity: number,
                    phaseOffset: number
                ) => {
                    ctx.beginPath();
                    ctx.strokeStyle = colorStr;
                    ctx.globalAlpha = opacity;
                    ctx.lineWidth = 2.5;

                    const time = Date.now() / 1000;
                    const centerY = height / 2;
                    const maxAmplitude = height * 0.4 * (amplitude + 0.1);

                    for (let x = 0; x < width; x++) {
                        const normalizedX = x / width;
                        // Use a sine-squared envelope for organic taper at ends
                        const envelope = Math.pow(Math.sin(normalizedX * Math.PI), 2.5);
                        
                        // Mixed frequencies for more organic look
                        const s1 = Math.sin(normalizedX * Math.PI * 2 * (1.5 + frequency) + time * 4.5 + phaseOffset);
                        const s2 = Math.sin(normalizedX * Math.PI * 4 * (1.0 + frequency) - time * 3.2 + phaseOffset * 0.8);
                        
                        const y = centerY + (s1 * 0.7 + s2 * 0.3) * maxAmplitude * envelope;

                        if (x === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.stroke();
                };

                // Draw multiple overlapping waves
                // Main thick wave
                drawWave(0.8 * volumeScale, 0.5, color, 0.4, 0);
                // Secondary wave
                drawWave(0.6 * volumeScale, 0.8, color, 0.25, 1.2);
                // Background fast wave
                drawWave(0.4 * volumeScale, 1.2, color, 0.15, 2.4);
            };

            draw();
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopAudio = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (sourceRef.current) {
            sourceRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(() => {});
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={160}
            className="voice-waveform"
            style={{ 
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 3
            }}
        />
    );
};

export default VoiceWaveform;
