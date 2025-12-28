import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroRegion from './HeroRegion';
import AboutRegion from './AboutRegion';
import EventsRegion from './EventsRegion';
import TimelineRegion from './TimelineRegion';
import TeamRegion from './TeamRegion';
import RegisterRegion from './RegisterRegion';
import SponsorsRegion from './SponsorsRegion';
import ContactRegion from './ContactRegion';
import NavigationDock from './NavigationDock';
import { useStore, HubRegion } from '@/stores/useStore';

const MainHub = () => {
  const { activeRegion, setActiveRegion } = useStore();
  const isScrollingRef = useRef(false);
  
  const regions: HubRegion[] = ['hero', 'about', 'events', 'timeline', 'team', 'register', 'sponsors', 'contact'];

  // Scroll to section when nav button is clicked
  const scrollToSection = useCallback((regionId: HubRegion) => {
    const element = document.getElementById(regionId);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset flag after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  // Listen for activeRegion changes from nav dock
  useEffect(() => {
    scrollToSection(activeRegion);
  }, [activeRegion, scrollToSection]);

  // Update activeRegion based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = regions.length - 1; i >= 0; i--) {
        const section = document.getElementById(regions[i]);
        if (section && section.offsetTop <= scrollPosition) {
          if (activeRegion !== regions[i]) {
            setActiveRegion(regions[i]);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeRegion, setActiveRegion, regions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative w-full"
    >
      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <HeroRegion />
      </section>
      
      {/* About Section */}
      <section id="about" className="min-h-screen">
        <AboutRegion />
      </section>
      
      {/* Events Section */}
      <section id="events" className="min-h-screen">
        <EventsRegion />
      </section>
      
      {/* Timeline Section */}
      <section id="timeline" className="min-h-screen">
        <TimelineRegion />
      </section>
      
      {/* Team Section */}
      <section id="team" className="min-h-screen">
        <TeamRegion />
      </section>
      
      {/* Register Section */}
      <section id="register" className="min-h-screen">
        <RegisterRegion />
      </section>
      
      {/* Sponsors Section */}
      <section id="sponsors" className="min-h-screen">
        <SponsorsRegion />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen">
        <ContactRegion />
      </section>
      
      {/* Navigation Dock - Fixed at bottom center */}
      <NavigationDock />
    </motion.div>
  );
};

export default MainHub;