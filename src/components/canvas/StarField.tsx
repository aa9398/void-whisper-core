import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 4000 }: StarFieldProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const transitionPhase = useStore((state) => state.transitionPhase);
  
  const { positions, scales, opacities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const opacities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a sphere
      const radius = 50 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 50;
      
      scales[i] = 0.02 + Math.random() * 0.08;
      opacities[i] = 0.3 + Math.random() * 0.7;
    }
    
    return { positions, scales, opacities };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const brightness = 0.7 + Math.random() * 0.3;
      // Slight blue/white tint
      colors[i * 3] = brightness * (0.9 + Math.random() * 0.1);
      colors[i * 3 + 1] = brightness * (0.9 + Math.random() * 0.1);
      colors[i * 3 + 2] = brightness;
    }
    return colors;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const warpMultiplier = transitionPhase === 'warp' ? 10 : 1;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Slow rotation of the entire starfield
      const angle = time * 0.02;
      const x = positions[i3];
      const z = positions[i3 + 2];
      
      dummy.position.set(
        x * Math.cos(angle) - z * Math.sin(angle),
        positions[i3 + 1],
        x * Math.sin(angle) + z * Math.cos(angle)
      );
      
      // Warp effect - stretch stars toward camera
      if (transitionPhase === 'warp') {
        dummy.position.z += time * warpMultiplier * 2;
        dummy.scale.setScalar(scales[i] * (1 + Math.abs(dummy.position.z) * 0.01));
      } else {
        // Twinkle effect
        const twinkle = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.7;
        dummy.scale.setScalar(scales[i] * twinkle);
      }
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

export default StarField;
