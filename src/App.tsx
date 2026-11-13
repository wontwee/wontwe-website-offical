import React, { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ApproachTimeline } from './components/ApproachTimeline';
import { CapabilitiesIndex } from './components/CapabilitiesIndex';
import { ComingSoonDivisions } from './components/ComingSoonDivisions';
import { ContactSection } from './components/ContactSection';
import { FloatingContactDock } from './components/FloatingContactDock';
import { Footer } from './components/Footer';
import { HeroScene } from './components/HeroScene';
import { MetricCounters } from './components/MetricCounters';
import { Navbar } from './components/Navbar';
import { ProjectScopeEstimator } from './components/ProjectScopeEstimator';
import { WorldDigital } from './components/worlds/WorldDigital';
import { WorldTech } from './components/worlds/WorldTech';
import { initSpotlightTracker } from './utils/spotlight';

export const App: React.FC = () => {
  const [enquiryTarget, setEnquiryTarget] = useState<{
    division: string | null;
    service: string | null;
    brief: string | null;
  }>({ division: null, service: null, brief: null });

  useEffect(() => {
    const cleanupSpotlight = initSpotlightTracker();
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'auto' });
    }
    return () => cleanupSpotlight();
  }, []);

  const handleEnquire = (divisionName: string, serviceName?: string) => {
    setEnquiryTarget({
      division: divisionName,
      service: serviceName ?? null,
      brief: null,
    });
  };

  const handleApplyBrief = (briefText: string, divisionName: string) => {
    setEnquiryTarget({
      division: divisionName,
      service: null,
      brief: briefText,
    });
  };

  const handleClearPreselection = () => {
    setEnquiryTarget({ division: null, service: null, brief: null });
  };

  return (
    <div className="w-app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />
      <FloatingContactDock />

      <main id="main-content">
        <HeroScene />
        <MetricCounters />
        <AboutSection />

        <div id="divisions" aria-label="WONTWE Divisions">
          <WorldTech onEnquireService={handleEnquire} />
          <WorldDigital onEnquireService={handleEnquire} />
          <ComingSoonDivisions />
        </div>

        <ApproachTimeline />
        <CapabilitiesIndex onEnquireService={handleEnquire} />
        <ProjectScopeEstimator onApplyBrief={handleApplyBrief} />
        <ContactSection
          preselectedDivision={enquiryTarget.division}
          preselectedService={enquiryTarget.service}
          preselectedBrief={enquiryTarget.brief}
          onClearPreselection={handleClearPreselection}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
