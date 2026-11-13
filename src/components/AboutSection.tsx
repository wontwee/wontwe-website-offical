import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cpu, Database, Layers, Workflow } from 'lucide-react';
import { BRAND_STATEMENTS, SOFTWARE_SHOWCASES } from '../data/wontweData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { handleTablistKeyDown } from '../utils/a11y';
import { scrollToSection } from '../utils/motion';
import { OptimizedImage } from './OptimizedImage';
import './AboutSection.css';

const STAGE_METRICS: Record<string, { label: string; value: string }[]> = {
  'saas-web': [
    { label: 'FRONTENDS', value: 'Web & Mobile Apps' },
    { label: 'COMMERCE', value: 'Custom Storefronts' },
    { label: 'API FABRIC', value: 'REST & GraphQL' },
  ],
  'business-erp': [
    { label: 'OPERATIONS', value: 'ERP & Inventory' },
    { label: 'WORKFORCE', value: 'CRM & HRMS Core' },
    { label: 'TELEMETRY', value: 'Executive KPIs' },
  ],
  'ai-automation': [
    { label: 'ASSISTANTS', value: 'AI Chatbots' },
    { label: 'INTEGRATION', value: 'Model Endpoints' },
    { label: 'TRIGGERS', value: 'Process Automation' },
  ],
  'cloud-devops': [
    { label: 'PIPELINES', value: 'Automated CI/CD' },
    { label: 'DATABASES', value: 'Tuned Replication' },
    { label: 'RECOVERY', value: 'Encrypted Snapshots' },
  ],
};

export const AboutSection: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>(SOFTWARE_SHOWCASES[0].id);
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  const selectedIndex = Math.max(
    0,
    SOFTWARE_SHOWCASES.findIndex((s) => s.id === selectedId)
  );
  const activeShowcase = SOFTWARE_SHOWCASES[selectedIndex] ?? SOFTWARE_SHOWCASES[0];
  const metrics = STAGE_METRICS[activeShowcase.id] ?? STAGE_METRICS['saas-web'];

  useEffect(() => {
    if (reducedMotion || !stageRef.current || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const iconFor = (id: string) => {
    if (id === 'saas-web') return <Layers size={14} aria-hidden="true" />;
    if (id === 'business-erp') return <Database size={14} aria-hidden="true" />;
    if (id === 'ai-automation') return <Cpu size={14} aria-hidden="true" />;
    return <Workflow size={14} aria-hidden="true" />;
  };

  return (
    <section
      id="about"
      className="w-tech-intro"
      aria-labelledby="tech-intro-heading"
    >
      <div className="w-tech-intro__backdrop" aria-hidden="true">
        <OptimizedImage
          webpSrc="/images/about-monolith.webp"
          fallbackSrc="/images/about-monolith.jpg"
          alt=""
          className="w-tech-intro__bg-img"
        />
      </div>

      <div className="w-container w-tech-intro__inner">
        <div className="w-tech-intro__header">
          <div>
            <span className="telemetry-kicker">TECHNOLOGY ECOSYSTEM</span>
            <h2 id="tech-intro-heading" className="headline-section" style={{ marginTop: '0.75rem' }}>
              {BRAND_STATEMENTS.techIntroHeadline}
            </h2>
          </div>

          <div className="w-tech-intro__pills" role="tablist" aria-label="Software interface previews">
            {SOFTWARE_SHOWCASES.map((item, idx) => {
              const active = item.id === activeShowcase.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  className={`w-tech-intro__pill ${active ? 'w-tech-intro__pill--active' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                  onKeyDown={(e) =>
                    handleTablistKeyDown(e, idx, SOFTWARE_SHOWCASES.length, (next) =>
                      setSelectedId(SOFTWARE_SHOWCASES[next].id)
                    )
                  }
                >
                  {iconFor(item.id)}
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={stageRef}
          className={`w-stage-canvas ${revealed ? 'w-stage-canvas--revealed' : ''}`}
          role="tabpanel"
          aria-live="polite"
        >
          <div className="w-stage-aside">
            <span className="telemetry-kicker">{activeShowcase.category}</span>
            <h3 className="w-stage-aside__title">{activeShowcase.title}</h3>
            <p className="text-lead" style={{ fontSize: '1rem' }}>
              {activeShowcase.tagline}
            </p>
            <p className="w-stage-aside__stack">{activeShowcase.architectureLayer}</p>
            <button
              type="button"
              className="btn-primary"
              style={{ width: 'fit-content' }}
              onClick={() => scrollToSection('world-tech')}
            >
              <span>EXPLORE WONTWE TECH</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="w-stage-metrics">
            {metrics.map((m) => (
              <div key={m.label} className="w-device-metric">
                <span className="w-device-metric__k">{m.label}</span>
                <span className="w-device-metric__v">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
