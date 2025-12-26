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

const MainHub = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* All regions stacked - visibility controlled by activeRegion */}
      <HeroRegion />
      <AboutRegion />
      <EventsRegion />
      <TimelineRegion />
      <TeamRegion />
      <RegisterRegion />
      <SponsorsRegion />
      <ContactRegion />
      
      {/* Navigation Dock */}
      <NavigationDock />
    </motion.div>
  );
};

export default MainHub;
