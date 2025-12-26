import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';
import gsap from 'gsap';
import { useEffect } from 'react';

const CameraController = () => {
  const { camera } = useThree();
  const transitionPhase = useStore((state) => state.transitionPhase);
  const previousPhase = useRef(transitionPhase);

  useEffect(() => {
    if (transitionPhase === 'focus' && previousPhase.current === 'idle') {
      // Zoom in toward orb
      gsap.to(camera.position, {
        z: 3,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    } else if (transitionPhase === 'warp') {
      // Warp forward
      gsap.to(camera.position, {
        z: -50,
        duration: 2,
        ease: 'power4.in',
      });
    } else if (transitionPhase === 'landed') {
      // Reset for landing view
      gsap.to(camera.position, {
        z: 5,
        duration: 1,
        ease: 'power2.out',
      });
    }
    
    previousPhase.current = transitionPhase;
  }, [transitionPhase, camera]);

  useFrame(() => {
    // Subtle camera sway
    if (transitionPhase === 'idle' || transitionPhase === 'landed') {
      const time = Date.now() * 0.0003;
      camera.position.x = Math.sin(time) * 0.1;
      camera.position.y = Math.cos(time * 0.7) * 0.1;
    }
  });

  return null;
};

export default CameraController;
