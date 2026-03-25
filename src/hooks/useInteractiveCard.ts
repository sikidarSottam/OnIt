import { useState, useCallback, useRef } from 'react';

/**
 * Advanced hook for 3D Perspective Tilt and Spotlight effects.
 */
export const useInteractiveCard = (maxTilt: number = 10) => {
    const [style, setStyle] = useState<React.CSSProperties>({});
    const cardRef = useRef<HTMLElement | null>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        
        // Spotlight coords
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Tilt calculation
        // Find center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Distance from center (-1 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);

        // Calculate rotation (Y rotation is mouseX, X rotation is -mouseY)
        const rotateX = -mouseY * maxTilt;
        const rotateY = mouseX * maxTilt;

        setStyle({
            '--mouse-x': `${x}px`,
            '--mouse-y': `${y}px`,
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease', // Smooth but responsive
        } as React.CSSProperties);
    }, [maxTilt]);

    const onMouseLeave = useCallback(() => {
        setStyle({
            '--mouse-x': '-500px',
            '--mouse-y': '-500px',
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
            transition: 'transform 0.5s ease', // Slow return to center
        } as React.CSSProperties);
    }, []);

    return { style, onMouseMove, onMouseLeave, cardRef };
};
