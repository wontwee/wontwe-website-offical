import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WORLDS } from '../../data/wontweData';
import { handleTablistKeyDown } from '../../utils/a11y';
import { scrollToSection } from '../../utils/motion';
import { OptimizedImage } from '../OptimizedImage';
import './WorldsShared.css';
import './WorldEvents.css';

interface WorldEventsProps {
  onEnquireService?: (divisionName: string, serviceName: string) => void;
}

const eventsWorld = WORLDS[3];

export const WorldEvents: React.FC<WorldEventsProps> = ({ onEnquireService }) => {
  const [stageLit, setStageLit] = useState(true);
  const [clusterIdx, setClusterIdx] = useState(0);
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  const activeCluster = eventsWorld.clusters[clusterIdx] ?? eventsWorld.clusters[0];
  const activeItem = activeCluster.items[selectedItemIdx] ?? activeCluster.items[0];

  const handleSelectCluster = (idx: number) => {
    setClusterIdx(idx);
    setSelectedItemIdx(0);
  };

  return (
    <section
      id="world-events"
      className="w-world w-events"
      aria-labelledby="events-heading"
    >
      <div className="w-container">
        <div className="w-world__header-meta">
          <span className="w-world__index-badge">
            <span>{eventsWorld.index}</span>
            <span>—</span>
            <span>{eventsWorld.name.toUpperCase()}</span>
          </span>
          <span className="w-world__env-name">{eventsWorld.tier}</span>
        </div>

        <div className="w-events__split">
          <div className="w-events__content">
            <span className="telemetry-kicker">{eventsWorld.telemetryTag}</span>
            <h2 id="events-heading" className="w-events__headline">
              {eventsWorld.headline}
            </h2>
            <p className="text-lead" style={{ fontSize: '0.96rem' }}>
              {eventsWorld.description}
            </p>

            <div className="w-events__tabs" role="tablist" aria-label="WONTWE Events categories">
              {eventsWorld.clusters.map((cluster, idx) => (
                <button
                  key={cluster.specCode}
                  type="button"
                  role="tab"
                  aria-selected={idx === clusterIdx}
                  tabIndex={idx === clusterIdx ? 0 : -1}
                  className={`w-events__tab ${idx === clusterIdx ? 'w-events__tab--active' : ''}`}
                  onClick={() => handleSelectCluster(idx)}
                  onKeyDown={(e) =>
                    handleTablistKeyDown(e, idx, eventsWorld.clusters.length, handleSelectCluster)
                  }
                >
                  {cluster.cluster}
                </button>
              ))}
            </div>

            <div className="w-events__pills" role="listbox" aria-label={activeCluster.cluster}>
              {activeCluster.items.map((item, idx) => {
                const isSelected = idx === selectedItemIdx;
                return (
                  <button
                    key={item.name}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`w-events__pill ${isSelected ? 'w-events__pill--active' : ''}`}
                    onClick={() => setSelectedItemIdx(idx)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="w-events__focus-box" aria-live="polite">
              <div className="w-events__focus-head">
                <span className="w-events__focus-name">{activeItem.name}</span>
                <span className="w-events__focus-tag">{activeItem.deliverable}</span>
              </div>
              <p className="w-events__focus-detail">{activeItem.detail}</p>
            </div>

            <button
              type="button"
              className="w-services__link-action"
              style={{ width: 'fit-content' }}
              onClick={() => {
                onEnquireService?.(eventsWorld.name, activeItem.name);
                scrollToSection('contact');
              }}
            >
              <span>ENQUIRE: {activeItem.name.toUpperCase()}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="w-events__stage-box">
            <OptimizedImage
              webpSrc="/images/world-events-dark.webp"
              fallbackSrc="/images/world-events-dark.jpg"
              alt="Powered-down corporate exhibition and conference venue"
              className="w-events__img"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                opacity: stageLit ? 1 : 0,
                transition: 'opacity 0.55s ease',
              }}
            >
              <OptimizedImage
                webpSrc="/images/world-events-lit.webp"
                fallbackSrc="/images/world-events-lit.jpg"
                alt="Active corporate product launch stage with LED displays and architectural lighting"
                className="w-events__img"
              />
            </div>

            <div className="w-events__stage-controls">
              <div className="w-events__frame-meta">
                <span className="w-events__frame-kicker">
                  {activeCluster.cluster.toUpperCase()} // {activeItem.deliverable.toUpperCase()}
                </span>
                <span className="w-events__frame-title">{activeItem.name}</span>
              </div>

              <button
                type="button"
                className="w-events__toggle-btn"
                onClick={() => setStageLit((prev) => !prev)}
                aria-label="Toggle event stage lighting state"
              >
                <span className={`w-events__led-dot ${stageLit ? 'w-events__led-dot--on' : ''}`} />
                <span>{stageLit ? 'STAGE ACTIVE' : 'STANDBY HALL'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
