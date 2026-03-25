import { useState, useCallback } from 'react';

/**
 * Custom hook for creating a "Mouse Spotlight" or "Cursor Glow" effect.
 * It tracks the mouse position relative to a container and provides CSS variables.
 */
export const useMouseSpotlight = () => {
    const [style, setStyle] = useState<React.CSSProperties>({
        '--mouse-x': '-500px',
        '--mouse-y': '-500px',
    } as React.CSSProperties);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setStyle({
            '--mouse-x': `${x}px`,
            '--mouse-y': `${y}px`,
        } as React.CSSProperties);
    }, []);

    const onMouseLeave = useCallback(() => {
        setStyle({
            '--mouse-x': '-500px',
            '--mouse-y': '-500px',
        } as React.CSSProperties);
    }, []);

    return { style, onMouseMove, onMouseLeave };
};
