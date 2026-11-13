import React, { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/wontweData';
import { scrollToSection } from '../utils/motion';
import './ProjectScopeEstimator.css';

interface ProjectScopeEstimatorProps {
  onApplyBrief: (briefText: string, divisionName: string) => void;
}

interface SolutionChoice {
  id: string;
  name: string;
  division: string;
  defaultStack: string[];
  features: string[];
}

const SOLUTIONS: SolutionChoice[] = [
  {
    id: 'saas-web',
    name: 'Full-Stack Web & SaaS',
    division: 'WONTWE Tech',
    defaultStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    features: ['Multi-Tenant Tenancy', 'Subscription Billing', 'Responsive UI / SSR'],
  },
  {
    id: 'mobile-app',
    name: 'Mobile App (iOS & Android)',
    division: 'WONTWE Tech',
    defaultStack: ['React Native / Flutter', 'Node.js API', 'PostgreSQL', 'Push Services'],
    features: ['Cross-Platform Parity', 'Offline Sync & Cache', 'App Store Compliance'],
  },
  {
    id: 'erp-crm',
    name: 'Enterprise ERP & CRM',
    division: 'WONTWE Tech',
    defaultStack: ['Modular ERP Core', 'PostgreSQL', 'Redis', 'Docker', 'Webhooks'],
    features: ['Real-Time Stock Sync', 'Role-Based Audits', 'Executive KPI Telemetry'],
  },
  {
    id: 'ai-agent',
    name: 'AI & Automation Workflow',
    division: 'WONTWE Tech',
    defaultStack: ['OpenAI / Gemini SDK', 'Vector DB', 'Python / Node', 'Cloud Queues'],
    features: ['Document Triage', 'Deterministic Guardrails', 'Event-Driven Agents'],
  },
  {
    id: 'digital-growth',
    name: 'Digital Growth & SEO Pipeline',
    division: 'WONTWE Digital',
    defaultStack: ['Technical SEO Schema', 'Google & Meta Ads', 'Attribution Modeling'],
    features: ['High-Intent Lead Funnels', 'Continuous CRO Testing', 'Brand Authority'],
  },
];

const SCALES = [
  { id: 'mvp', name: 'Rapid MVP / Prototype', duration: '2 – 4 Weeks', multiplier: 'Rapid Sprint' },
  { id: 'prod', name: 'Production Launch System', duration: '6 – 10 Weeks', multiplier: 'Full Production' },
  { id: 'enterprise', name: 'Enterprise Modernization', duration: '3 – 5 Months', multiplier: 'Enterprise Scale' },
];

const TIMELINES = [
  { id: 'urgent', name: 'Accelerated Sprint (< 1 Month)', tag: 'PRIORITY' },
  { id: 'standard', name: 'Standard Milestone Roadmap', tag: 'RECOMMENDED' },
  { id: 'team', name: 'Dedicated Engineering Team', tag: 'LONG-TERM' },
];

export const ProjectScopeEstimator: React.FC<ProjectScopeEstimatorProps> = ({ onApplyBrief }) => {
  const [solutionIdx, setSolutionIdx] = useState(0);
  const [scaleIdx, setScaleIdx] = useState(1); // Default: Production Launch
  const [timelineIdx, setTimelineIdx] = useState(1); // Default: Standard

  const solution = SOLUTIONS[solutionIdx];
  const scale = SCALES[scaleIdx];
  const timeline = TIMELINES[timelineIdx];

  // Generated summary brief
  const briefText = useMemo(() => {
    return `Project Architecture Brief:
- Target Solution: ${solution.name}
- Target Scale: ${scale.name} (${scale.duration})
- Delivery Urgency: ${timeline.name}
- Recommended Stack: ${solution.defaultStack.join(', ')}
- Core Capabilities: ${solution.features.join(' · ')}
Please connect with me to review system architecture and kick off technical discovery.`;
  }, [solution, scale, timeline]);

  const whatsAppUrl = useMemo(() => {
    const text = `Hello WONTWE team, I calculated a project blueprint on your site:\n\n*Solution:* ${solution.name}\n*Scale:* ${scale.name} (${scale.duration})\n*Timeline:* ${timeline.name}\n\nCan we discuss feasibility and technical spec?`;
    return buildWhatsAppUrl(text);
  }, [solution, scale, timeline]);

  const handleApplyToContact = () => {
    onApplyBrief(briefText, solution.division);
    scrollToSection('contact');
  };

  return (
    <section className="w-estimator" aria-labelledby="estimator-heading">
      <div className="w-container">
        <div className="w-estimator__top">
          <div>
            <span className="telemetry-kicker">
              INTERACTIVE SCOPE ESTIMATOR // INSTANT BLUEPRINT
            </span>
            <h2 id="estimator-heading" className="headline-section" style={{ marginTop: '0.65rem' }}>
              CALCULATE YOUR PROJECT BLUEPRINT
            </h2>
          </div>
          <span className="w-world__env-name">
            3-STEP PARAMETRIC ARCHITECTURE &amp; TIMELINE SPEC
          </span>
        </div>

        <div className="w-estimator__grid">
          {/* Controls Column */}
          <div className="w-estimator__controls">
            {/* Step 1: Solution */}
            <div className="w-estimator__step">
              <div className="w-estimator__step-head">
                <span className="w-estimator__step-num">01</span>
                <div>
                  <h3 className="w-estimator__step-title">SELECT TARGET SOLUTION</h3>
                  <span className="w-estimator__step-sub">What core platform are you building?</span>
                </div>
              </div>

              <div className="w-estimator__chips-grid" role="radiogroup" aria-label="Target Solution">
                {SOLUTIONS.map((s, idx) => {
                  const active = idx === solutionIdx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`w-estimator__chip ${active ? 'w-estimator__chip--active' : ''}`}
                      onClick={() => setSolutionIdx(idx)}
                    >
                      <span className="w-estimator__chip-name">{s.name}</span>
                      {active ? (
                        <CheckCircle2 size={14} className="w-estimator__chip-check" aria-hidden="true" />
                      ) : (
                        <span className="w-estimator__chip-div">{s.division.replace('WONTWE ', '')}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div className="w-estimator__step">
              <div className="w-estimator__step-head">
                <span className="w-estimator__step-num">02</span>
                <div>
                  <h3 className="w-estimator__step-title">TARGET SCALE &amp; MATURITY</h3>
                  <span className="w-estimator__step-sub">Choose product release readiness</span>
                </div>
              </div>

              <div className="w-estimator__chips-grid" role="radiogroup" aria-label="Target Scale">
                {SCALES.map((sc, idx) => {
                  const active = idx === scaleIdx;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`w-estimator__chip ${active ? 'w-estimator__chip--active' : ''}`}
                      onClick={() => setScaleIdx(idx)}
                    >
                      <span className="w-estimator__chip-name">{sc.name}</span>
                      <span className="w-estimator__chip-badge">{sc.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline */}
            <div className="w-estimator__step">
              <div className="w-estimator__step-head">
                <span className="w-estimator__step-num">03</span>
                <div>
                  <h3 className="w-estimator__step-title">DELIVERY CADENCE</h3>
                  <span className="w-estimator__step-sub">Select preferred speed and team model</span>
                </div>
              </div>

              <div className="w-estimator__chips-grid" role="radiogroup" aria-label="Delivery Cadence">
                {TIMELINES.map((tl, idx) => {
                  const active = idx === timelineIdx;
                  return (
                    <button
                      key={tl.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`w-estimator__chip ${active ? 'w-estimator__chip--active' : ''}`}
                      onClick={() => setTimelineIdx(idx)}
                    >
                      <span className="w-estimator__chip-name">{tl.name}</span>
                      <span className="w-estimator__chip-tag">{tl.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Generated Blueprint Output Card */}
          <div className="w-estimator__blueprint w-spotlight" aria-live="polite">
            <div className="w-estimator__bp-head">
              <div className="w-estimator__bp-status">
                <span className="w-estimator__bp-dot" aria-hidden="true" />
                <span>GENERATED ARCHITECTURAL BLUEPRINT</span>
              </div>
              <span className="w-estimator__bp-code">SPEC // EST-{solution.id.toUpperCase()}</span>
            </div>

            <div className="w-estimator__bp-body">
              <div className="w-estimator__bp-title-wrap">
                <span className="telemetry-kicker">{solution.division.toUpperCase()}</span>
                <h3 className="w-estimator__bp-title">{solution.name}</h3>
                <span className="w-estimator__bp-scale">
                  {scale.name} · Estimated Cadence: <strong>{scale.duration}</strong>
                </span>
              </div>

              <div className="w-estimator__bp-features">
                <span className="w-estimator__bp-section-title">CORE CAPABILITIES INCLUDED:</span>
                <div className="w-estimator__bp-feature-list">
                  {solution.features.map((feat) => (
                    <div key={feat} className="w-estimator__bp-feature-item">
                      <CheckCircle2 size={13} className="w-estimator__bp-feature-check" aria-hidden="true" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-estimator__bp-stack">
                <span className="w-estimator__bp-section-title">RECOMMENDED TECH STACK:</span>
                <div className="w-estimator__bp-stack-chips">
                  {solution.defaultStack.map((tech) => (
                    <span key={tech} className="w-estimator__bp-stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-estimator__bp-actions">
                <button
                  type="button"
                  className="btn-primary w-estimator__apply-btn"
                  onClick={handleApplyToContact}
                >
                  <span>APPLY TO CONTACT FORM</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-estimator__whatsapp-btn"
                  aria-label="Send project brief via WhatsApp"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>DISCUSS ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
