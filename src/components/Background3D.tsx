import React, { useEffect, useRef } from 'react';

const Background3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 200;

        class Particle {
            x: number;
            y: number;
            z: number;
            size: number;
            speed: number;
            color: string;

            constructor() {
                this.x = (Math.random() - 0.5) * 2000;
                this.y = (Math.random() - 0.5) * 2000;
                this.z = Math.random() * 2000;
                this.size = Math.random() * 1.5 + 0.5;
                this.speed = Math.random() * 0.5 + 0.2;
                this.color = `rgba(99, 102, 241, ${Math.random() * 0.4 + 0.2})`;
            }

            update() {
                this.z -= this.speed;
                if (this.z <= 0) {
                    this.z = 2000;
                }
            }

            draw(c: HTMLCanvasElement, ct: CanvasRenderingContext2D) {
                const scale = 500 / this.z;
                const px = this.x * scale + c.width / 2;
                const py = this.y * scale + c.height / 2;
                const pSize = this.size * scale;

                if (px > 0 && px < c.width && py > 0 && py < c.height) {
                    ct.beginPath();
                    ct.arc(px, py, pSize, 0, Math.PI * 2);
                    ct.fillStyle = this.color;
                    ct.fill();

                    if (pSize > 2) {
                        ct.shadowBlur = 10;
                        ct.shadowColor = 'rgba(168, 85, 247, 0.5)';
                    } else {
                        ct.shadowBlur = 0;
                    }
                }
            }
        }

        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particles.length === 0) {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
        };

        const render = () => {
            if (!canvas || !ctx) return;
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const grad = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            grad.addColorStop(0, 'rgba(13, 13, 17, 1)'); 
            grad.addColorStop(1, 'rgba(5, 5, 5, 1)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw(canvas, ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="background-3d"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                background: '#050505'
            }}
        />
    );
};

export default Background3D;
