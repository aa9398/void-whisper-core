import { create } from 'zustand';

export type TransitionPhase = 'idle' | 'focus' | 'warp' | 'landed';
export type HubRegion = 'hero' | 'about' | 'events' | 'timeline' | 'team' | 'register' | 'sponsors' | 'contact';

interface CursorPosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface UltronStore {
  // Transition state
  transitionPhase: TransitionPhase;
  setTransitionPhase: (phase: TransitionPhase) => void;
  
  // Cursor tracking
  cursorPos: CursorPosition;
  setCursorPos: (pos: CursorPosition) => void;
  
  // Zoom state
  isZooming: boolean;
  setIsZooming: (zooming: boolean) => void;
  
  // Current section
  currentSection: string;
  setCurrentSection: (section: string) => void;
  
  // UI visibility
  hudVisible: boolean;
  setHudVisible: (visible: boolean) => void;
  
  // Audio state (for future)
  isMuted: boolean;
  toggleMute: () => void;
  
  // Hub navigation states
  activeRegion: HubRegion;
  setActiveRegion: (region: HubRegion) => void;
  
  focusedModule: string | null;
  setFocusedModule: (module: string | null) => void;
  
  isPanelExpanded: boolean;
  setIsPanelExpanded: (expanded: boolean) => void;
}

export const useStore = create<UltronStore>((set) => ({
  transitionPhase: 'idle',
  setTransitionPhase: (phase) => set({ transitionPhase: phase }),
  
  cursorPos: { x: 0, y: 0, normalizedX: 0, normalizedY: 0 },
  setCursorPos: (pos) => set({ cursorPos: pos }),
  
  isZooming: false,
  setIsZooming: (zooming) => set({ isZooming: zooming }),
  
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),
  
  hudVisible: true,
  setHudVisible: (visible) => set({ hudVisible: visible }),
  
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  
  // Hub states
  activeRegion: 'hero',
  setActiveRegion: (region) => set({ activeRegion: region }),
  
  focusedModule: null,
  setFocusedModule: (module) => set({ focusedModule: module }),
  
  isPanelExpanded: false,
  setIsPanelExpanded: (expanded) => set({ isPanelExpanded: expanded }),
}));
