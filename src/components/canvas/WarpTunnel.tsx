import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';

const WarpTunnel = () => {
  const transitionPhase = useStore((state) => state.transitionPhase);
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const count = 100;
    const lineData = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const length = 5 + Math.random() * 15;
      
      lineData.push({ x, y, length, speed: 0.5 + Math.random() * 0.5 });
    }
    
    return lineData;
  }, []);
  
  useFrame((state) => {
    if (!linesRef.current || transitionPhase !== 'warp') return;
    
    linesRef.current.children.forEach((child, i) => {
      const line = child as THREE.Mesh;
      const data = lines[i];
      
      // Move lines toward camera
      line.position.z += data.speed;
      
      // Reset when past camera
      if (line.position.z > 5) {
        line.position.z = -30;
      }
      
      // Scale based on distance
      const scale = Math.max(0.1, 1 - (line.position.z + 30) / 35);
      line.scale.z = data.length * scale;
    });
  });
  
  if (transitionPhase !== 'warp') return null;
  
  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <mesh
          key={i}
          position={[line.x, line.y, -20 - Math.random() * 20]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, line.length, 4]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#6366f1' : '#06b6d4'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

export default WarpTunnel;
