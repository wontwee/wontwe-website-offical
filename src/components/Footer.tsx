import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, CONTACT_INFO, WORLDS } from '../data/wontweData';
import { scrollToSection } from '../utils/motion';
import { BrandMark } from './BrandMark';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="w-footer">
      <div className="w-container">
        <div className="w-footer__inner">
          <div className="w-footer__left">
            <BrandMark variant="stacked" height={110} />
          </div>

          <div className="w-footer__right">
            <nav className="w-footer__nav" aria-label="Footer Division Links">
              {WORLDS.map((w) => (
                <button key={w.id} type="button" onClick={() => scrollToSection(`world-${w.id}`)}>
                  {w.name}
                </button>
              ))}
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
          <span>Supporting Divisions: WONTWE Studios &amp; WONTWE Events</span>
        </div>
      </div>
    </footer>
  );
};
