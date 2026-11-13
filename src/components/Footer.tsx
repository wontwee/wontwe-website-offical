import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, CONTACT_INFO, WORLDS } from '../data/wontweData';
import { scrollToSection } from '../utils/motion';
import { BrandMark } from './BrandMark';
import './Footer.css';

export const Footer: React.FC = () => {
  const [bengaluruTime, setBengaluruTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setBengaluruTime(formatted);
      } catch {
        setBengaluruTime('IST (GMT+5:30)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-footer">
      <div className="w-container">
        {/* Live Office Telemetry Strip */}
        <div className="w-footer__telemetry-bar">
          <div className="w-footer__status-badge">
            <span className="w-footer__beacon" aria-hidden="true" />
            <span className="w-footer__status-text">
              HQ: BENGALURU, INDIA · {bengaluruTime ? `${bengaluruTime} IST` : 'IST (GMT+5:30)'}
            </span>
          </div>
          <span className="w-world__env-name">ENGINEERS AVAILABLE FOR GLOBAL CLIENTS</span>
        </div>

        <div className="w-footer__inner">
          <div className="w-footer__left">
            <BrandMark variant="stacked" height={110} />
          </div>

          <div className="w-footer__right">
            <nav className="w-footer__nav" aria-label="Footer Division Links">
              {WORLDS.map((w) => {
                const isComingSoon = !!w.comingSoon;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => scrollToSection(isComingSoon ? 'future-divisions' : `world-${w.id}`)}
                    style={isComingSoon ? { opacity: 0.7 } : undefined}
                  >
                    {w.name} {isComingSoon ? '(Coming Soon)' : ''}
                  </button>
                );
              })}
              <button type="button" onClick={() => scrollToSection('services')}>
                Services
              </button>
              <button type="button" onClick={() => scrollToSection('contact')}>
                Contact
              </button>
            </nav>

            <div className="w-footer__contact-actions">
              <a
                href={CONTACT_INFO.phoneHref}
                className="w-footer__contact-link"
                aria-label={`Call WONTWE at ${CONTACT_INFO.phoneDisplay}`}
              >
                <Phone size={14} style={{ color: 'var(--accent-ice)' }} aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-footer__contact-link w-footer__contact-link--whatsapp"
                aria-label={`Chat with WONTWE on WhatsApp (${CONTACT_INFO.phoneDisplay})`}
              >
                <MessageCircle size={14} style={{ color: 'var(--accent-ice)' }} aria-hidden="true" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-footer__bottom">
          <span>WONTWE — Yes we Do. · Software Engineering, Digital Solutions, AI &amp; Cloud Systems</span>
          <span>Future Divisions (In Development): WONTWE Studios &amp; WONTWE Events</span>
        </div>
      </div>
    </footer>
  );
};
