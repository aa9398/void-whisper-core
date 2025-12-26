import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';

const HeroOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerLightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const cursorPos = useStore((state) => state.cursorPos);
  const transitionPhase = useStore((state) => state.transitionPhase);
  
  const targetRotation = useRef({ x: 0, y: 0 });

  // Create gradient material
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#4f46e5') },
        color2: { value: new THREE.Color('#06b6d4') },
        opacity: { value: 0.9 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 color = mix(color1, color2, fresnel + sin(time * 0.5) * 0.2);
          
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          
          gl_FragColor = vec4(color * pulse, opacity * fresnel + 0.3);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });
  }, []);

  // Glow material
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#6366f1') },
      },
      vertexShader: `
        varying vec3 vNormal;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          float pulse = sin(time * 1.5) * 0.2 + 0.8;
          gl_FragColor = vec4(color, intensity * 0.4 * pulse);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Update shader uniforms
    gradientMaterial.uniforms.time.value = time;
    glowMaterial.uniforms.time.value = time;
    
    // Cursor-reactive rotation with smooth damping
    const targetX = cursorPos.normalizedY * 0.3;
    const targetY = cursorPos.normalizedX * 0.3;
    
    targetRotation.current.x += (targetX - targetRotation.current.x) * 0.05;
    targetRotation.current.y += (targetY - targetRotation.current.y) * 0.05;
    
    // Base rotation speed
    let rotationSpeed = 0.15;
    if (transitionPhase === 'focus') {
      rotationSpeed = 1.5; // 10x faster during focus
    } else if (transitionPhase === 'warp') {
      rotationSpeed = 3;
    }
    
    meshRef.current.rotation.x = targetRotation.current.x + time * rotationSpeed * 0.1;
    meshRef.current.rotation.y = targetRotation.current.y + time * rotationSpeed * 0.15;
    meshRef.current.rotation.z = time * rotationSpeed * 0.05;
    
    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation);
    }
    
    // Inner light pulsation
    if (innerLightRef.current) {
      innerLightRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <group>
      {/* Main orb */}
      <mesh ref={meshRef} material={gradientMaterial}>
        <icosahedronGeometry args={[1.2, 20]} />
      </mesh>
      
      {/* Outer glow */}
      <mesh ref={glowRef} material={glowMaterial}>
        <icosahedronGeometry args={[1.5, 20]} />
      </mesh>
      
      {/* Inner point light */}
      <pointLight
        ref={innerLightRef}
        position={[0, 0, 0]}
        color="#4f46e5"
        intensity={2}
        distance={10}
      />
      
      {/* Ambient inner glow */}
      <pointLight
        position={[0, 0, 0]}
        color="#06b6d4"
        intensity={0.5}
        distance={5}
      />
    </group>
  );
};

export default HeroOrb;
