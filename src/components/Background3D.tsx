import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Random points generator
function generatePoints(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  return positions;
}

const StarField = () => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => generatePoints(3000), []);

  useFrame((state, delta) => {
    // Gentle rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Mouse interaction
    const mouseX = (state.mouse.x * 0.2);
    const mouseY = (state.mouse.y * 0.2);
    ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.1;
    ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Secondary layer with different color and speed */}
      <Points positions={useMemo(() => generatePoints(1500), [])} stride={3}>
         <PointMaterial
          transparent
          color="#6366f1"
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const Background3D: React.FC = () => {
  return (
    <div 
      className="background-3d-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#050505',
        pointerEvents: 'none'
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
        <ambientLight intensity={0.5} />
      </Canvas>
      {/* Overlay gradient for depth */}
      <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(5, 5, 5, 0.8) 100%)',
          pointerEvents: 'none'
      }} />
    </div>
  );
};

export default Background3D;
