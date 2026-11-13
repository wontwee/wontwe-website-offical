import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WORLDS } from '../../data/wontweData';
import { handleTablistKeyDown } from '../../utils/a11y';
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
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  const activeCluster = studiosWorld.clusters[clusterIdx] ?? studiosWorld.clusters[0];
  const activeItem = activeCluster.items[selectedItemIdx] ?? activeCluster.items[0];

  const handleSelectCluster = (idx: number) => {
    setClusterIdx(idx);
    setSelectedItemIdx(0);
  };

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
              <div className="w-studios__frame-meta">
                <span className="w-studios__frame-kicker">
                  {activeCluster.cluster.toUpperCase()} // {activeItem.deliverable.toUpperCase()}
                </span>
                <span className="w-studios__frame-title">{activeItem.name}</span>
              </div>
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
                  tabIndex={idx === clusterIdx ? 0 : -1}
                  className={`w-studios__tab ${idx === clusterIdx ? 'w-studios__tab--active' : ''}`}
                  onClick={() => handleSelectCluster(idx)}
                  onKeyDown={(e) =>
                    handleTablistKeyDown(e, idx, studiosWorld.clusters.length, handleSelectCluster)
                  }
                >
                  {cluster.cluster}
                </button>
              ))}
            </div>

            <div className="w-studios__pills" role="listbox" aria-label={activeCluster.cluster}>
              {activeCluster.items.map((item, idx) => {
                const isSelected = idx === selectedItemIdx;
                return (
                  <button
                    key={item.name}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`w-studios__pill ${isSelected ? 'w-studios__pill--active' : ''}`}
                    onClick={() => setSelectedItemIdx(idx)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="w-studios__focus-box" aria-live="polite">
              <div className="w-studios__focus-head">
                <span className="w-studios__focus-name">{activeItem.name}</span>
                <span className="w-studios__focus-tag">{activeItem.deliverable}</span>
              </div>
              <p className="w-studios__focus-detail">{activeItem.detail}</p>
            </div>

            <button
              type="button"
              className="w-services__link-action"
              style={{ width: 'fit-content' }}
              onClick={() => {
                onEnquireService?.(studiosWorld.name, activeItem.name);
                scrollToSection('contact');
              }}
            >
              <span>ENQUIRE: {activeItem.name.toUpperCase()}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
