import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WORLDS } from '../../data/wontweData';
import { scrollToSection } from '../../utils/motion';
import { OptimizedImage } from '../OptimizedImage';
import './WorldsShared.css';
import './WorldStudios.css';

interface WorldStudiosProps {
  onEnquireService?: (divisionName: string, serviceName: string) => void;
}

const studiosWorld = WORLDS[2];

export const WorldStudios: React.FC<WorldStudiosProps> = ({ onEnquireService }) => {
  const [clusterIdx, setClusterIdx] = useState(0);
  const activeCluster = studiosWorld.clusters[clusterIdx] ?? studiosWorld.clusters[0];

  return (
    <section
      id="world-studios"
      className="w-world w-studios"
      aria-labelledby="studios-heading"
    >
      <div className="w-container">
        <div className="w-world__header-meta">
          <span className="w-world__index-badge">
            <span>{studiosWorld.index}</span>
            <span>—</span>
            <span>{studiosWorld.name.toUpperCase()}</span>
          </span>
          <span className="w-world__env-name">{studiosWorld.tier}</span>
        </div>

        <div className="w-studios__split">
          <div className="w-studios__visual-frame">
            <OptimizedImage
              webpSrc="/images/world-studios-stage.webp"
              fallbackSrc="/images/world-studios-stage.jpg"
              alt="WONTWE Studios commercial production environment supporting product launches and corporate media"
              className="w-studios__img"
            />
            <div className="w-studios__visual-overlay">
              <span className="w-world__env-name" style={{ color: 'rgba(245, 247, 250, 0.8)' }}>
                COMMERCIAL PRODUCTION · MOTION · 2D &amp; 3D
              </span>
            </div>
          </div>

          <div className="w-studios__content">
            <span className="telemetry-kicker">{studiosWorld.telemetryTag}</span>
            <h2 id="studios-heading" className="w-studios__headline">
              {studiosWorld.headline}
            </h2>
            <p className="text-lead" style={{ fontSize: '0.96rem' }}>
              {studiosWorld.description}
            </p>

            <div className="w-studios__tabs" role="tablist" aria-label="WONTWE Studios categories">
              {studiosWorld.clusters.map((cluster, idx) => (
                <button
                  key={cluster.specCode}
                  type="button"
                  role="tab"
                  aria-selected={idx === clusterIdx}
                  className={`w-studios__tab ${idx === clusterIdx ? 'w-studios__tab--active' : ''}`}
                  onClick={() => setClusterIdx(idx)}
                >
                  {cluster.cluster}
                </button>
              ))}
            </div>

            <div className="w-studios__pills">
              {activeCluster.items.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="w-studios__pill"
                  title={item.detail}
                  onClick={() => {
                    onEnquireService?.(studiosWorld.name, item.name);
                    scrollToSection('contact');
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="w-services__link-action"
              style={{ width: 'fit-content' }}
              onClick={() => {
                onEnquireService?.(studiosWorld.name, activeCluster.cluster);
                scrollToSection('contact');
              }}
            >
              <span>ENQUIRE WITH WONTWE STUDIOS</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
