import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { EXPERIMENTS } from '../data/wontweData';
import { OptimizedImage } from './OptimizedImage';
import './ExperimentsSection.css';

export const ExperimentsSection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const active = EXPERIMENTS[selectedIdx] ?? EXPERIMENTS[0];

  return (
    <section
      id="experiments"
      className="w-experiments"
      aria-labelledby="experiments-heading"
    >
      <div className="w-container">
        <div className="w-experiments__header">
          <div>
            <span className="telemetry-kicker">SYSTEM PROTOTYPES</span>
            <h2 id="experiments-heading" className="headline-section" style={{ marginTop: '0.75rem' }}>
              SELECTED DEMONSTRATIONS
            </h2>
          </div>

          <p className="w-experiments__notice">
            <strong>Demonstration Notice:</strong> Conceptual prototypes showcasing software, AI,
            and digital system architecture — not fabricated client deployments.
          </p>
        </div>

        <div className="w-experiments__selector" role="tablist" aria-label="System demonstrations">
          {EXPERIMENTS.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              role="tab"
              aria-selected={idx === selectedIdx}
              className={`w-experiments__tab ${idx === selectedIdx ? 'w-experiments__tab--active' : ''}`}
              onClick={() => {
                setSelectedIdx(idx);
                setShowNotes(false);
              }}
            >
              <span className="w-experiments__tab-code">
                {exp.code} · {exp.division}
              </span>
              <span className="w-experiments__tab-title">{exp.title}</span>
            </button>
          ))}
        </div>

        <div className="w-experiments__stage" role="tabpanel" aria-live="polite">
          <div className="w-experiments__media">
            <span className="w-experiments__badge">{active.classification}</span>
            <OptimizedImage
              webpSrc={active.imageWebp}
              fallbackSrc={active.imageFallback}
              alt={active.imageAlt}
              className="w-experiments__img"
            />
          </div>

          <div className="w-experiments__detail">
            <span className="telemetry-kicker">{active.division}</span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.35rem, 2.3vw, 1.9rem)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {active.title}
            </h3>
            <p className="text-lead" style={{ fontSize: '0.96rem' }}>
              {active.summary}
            </p>

            <div className="w-experiments__chips">
              {active.integratedSystems.map((sys) => (
                <span key={sys} className="w-experiments__chip">
                  {sys}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="w-experiments__notes-btn"
              aria-expanded={showNotes}
              onClick={() => setShowNotes((prev) => !prev)}
            >
              <span>{showNotes ? 'HIDE ARCHITECTURE NOTES' : 'READ ARCHITECTURE NOTES'}</span>
              {showNotes ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {showNotes && (
              <ul className="w-experiments__notes-list">
                {active.architectureNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
