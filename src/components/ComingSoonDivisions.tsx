import React from 'react';
import { Camera, Calendar } from 'lucide-react';
import { scrollToSection } from '../utils/motion';
import './ComingSoonDivisions.css';

export const ComingSoonDivisions: React.FC = () => {
  return (
    <section id="future-divisions" className="w-coming-soon" aria-labelledby="coming-soon-heading">
      <div className="w-container">
        <div className="w-coming-soon__header">
          <span className="telemetry-kicker">FUTURE DIVISIONS // IN DEVELOPMENT</span>
          <h2 id="coming-soon-heading" className="headline-section">
            CREATIVE &amp; LIVE PRODUCTION.
          </h2>
          <p className="text-lead">
            WONTWE is expanding its ecosystem. While our Software Engineering and Digital Growth
            divisions are fully operational, our creative production and staging wings are currently in
            pre-launch development.
          </p>
        </div>

        <div className="w-coming-soon__grid">
          {/* Card 1: WONTWE Studios */}
          <div className="w-coming-soon__card">
            <div className="w-coming-soon__card-top">
              <span className="w-coming-soon__index">03 // DIVISION</span>
              <span className="w-coming-soon__badge">
                <span className="w-coming-soon__pulse-dot" aria-hidden="true" />
                COMING SOON
              </span>
            </div>

            <div className="w-coming-soon__card-body">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
                <Camera size={20} style={{ color: 'var(--accent-ice)' }} aria-hidden="true" />
                <h3 className="w-coming-soon__title">WONTWE Studios</h3>
              </div>
              <p className="w-coming-soon__desc">
                Commercial cinematography, product photography, 3D motion graphics, and high-impact
                visual assets engineered specifically for product launches and brand scale.
              </p>
            </div>

            <div className="w-coming-soon__card-footer">
              <span>VISUAL &amp; MOTION PRODUCTION</span>
              <button
                type="button"
                className="w-services__link-action"
                onClick={() => scrollToSection('contact')}
                style={{ cursor: 'pointer' }}
              >
                <span>Waitlist Enquiry ↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: WONTWE Events */}
          <div className="w-coming-soon__card">
            <div className="w-coming-soon__card-top">
              <span className="w-coming-soon__index">04 // DIVISION</span>
              <span className="w-coming-soon__badge">
                <span className="w-coming-soon__pulse-dot" aria-hidden="true" />
                COMING SOON
              </span>
            </div>

            <div className="w-coming-soon__card-body">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
                <Calendar size={20} style={{ color: 'var(--accent-ice)' }} aria-hidden="true" />
                <h3 className="w-coming-soon__title">WONTWE Events</h3>
              </div>
              <p className="w-coming-soon__desc">
                Turnkey corporate event management, spatial stage design, LED architecture, and live
                broadcast setups for enterprise keynotes, exhibitions, and product unveilings.
              </p>
            </div>

            <div className="w-coming-soon__card-footer">
              <span>CORPORATE STAGING &amp; EXPERIENCES</span>
              <button
                type="button"
                className="w-services__link-action"
                onClick={() => scrollToSection('contact')}
                style={{ cursor: 'pointer' }}
              >
                <span>Waitlist Enquiry ↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
