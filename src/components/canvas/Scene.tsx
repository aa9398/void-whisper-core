import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from './StarField';
import HeroOrb from './HeroOrb';
import CameraController from './CameraController';
import { useStore } from '@/stores/useStore';

const Scene = () => {
  const transitionPhase = useStore((state) => state.transitionPhase);
  
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.1} />
        
        {/* Main directional light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#ffffff"
        />
        
        <Suspense fallback={null}>
          {/* Starfield background */}
          <StarField count={4000} />
          
          {/* Central orb - only visible before warp */}
          {transitionPhase !== 'warp' && transitionPhase !== 'landed' && (
            <HeroOrb />
          )}
        </Suspense>
        
        {/* Camera controller for transitions */}
        <CameraController />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#050505', 30, 150]} />
      </Canvas>
    </div>
  );
};

export default Scene;
