import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Scanline, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import StarField from './StarField';
import HeroOrb from './HeroOrb';
import CameraController from './CameraController';
import OrbitalStructures from './OrbitalStructures';
import WarpTunnel from './WarpTunnel';
import { useStore } from '@/stores/useStore';
import * as THREE from 'three';

const Scene = () => {
  const transitionPhase = useStore((state) => state.transitionPhase);
  const isWarping = transitionPhase === 'warp';
  
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#06b6d4" />
        
        <Suspense fallback={null}>
          <StarField count={4000} />
          
          {(transitionPhase === 'idle' || transitionPhase === 'focus') && (
            <HeroOrb />
          )}
          
          <WarpTunnel />
          <OrbitalStructures />
        </Suspense>
        
        <CameraController />
        <fog attach="fog" args={['#050505', 30, 150]} />
        
        <EffectComposer>
          <Bloom
            intensity={isWarping ? 2.5 : 0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <Scanline blendFunction={BlendFunction.OVERLAY} density={1.5} opacity={0.05} />
          <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;
