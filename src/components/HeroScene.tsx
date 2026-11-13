import React from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { BRAND_STATEMENTS, WORLDS } from '../data/wontweData';
import { scrollToSection } from '../utils/motion';
import { OptimizedImage } from './OptimizedImage';
import './HeroScene.css';

export const HeroScene: React.FC = () => {
  return (
    <section id="hero" className="w-hero" aria-label="WONTWE Hero Overview">
      <div className="w-hero__media">
        <OptimizedImage
          webpSrc="/images/hero-tech-architecture.webp"
          fallbackSrc="/images/hero-tech-architecture.jpg"
          alt="WONTWE futuristic software architecture, floating glass system topologies, and enterprise cloud servers"
          className="w-hero__image"
          priority
        />
      </div>

      <div className="w-hero__scrim" aria-hidden="true" />

      <div className="w-container w-hero__stage">
        <div className="w-hero__headline-col">
          <div className="w-hero__tagline-pill w-hero__enter w-hero__enter--1">
            <span className="telemetry-kicker">TECHNOLOGY FIRST</span>
            <span className="w-hero__tagline-badge">
              Yes we <span className="w-hero__tagline-accent">Do.</span>
            </span>
          </div>

          <div className="w-hero__mask">
            <h1 className="w-hero__headline w-hero__enter w-hero__enter--2">
              {BRAND_STATEMENTS.heroHeadline}
            </h1>
          </div>

          <p className="w-hero__subtext w-hero__enter w-hero__enter--3">
            {BRAND_STATEMENTS.heroSub}
          </p>

          <div className="w-hero__actions w-hero__enter w-hero__enter--4">
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToSection('world-tech')}
            >
              <span>EXPLORE OUR TECHNOLOGY</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => scrollToSection('services')}
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-container w-hero__footer-strip">
        <div className="w-hero__hierarchy-list" aria-label="WONTWE divisions">
          {WORLDS.map((w) => {
            const isComingSoon = !!w.comingSoon;
            return (
              <button
                key={w.id}
                type="button"
                className={`w-hero__div-link ${w.id === 'tech' ? 'w-hero__div-link--primary' : ''}`}
                onClick={() => scrollToSection(isComingSoon ? 'future-divisions' : `world-${w.id}`)}
                style={isComingSoon ? { opacity: 0.75 } : undefined}
              >
                <span style={{ color: 'var(--accent-ice)' }}>{w.index}</span>
                <span>{w.name}</span>
                {isComingSoon && (
                  <span
                    style={{
                      fontSize: '0.56rem',
                      letterSpacing: '0.12em',
                      padding: '0.12rem 0.45rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border-accent)',
                      background: 'rgba(125, 24, 224, 0.14)',
                      color: 'var(--accent-ice)',
                      textTransform: 'uppercase',
                    }}
                  >
                    COMING SOON
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
