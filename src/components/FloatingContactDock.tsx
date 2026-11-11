import React from 'react';
import { Phone } from 'lucide-react';
import { buildWhatsAppUrl, CONTACT_INFO } from '../data/wontweData';
import './FloatingContactDock.css';

export const FloatingContactDock: React.FC = () => {
  return (
    <aside className="w-floating-dock" aria-label="Direct Call and WhatsApp Contact">
      <a
        href={CONTACT_INFO.phoneHref}
        className="w-floating-dock__btn w-floating-dock__btn--call"
        aria-label={`Call WONTWE at ${CONTACT_INFO.phoneDisplay}`}
      >
        <span className="w-floating-dock__tooltip" aria-hidden="true">
          Call {CONTACT_INFO.phoneDisplay}
        </span>
        <Phone size={18} strokeWidth={2} aria-hidden="true" />
      </a>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-floating-dock__btn w-floating-dock__btn--whatsapp"
        aria-label={`Chat with WONTWE on WhatsApp (${CONTACT_INFO.phoneDisplay})`}
      >
        <span className="w-floating-dock__tooltip" aria-hidden="true">
          WhatsApp Us
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.23-1.63a11.93 11.93 0 0 0 5.83 1.5h.01c6.6 0 11.95-5.36 11.95-11.96 0-3.2-1.24-6.2-3.5-8.43Zm-8.46 18.37h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.7.97.99-3.61-.24-.37a9.89 9.89 0 0 1-1.52-5.28c0-5.47 4.46-9.93 9.94-9.93 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.46 9.93-9.96 9.93Zm5.45-7.43c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </aside>
  );
};

