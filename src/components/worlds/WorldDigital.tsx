import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WORLDS } from '../../data/wontweData';
import { scrollToSection } from '../../utils/motion';
import { OptimizedImage } from '../OptimizedImage';
import './WorldsShared.css';
import './WorldDigital.css';

interface WorldDigitalProps {
  onEnquireService?: (divisionName: string, serviceName: string) => void;
}

const digitalWorld = WORLDS[1];

export const WorldDigital: React.FC<WorldDigitalProps> = ({ onEnquireService }) => {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const activeService = digitalWorld.services[selectedServiceIdx] ?? digitalWorld.services[0];

  const isBrandFocus = digitalWorld.clusters[1].items.some((i) => i.name === activeService.name);

  return (
    <section
      id="world-digital"
      className="w-world w-digital"
      aria-labelledby="digital-heading"
    >
      <div className="w-container">
        <div className="w-world__header-meta" style={{ marginBottom: '2rem' }}>
          <span className="w-world__index-badge">
            <span>{digitalWorld.index}</span>
            <span>—</span>
            <span>{digitalWorld.name.toUpperCase()}</span>
          </span>
          <span className="w-world__env-name">{digitalWorld.tier}</span>
        </div>

        <div className="w-digital__banner">
          <div className="w-digital__bg-wrap" aria-hidden="true">
            <OptimizedImage
              webpSrc="/images/world-digital-command.webp"
              fallbackSrc="/images/world-digital-command.jpg"
              alt=""
              className="w-digital__bg-img"
            />
          </div>
          <div className="w-digital__scrim" aria-hidden="true" />

          <div className="w-digital__content-grid">
            <div className="w-digital__left">
              <span className="telemetry-kicker">{digitalWorld.telemetryTag}</span>
              <h2 id="digital-heading" className="headline-world">
                {digitalWorld.headline}
              </h2>
              <p className="text-lead" style={{ maxWidth: '46ch', color: 'rgba(245, 247, 250, 0.86)' }}>
                {digitalWorld.description}
              </p>

              <div className="w-digital__chips" role="listbox" aria-label="WONTWE Digital capabilities">
                {digitalWorld.services.map((service, idx) => {
                  const active = idx === selectedServiceIdx;
                  return (
                    <button
                      key={service.name}
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`w-digital__chip ${active ? 'w-digital__chip--active' : ''}`}
                      onClick={() => setSelectedServiceIdx(idx)}
                    >
                      {service.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-digital__floating-card" aria-live="polite">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="telemetry-kicker">
                  {isBrandFocus ? 'BRAND & CONTENT SYSTEM' : 'GROWTH & ACQUISITION'}
                </span>
                <span className="w-world__env-name">11 CAPABILITIES</span>
              </div>

              <div className="w-digital__focus-row">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {activeService.name}
                </h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                  {activeService.detail}
                </p>

                <button
                  type="button"
                  className="btn-secondary"
                  style={{ width: 'fit-content', marginTop: '0.35rem', padding: '0.68rem 1.3rem', fontSize: '0.72rem' }}
                  onClick={() => {
                    onEnquireService?.(digitalWorld.name, activeService.name);
                    scrollToSection('contact');
                  }}
                >
                  <span>ENQUIRE: {activeService.name.toUpperCase()}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
