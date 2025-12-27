import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';

// Orbital ring structure for landed phase
const OrbitalRing = ({ radius, rotation, speed, opacity }: { 
  radius: number; 
  rotation: [number, number, number];
  speed: number;
  opacity: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += speed * 0.001;
    }
  });
  
  return (
    <mesh ref={ringRef} rotation={rotation}>
      <ringGeometry args={[radius - 0.05, radius, 128]} />
      <meshBasicMaterial 
        color="#6366f1" 
        transparent 
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Distant megastructure silhouette
const Megastructure = ({ position, scale }: { 
  position: [number, number, number]; 
  scale: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[scale, 0]} />
      <meshBasicMaterial 
        color="#1a1a2e" 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
};

// Floating geometric forms
const FloatingGeometry = ({ position, type }: { 
  position: [number, number, number]; 
  type: 'tetra' | 'octa' | 'ico';
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  
  const geometry = useMemo(() => {
    switch (type) {
      case 'tetra': return <tetrahedronGeometry args={[0.5, 0]} />;
      case 'octa': return <octahedronGeometry args={[0.4, 0]} />;
      case 'ico': return <icosahedronGeometry args={[0.3, 0]} />;
    }
  }, [type]);
  
  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshBasicMaterial 
        color="#6366f1" 
        transparent 
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
};

const OrbitalStructures = () => {
  const transitionPhase = useStore((state) => state.transitionPhase);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation for the whole structure
      groupRef.current.rotation.y += 0.0002;
    }
  });
  
  if (transitionPhase !== 'landed') return null;
  
  return (
    <group ref={groupRef}>
      {/* Orbital rings at different angles */}
      <OrbitalRing radius={8} rotation={[1.2, 0, 0]} speed={0.5} opacity={0.08} />
      <OrbitalRing radius={12} rotation={[0.8, 0.5, 0]} speed={-0.3} opacity={0.05} />
      <OrbitalRing radius={16} rotation={[0.3, 1, 0.5]} speed={0.2} opacity={0.03} />
      
      {/* Distant megastructures */}
      <Megastructure position={[-40, 10, -60]} scale={8} />
      <Megastructure position={[50, -15, -80]} scale={12} />
      <Megastructure position={[30, 25, -100]} scale={6} />
      
      {/* Floating geometric forms */}
      <FloatingGeometry position={[-6, 3, -5]} type="tetra" />
      <FloatingGeometry position={[7, -2, -8]} type="octa" />
      <FloatingGeometry position={[-4, -4, -6]} type="ico" />
      <FloatingGeometry position={[5, 4, -10]} type="tetra" />
    </group>
  );
};

export default OrbitalStructures;
