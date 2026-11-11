import React, { useState } from 'react';
import { APPROACH_STAGES, BRAND_STATEMENTS } from '../data/wontweData';
import './ApproachTimeline.css';

export const ApproachTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const progressPct = ((activeIdx + 1) / APPROACH_STAGES.length) * 100;

  return (
    <section id="approach" className="w-approach" aria-labelledby="approach-heading">
      <div className="w-container">
        <div className="w-approach__top">
          <div>
            <span className="telemetry-kicker">
              ENGINEERING METHODOLOGY // {BRAND_STATEMENTS.tagline.toUpperCase()}
            </span>
            <h2 id="approach-heading" className="headline-section" style={{ marginTop: '0.75rem' }}>
              FROM ARCHITECTURE TO LAUNCH.
            </h2>
          </div>
          <span className="w-world__env-name">INTERACTIVE DELIVERY PIPELINE</span>
        </div>

        <div className="w-approach__progress-track" aria-hidden="true">
          <div className="w-approach__progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="w-approach__grid">
          {APPROACH_STAGES.map((stage, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={stage.number}
                type="button"
                className={`w-approach__node ${active ? 'w-approach__node--active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
              >
                <div>
                  <span className="w-approach__node-num">{stage.number}</span>
                  <h3 className="w-approach__node-title">{stage.title}</h3>
                  <p className="w-approach__node-desc" style={{ marginTop: '0.5rem' }}>
                    {stage.description}
                  </p>
                </div>
                <span className="w-approach__artifact">{stage.artifact}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
