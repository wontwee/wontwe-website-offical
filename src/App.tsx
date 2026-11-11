import React, { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ApproachTimeline } from './components/ApproachTimeline';
import { CapabilitiesIndex } from './components/CapabilitiesIndex';
import { ContactSection } from './components/ContactSection';
import { ExperimentsSection } from './components/ExperimentsSection';
import { FloatingContactDock } from './components/FloatingContactDock';
import { Footer } from './components/Footer';
import { HeroScene } from './components/HeroScene';
import { Navbar } from './components/Navbar';
import { OpticalCursor } from './components/OpticalCursor';
import { WorldDigital } from './components/worlds/WorldDigital';
import { WorldEvents } from './components/worlds/WorldEvents';
import { WorldStudios } from './components/worlds/WorldStudios';
import { WorldTech } from './components/worlds/WorldTech';
import { ScrollTrigger } from './utils/motion';

export const App: React.FC = () => {
  const [enquiryTarget, setEnquiryTarget] = useState<{
    division: string | null;
    service: string | null;
  }>({ division: null, service: null });

  const handleEnquire = (divisionName: string, serviceName?: string) => {
    setEnquiryTarget({
      division: divisionName,
      service: serviceName ?? null,
    });
  };

  useEffect(() => {
    const refreshTriggers = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshTriggers);
    const timer = setTimeout(refreshTriggers, 450);

    return () => {
      window.removeEventListener('load', refreshTriggers);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <OpticalCursor />
      <Navbar />
      <FloatingContactDock />

      <main id="main-content">
        <HeroScene />
        <AboutSection />

        <div id="divisions" aria-label="WONTWE Divisions">
          <WorldTech onEnquireService={handleEnquire} />
          <WorldDigital onEnquireService={handleEnquire} />
          <WorldStudios onEnquireService={handleEnquire} />
          <WorldEvents onEnquireService={handleEnquire} />
        </div>

        <ApproachTimeline />
        <ExperimentsSection />
        <CapabilitiesIndex onEnquireService={handleEnquire} />
        <ContactSection
          preselectedDivision={enquiryTarget.division}
          preselectedService={enquiryTarget.service}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
