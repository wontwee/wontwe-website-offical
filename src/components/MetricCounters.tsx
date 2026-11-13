import React from 'react';
import { Activity, ShieldCheck, Zap, Layers } from 'lucide-react';
import './MetricCounters.css';

interface MetricItem {
  code: string;
  value: string;
  label: string;
  detail: string;
  icon: React.ReactNode;
  badge: string;
}

const METRICS: MetricItem[] = [
  {
    code: 'METRIC-01',
    value: '99.98%',
    label: 'CLOUD RESILIENCE',
    detail: 'Automated multi-region failover, container orchestration, and continuous uptime monitoring.',
    icon: <Activity size={18} aria-hidden="true" />,
    badge: 'HIGH AVAILABILITY',
  },
  {
    code: 'METRIC-02',
    value: '2 – 6 WKS',
    label: 'RAPID MVP SPRINT',
    detail: 'Fast-tracked engineering cadence from technical architecture to live production release.',
    icon: <Zap size={18} aria-hidden="true" />,
    badge: 'ACCELERATED CADENCE',
  },
  {
    code: 'METRIC-03',
    value: '39+',
    label: 'ACTIVE CAPABILITIES',
    detail: 'End-to-end full-stack software, business systems, intelligent AI pipelines, and digital growth.',
    icon: <Layers size={18} aria-hidden="true" />,
    badge: 'INTEGRATED DIRECTORY',
  },
  {
    code: 'METRIC-04',
    value: '100%',
    label: 'TYPESCRIPT & CLOUD',
    detail: 'Strict type safety, automated CI/CD test gates, and production container standards.',
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    badge: 'ZERO LEGACY DEBT',
  },
];

export const MetricCounters: React.FC = () => {
  return (
    <section className="w-metrics" aria-label="WONTWE Engineering & Delivery Standards">
      <div className="w-container">
        <div className="w-metrics__top">
          <div>
            <span className="telemetry-kicker">ENGINEERING STANDARDS // VERIFIED METRICS</span>
            <h2 className="headline-section" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', marginTop: '0.5rem' }}>
              BUILT FOR HIGH AVAILABILITY &amp; SPEED
            </h2>
          </div>
          <span className="w-world__env-name">SLA GUARANTEES // ENTERPRISE DELIVERY</span>
        </div>

        <div className="w-metrics__grid">
          {METRICS.map((metric) => (
            <div key={metric.code} className="w-metrics__card w-spotlight">
              <div className="w-metrics__card-head">
                <span className="w-metrics__card-code">{metric.code}</span>
                <span className="w-metrics__badge">
                  <span className="w-metrics__dot" aria-hidden="true" />
                  {metric.badge}
                </span>
              </div>

              <div className="w-metrics__value-wrap">
                <div className="w-metrics__icon-wrap">{metric.icon}</div>
                <div className="w-metrics__value">{metric.value}</div>
              </div>

              <div className="w-metrics__label">{metric.label}</div>
              <p className="w-metrics__detail">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

