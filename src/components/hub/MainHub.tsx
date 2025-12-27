import { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeRegion, setActiveRegion } = useStore();
  
  const sectionRefs = useRef<Record<HubRegion, HTMLDivElement | null>>({
    hero: null,
    about: null,
    events: null,
    timeline: null,
    team: null,
    register: null,
    sponsors: null,
    contact: null,
  });

  // Scroll to section when activeRegion changes
  useEffect(() => {
    const section = sectionRefs.current[activeRegion];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeRegion]);

  // Update activeRegion based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + window.innerHeight / 3;
      
      const regions: HubRegion[] = ['hero', 'about', 'events', 'timeline', 'team', 'register', 'sponsors', 'contact'];
      
      for (let i = regions.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[regions[i]];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeRegion !== regions[i]) {
            setActiveRegion(regions[i]);
          }
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeRegion, setActiveRegion]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Hero Section */}
      <div ref={(el) => (sectionRefs.current.hero = el)} id="hero">
        <HeroRegion />
      </div>
      
      {/* About Section */}
      <div ref={(el) => (sectionRefs.current.about = el)} id="about">
        <AboutRegion />
      </div>
      
      {/* Events Section */}
      <div ref={(el) => (sectionRefs.current.events = el)} id="events">
        <EventsRegion />
      </div>
      
      {/* Timeline Section */}
      <div ref={(el) => (sectionRefs.current.timeline = el)} id="timeline">
        <TimelineRegion />
      </div>
      
      {/* Team Section */}
      <div ref={(el) => (sectionRefs.current.team = el)} id="team">
        <TeamRegion />
      </div>
      
      {/* Register Section */}
      <div ref={(el) => (sectionRefs.current.register = el)} id="register">
        <RegisterRegion />
      </div>
      
      {/* Sponsors Section */}
      <div ref={(el) => (sectionRefs.current.sponsors = el)} id="sponsors">
        <SponsorsRegion />
      </div>
      
      {/* Contact Section */}
      <div ref={(el) => (sectionRefs.current.contact = el)} id="contact">
        <ContactRegion />
      </div>
      
      {/* Navigation Dock - Fixed at bottom center */}
      <NavigationDock />
    </motion.div>
  );
};

export default MainHub;