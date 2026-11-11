import React, { useEffect, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { buildWhatsAppUrl, CONTACT_INFO, NAV_ITEMS } from '../data/wontweData';
import { scrollToSection } from '../utils/motion';
import { BrandMark } from './BrandMark';
import './Navbar.css';

interface ChapterMarker {
  id: string;
  label: string;
  navMatch: string;
}

const CHAPTERS: ChapterMarker[] = [
  { id: 'hero', label: 'OVERVIEW', navMatch: 'hero' },
  { id: 'about', label: 'TECHNOLOGY', navMatch: 'about' },
  { id: 'world-tech', label: '01 · TECH', navMatch: 'divisions' },
  { id: 'world-digital', label: '02 · DIGITAL', navMatch: 'divisions' },
  { id: 'world-studios', label: '03 · STUDIOS', navMatch: 'divisions' },
  { id: 'world-events', label: '04 · EVENTS', navMatch: 'divisions' },
  { id: 'approach', label: 'APPROACH', navMatch: 'divisions' },
  { id: 'experiments', label: 'SYSTEMS', navMatch: 'divisions' },
  { id: 'services', label: 'SERVICES', navMatch: 'services' },
  { id: 'contact', label: 'CONTACT', navMatch: 'contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<ChapterMarker>(CHAPTERS[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 48);
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const found = CHAPTERS.find((c) => c.id === visible[0].target.id);
          if (found) setActiveChapter(found);
        }
      },
      {
        rootMargin: '-28% 0px -42% 0px',
        threshold: [0.05, 0.25, 0.5],
      }
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const targetId = id === 'divisions' ? 'world-tech' : id;
    scrollToSection(targetId);
  };

  return (
    <>
      <div className="w-scroll-progress" aria-hidden="true">
        <div
          className="w-scroll-progress__bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <header className={`w-navbar ${scrolled ? 'w-navbar--scrolled' : ''}`}>
        <div className="w-navbar__inner">
          <a
            href="#hero"
            className="w-navbar__logo"
            aria-label="WONTWE Home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
          >
            <BrandMark variant="horizontal" height={26} responsiveMobileMonogram />
          </a>

          <nav aria-label="Primary Navigation">
            <ul className="w-navbar__links">
              {NAV_ITEMS.map((item) => {
                const isActive = activeChapter.navMatch === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id === 'divisions' ? 'world-tech' : item.id}`}
                      className={`w-navbar__link ${isActive ? 'w-navbar__link--active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="w-navbar__status" aria-live="polite">
            <span className="w-navbar__status-dot" aria-hidden="true" />
            <span>WONTWE // {activeChapter.label}</span>
          </div>

          <button
            type="button"
            className="w-navbar__burger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-overlay"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Desktop Chapter Rail */}
      <aside className="w-chapter-rail" aria-label="Experience Chapters">
        {CHAPTERS.map((chapter) => {
          const isCurrent = activeChapter.id === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              className={`w-chapter-item ${isCurrent ? 'w-chapter-item--active' : ''}`}
              onClick={() => scrollToSection(chapter.id)}
              aria-label={`Jump to ${chapter.label}`}
              aria-current={isCurrent ? 'location' : undefined}
            >
              <span className="w-chapter-item__label">{chapter.label}</span>
              <span className="w-chapter-item__pip" />
            </button>
          );
        })}
      </aside>

      {/* Mobile Fullscreen Architectural Menu */}
      <div
        id="mobile-navigation-overlay"
        className={`w-mobile-menu ${menuOpen ? 'w-mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile Navigation">
          <ul className="w-mobile-menu__list">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id === 'divisions' ? 'world-tech' : item.id}`}
                  className="w-mobile-menu__link"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  <span className="w-mobile-menu__num">0{idx + 1}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-mobile-menu__footer">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1rem' }}>
            <a
              href={CONTACT_INFO.phoneHref}
              tabIndex={menuOpen ? 0 : -1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '999px',
                border: '1px solid var(--border-accent)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}
            >
              <Phone size={14} style={{ color: 'var(--accent-ice)' }} aria-hidden="true" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, var(--accent-electric) 0%, var(--accent-deep) 100%)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}
            >
              <MessageCircle size={14} aria-hidden="true" />
              <span>WHATSAPP</span>
            </a>
          </div>
          <BrandMark variant="stacked" height={84} />
        </div>
      </div>
    </>
  );
};

