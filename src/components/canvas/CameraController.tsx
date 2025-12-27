import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';
import gsap from 'gsap';

const CameraController = () => {
  const { camera } = useThree();
  const transitionPhase = useStore((state) => state.transitionPhase);
  const previousPhase = useRef(transitionPhase);
  const shakeIntensity = useRef(0);

  useEffect(() => {
    if (transitionPhase === 'focus' && previousPhase.current === 'idle') {
      // Zoom in toward orb with easing
      gsap.to(camera.position, {
        z: 3,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    } else if (transitionPhase === 'warp') {
      // Intense camera shake during warp initiation
      shakeIntensity.current = 0.15;
      
      // Rapid forward warp
      gsap.to(camera.position, {
        z: -80,
        duration: 2,
        ease: 'power4.in',
        onUpdate: () => {
          // Reduce shake as warp progresses
          shakeIntensity.current *= 0.98;
        },
      });
      
      // FOV distortion during warp
      gsap.to(camera, {
        fov: 90,
        duration: 1,
        ease: 'power2.in',
        onUpdate: () => camera.updateProjectionMatrix(),
      });
      
      gsap.to(camera, {
        fov: 60,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out',
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    } else if (transitionPhase === 'landed') {
      // Reset for observatory view
      shakeIntensity.current = 0;
      
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 8,
        duration: 1.5,
        ease: 'power2.out',
      });
      
      gsap.to(camera, {
        fov: 55,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    }
    
    previousPhase.current = transitionPhase;
  }, [transitionPhase, camera]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Camera shake during warp
    if (shakeIntensity.current > 0.01) {
      camera.position.x += (Math.random() - 0.5) * shakeIntensity.current;
      camera.position.y += (Math.random() - 0.5) * shakeIntensity.current;
    }
    
    // Subtle camera sway for idle and landed
    if (transitionPhase === 'idle' || transitionPhase === 'landed') {
      const swaySpeed = transitionPhase === 'landed' ? 0.15 : 0.3;
      const swayAmount = transitionPhase === 'landed' ? 0.05 : 0.1;
      
      camera.position.x += (Math.sin(time * swaySpeed) * swayAmount - camera.position.x) * 0.01;
      camera.position.y += (Math.cos(time * swaySpeed * 0.7) * swayAmount - camera.position.y) * 0.01;
      
      // Subtle pitch/yaw drift for observatory feel
      if (transitionPhase === 'landed') {
        camera.rotation.x = Math.sin(time * 0.1) * 0.01;
        camera.rotation.y = Math.cos(time * 0.08) * 0.01;
      }
    }
  });

  return null;
};

export default CameraController;
