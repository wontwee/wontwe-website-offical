import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cpu, Database, Layers, Workflow } from 'lucide-react';
import { BRAND_STATEMENTS, SOFTWARE_SHOWCASES, WORLDS } from '../data/wontweData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap, MOTION_EASE, scrollToSection } from '../utils/motion';
import { OptimizedImage } from './OptimizedImage';
import './AboutSection.css';

const STAGE_PREVIEWS: Record<
  string,
  {
    url: string;
    metrics: { label: string; value: string }[];
    flow: string[];
  }
> = {
  'saas-web': {
    url: 'CLOUD.WONTWE // MULTI-TENANT SAAS',
    metrics: [
      { label: 'FRONTENDS', value: 'Web & Mobile Apps' },
      { label: 'COMMERCE', value: 'Custom Storefronts' },
      { label: 'API FABRIC', value: 'REST & GraphQL' },
    ],
    flow: ['UX System', 'App Runtime', 'Auth & Billing', 'Global Edge'],
  },
  'business-erp': {
    url: 'OPS.WONTWE // ERP · CRM · DASHBOARDS',
    metrics: [
      { label: 'OPERATIONS', value: 'ERP & Inventory' },
      { label: 'WORKFORCE', value: 'CRM & HRMS Core' },
      { label: 'TELEMETRY', value: 'Executive KPIs' },
    ],
    flow: ['Role Access', 'Stock Ledger', 'Workflow Sync', 'Live View'],
  },
  'ai-automation': {
    url: 'AI.WONTWE // INTELLIGENT WORKFLOWS',
    metrics: [
      { label: 'ASSISTANTS', value: 'AI Chatbots' },
      { label: 'INTEGRATION', value: 'Model Endpoints' },
      { label: 'TRIGGERS', value: 'Process Automation' },
    ],
    flow: ['Data Ingest', 'RAG Context', 'Schema Check', 'ERP Action'],
  },
  'cloud-devops': {
    url: 'INFRA.WONTWE // CLOUD & CI/CD',
    metrics: [
      { label: 'PIPELINES', value: 'Automated CI/CD' },
      { label: 'DATABASES', value: 'Tuned Replication' },
      { label: 'RECOVERY', value: 'Encrypted Snapshots' },
    ],
    flow: ['Git Commit', 'QA Suite', 'Zero-Downtime', '24/7 Monitor'],
  },
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>(SOFTWARE_SHOWCASES[0].id);
  const reducedMotion = useReducedMotion();

  const activeShowcase =
    SOFTWARE_SHOWCASES.find((s) => s.id === selectedId) ?? SOFTWARE_SHOWCASES[0];
  const preview = STAGE_PREVIEWS[activeShowcase.id] ?? STAGE_PREVIEWS['saas-web'];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stageRef.current,
        { y: 36, scale: 0.97, opacity: 0.65 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.95,
          ease: MOTION_EASE.architectural,
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
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
      ref={sectionRef}
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
      <div className="w-tech-intro__grid-overlay" aria-hidden="true" />

      <div className="w-container w-tech-intro__inner">
        <div className="w-tech-intro__header">
          <div>
            <span className="telemetry-kicker">
              TECHNOLOGY ECOSYSTEM · {BRAND_STATEMENTS.tagline.toUpperCase()}
            </span>
            <h2 id="tech-intro-heading" className="headline-section" style={{ marginTop: '0.75rem' }}>
              {BRAND_STATEMENTS.techIntroHeadline}
            </h2>
          </div>

          <div className="w-tech-intro__pills" role="tablist" aria-label="Software interface previews">
            {SOFTWARE_SHOWCASES.map((item) => {
              const active = item.id === activeShowcase.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`w-tech-intro__pill ${active ? 'w-tech-intro__pill--active' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  {iconFor(item.id)}
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Product UI Stage */}
        <div ref={stageRef} className="w-stage-canvas" role="tabpanel" aria-live="polite">
          <div className="w-device-frame">
            <div className="w-device-frame__bar">
              <div className="w-device-frame__dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="w-device-frame__url">{preview.url}</span>
            </div>

            <div className="w-device-frame__workspace">
              <div className="w-device-frame__metrics">
                {preview.metrics.map((m) => (
                  <div key={m.label} className="w-device-metric">
                    <span className="w-device-metric__k">{m.label}</span>
                    <span className="w-device-metric__v">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="w-device-frame__flow">
                {preview.flow.map((step, idx) => (
                  <div
                    key={step}
                    className={`w-flow-node ${
                      idx === preview.flow.length - 1 ? 'w-flow-node--highlight' : ''
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-stage-aside">
            <span className="telemetry-kicker">{activeShowcase.category}</span>
            <h3 className="w-stage-aside__title">{activeShowcase.title}</h3>
            <p className="text-lead" style={{ fontSize: '1rem' }}>
              {activeShowcase.tagline}
            </p>
            <div className="w-stage-aside__stack">{activeShowcase.architectureLayer}</div>
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
        </div>

        {/* Clean Four-Division Hierarchy Strip */}
        <div className="w-division-bar" aria-label="WONTWE Divisions Overview">
          {WORLDS.map((w) => (
            <button
              key={w.id}
              type="button"
              className="w-division-bar__btn"
              onClick={() => scrollToSection(`world-${w.id}`)}
            >
              <span className="w-division-bar__tier">
                {w.index} · {w.tier}
              </span>
              <span className="w-division-bar__name">{w.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
