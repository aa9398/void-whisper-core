import { useState, useCallback, useRef } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export const useTextScramble = (finalText: string) => {
  const [displayText, setDisplayText] = useState(finalText);
  const frameRef = useRef<number>();
  const frameCountRef = useRef(0);

  const scramble = useCallback(() => {
    const length = finalText.length;
    const duration = 20; // frames per character
    let currentIndex = 0;
    
    const update = () => {
      frameCountRef.current++;
      
      let newText = '';
      for (let i = 0; i < length; i++) {
        if (i < currentIndex) {
          newText += finalText[i];
        } else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(newText);
      
      if (frameCountRef.current % 3 === 0) {
        currentIndex++;
      }
      
      if (currentIndex <= length) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(finalText);
      }
    };
    
    frameCountRef.current = 0;
    frameRef.current = requestAnimationFrame(update);
  }, [finalText]);

  const reset = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setDisplayText(finalText);
  }, [finalText]);

  return { displayText, scramble, reset };
};
