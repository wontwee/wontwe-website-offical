import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { WORLDS } from '../../data/wontweData';
import { handleTablistKeyDown } from '../../utils/a11y';
import { scrollToSection } from '../../utils/motion';
import { LiveTerminal } from '../LiveTerminal';
import { OptimizedImage } from '../OptimizedImage';
import './WorldsShared.css';
import './WorldTech.css';

interface WorldTechProps {
  onEnquireService?: (divisionName: string, serviceName: string) => void;
}

const techWorld = WORLDS[0];

export const WorldTech: React.FC<WorldTechProps> = ({ onEnquireService }) => {
  const [selectedClusterIdx, setSelectedClusterIdx] = useState(0);
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);

  const activeCluster = techWorld.clusters[selectedClusterIdx] ?? techWorld.clusters[0];
  const activeService = activeCluster.items[selectedServiceIdx] ?? activeCluster.items[0];

  const handleSelectCluster = (idx: number) => {
    setSelectedClusterIdx(idx);
    setSelectedServiceIdx(0);
  };

  return (
    <section
      id="world-tech"
      className="w-world w-tech"
      aria-labelledby="tech-heading"
    >
      {/* Part 1: Clean Technology Division Banner */}
      <div className="w-tech__banner">
        <div className="w-tech__physical-layer" aria-hidden="true">
          <OptimizedImage
            webpSrc="/images/world-tech-lab.webp"
            fallbackSrc="/images/world-tech-lab.jpg"
            alt=""
            className="w-tech__lab-img"
          />
        </div>

        <div className="w-tech__scrim" aria-hidden="true" />

        <div className="w-container">
          <div className="w-world__header-meta" style={{ position: 'relative', zIndex: 10, marginBottom: '2rem' }}>
            <span className="w-world__index-badge">
              <span>{techWorld.index}</span>
              <span>—</span>
              <span>{techWorld.name.toUpperCase()}</span>
            </span>
            <span className="w-world__env-name">{techWorld.tier}</span>
          </div>

          <div className="w-tech__stage-grid">
            <div className="w-tech__stage-content">
              <h2 id="tech-heading" className="headline-world">
                {techWorld.headline}
              </h2>

              <p className="text-lead" style={{ maxWidth: '48ch', color: 'rgba(245, 247, 250, 0.86)' }}>
                {techWorld.description}
              </p>
            </div>

            <div className="w-tech__terminal-slot">
              <LiveTerminal />
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Technology Capability Explorer */}
      <div className="w-tech__explorer">
        <div className="w-container">
          <div className="w-tech__explorer-head">
            <div>
              <span className="telemetry-kicker">CAPABILITY EXPLORER</span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginTop: '0.65rem',
                }}
              >
                WONTWE Tech Architecture
              </h3>
            </div>
            <span className="w-world__env-name">SELECT A PRACTICE AREA &amp; CAPABILITY</span>
          </div>

          {/* 5 Interactive Category Tabs */}
          <div className="w-tech__category-bar" role="tablist" aria-label="WONTWE Tech Categories">
            {techWorld.clusters.map((cluster, idx) => {
              const isSelected = idx === selectedClusterIdx;
              return (
                <button
                  key={cluster.specCode}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={`w-tech__cat-btn ${isSelected ? 'w-tech__cat-btn--active' : ''}`}
                  onClick={() => handleSelectCluster(idx)}
                  onKeyDown={(e) =>
                    handleTablistKeyDown(e, idx, techWorld.clusters.length, handleSelectCluster)
                  }
                >
                  <span className="w-tech__cat-code">{cluster.specCode}</span>
                  <span className="w-tech__cat-name">{cluster.cluster}</span>
                  <span className="w-tech__cat-count">{cluster.items.length} Capabilities</span>
                </button>
              );
            })}
          </div>

          {/* Clean Two-Column Capability Stage */}
          <div className="w-tech__interactive-stage" role="tabpanel" aria-live="polite">
            <div className="w-tech__stage-bg" aria-hidden="true">
              <OptimizedImage
                webpSrc={activeCluster.bgWebp}
                fallbackSrc={activeCluster.bgFallback}
                alt=""
                className="w-tech__stage-bg-img"
              />
            </div>
            <div className="w-tech__stage-scrim" aria-hidden="true" />

            <div className="w-tech__stage-grid">
              <div className="w-tech__selector-col">
                <div>
                  <span className="telemetry-kicker">{activeCluster.cluster}</span>
                  <h4 className="w-tech__cat-headline" style={{ marginTop: '0.65rem' }}>
                    {activeCluster.headline}
                  </h4>
                  <p className="text-lead" style={{ fontSize: '0.96rem', marginTop: '0.55rem' }}>
                    {activeCluster.summary}
                  </p>
                </div>

                <div className="w-tech__service-chips" role="listbox" aria-label={activeCluster.cluster}>
                  {activeCluster.items.map((service, idx) => {
                    const isFocused = idx === selectedServiceIdx;
                    return (
                      <button
                        key={service.name}
                        type="button"
                        role="option"
                        aria-selected={isFocused}
                        className={`w-tech__service-chip ${
                          isFocused ? 'w-tech__service-chip--active' : ''
                        }`}
                        onClick={() => setSelectedServiceIdx(idx)}
                      >
                        <span>{service.name}</span>
                        <ChevronRight size={14} style={{ flexShrink: 0, color: 'var(--accent-ice)' }} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-tech__mockup-col">
                <div className="w-tech__spotlight">
                  <div className="w-tech__spotlight-top">
                    <h5
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {activeService.name}
                    </h5>
                    <span className="w-tech__deliverable-tag">
                      <CheckCircle2
                        size={13}
                        style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px' }}
                        aria-hidden="true"
                      />
                      {activeService.deliverable}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    {activeService.detail}
                  </p>

                  <div className="w-tech__pipeline-row" aria-label="Architecture scope">
                    {activeCluster.mockupPipeline.map((step) => (
                      <span key={step} className="w-tech__pipeline-pill">
                        {step}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn-primary"
                    style={{ width: 'fit-content', padding: '0.75rem 1.45rem', fontSize: '0.74rem', marginTop: '0.25rem' }}
                    onClick={() => {
                      onEnquireService?.(techWorld.name, activeService.name);
                      scrollToSection('contact');
                    }}
                  >
                    <span>ENQUIRE ABOUT {activeService.name.toUpperCase()}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
