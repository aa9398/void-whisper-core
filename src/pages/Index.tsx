import Scene from '@/components/canvas/Scene';
import HUD from '@/components/ui/HUD';
import CursorTrail from '@/components/ui/CursorTrail';
import { useCursor } from '@/hooks/useCursor';
import { useLenis } from '@/hooks/useLenis';
import { useEffect } from 'react';

const Index = () => {
  // Initialize cursor tracking
  useCursor();
  
  // Initialize smooth scroll
  useLenis();

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-void">
      {/* WebGL Canvas - The Universe */}
      <Scene />
      
      {/* HUD Overlay */}
      <HUD />
      
      {/* Custom Cursor */}
      <CursorTrail />
    </div>
  );
};

export default Index;
