import React, { useState } from 'react';
import { Check, Play, RefreshCw, Terminal } from 'lucide-react';
import './LiveTerminal.css';

interface TerminalTab {
  id: string;
  label: string;
  command: string;
  logs: { text: string; status: 'ok' | 'info' | 'highlight' }[];
  statLabel: string;
  statValue: string;
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'deploy',
    label: '01: CLOUD DEPLOY',
    command: 'wontwe deploy --env=production --stack=cloud-mesh --zero-downtime',
    logs: [
      { text: 'Auditing multi-region cluster topology (AWS ap-south-1)...', status: 'info' },
      { text: 'Automated test harness: 142 unit + 38 integration suites... PASS', status: 'ok' },
      { text: 'Container image build: sha256:7e18e0... Verified & scanned 0 CVEs', status: 'ok' },
      { text: 'Zero-downtime rolling update across 3 availability zones...', status: 'ok' },
      { text: 'Edge CDN routing active with TLS 1.3 & HTTP/3. Latency: 18ms', status: 'highlight' },
    ],
    statLabel: 'DEPLOYMENT TIME',
    statValue: '42.8s · ZERO DOWNTIME',
  },
  {
    id: 'database',
    label: '02: REPLICATION',
    command: 'wontwe db:sync --cluster=primary --replicate=ap-south-1 --mode=acid',
    logs: [
      { text: 'Verifying relational schema migrations and table indexes...', status: 'info' },
      { text: 'Database connection pool scaling: max 2,400 concurrent IOPS... OK', status: 'ok' },
      { text: 'Automated encrypted snapshot generated (AES-256 GCM)... OK', status: 'ok' },
      { text: 'Live read/write splitting enabled with auto-failover heartbeat... OK', status: 'highlight' },
    ],
    statLabel: 'PERSISTENCE HEALTH',
    statValue: '100% ACID INTEGRITY',
  },
  {
    id: 'ai-pipeline',
    label: '03: AI WORKFLOW',
    command: 'wontwe ai:pipeline --retrieval=vector-rag --guardrails=deterministic',
    logs: [
      { text: 'Connecting vector index embedding store to enterprise dataset...', status: 'info' },
      { text: 'Applying deterministic safety guardrails & PII redaction layer... PASS', status: 'ok' },
      { text: 'Context retrieval grounding verified against audited company docs... OK', status: 'ok' },
      { text: 'Event-driven agent queue initialized for ERP & CRM webhook actions', status: 'highlight' },
    ],
    statLabel: 'AI CONFIDENCE',
    statValue: '99.9% DETERMINISTIC',
  },
];

export const LiveTerminal: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isRerunning, setIsRerunning] = useState(false);

  const activeTab = TERMINAL_TABS[activeTabIdx];

  const handleRerun = () => {
    setIsRerunning(true);
    setTimeout(() => {
      setIsRerunning(false);
    }, 450);
  };

  return (
    <div className="w-terminal w-spotlight" aria-label="WONTWE Engineering Terminal CLI Simulator">
      {/* Terminal Title Bar */}
      <div className="w-terminal__titlebar">
        <div className="w-terminal__traffic-lights" aria-hidden="true">
          <span className="w-terminal__light w-terminal__light--red" />
          <span className="w-terminal__light w-terminal__light--yellow" />
          <span className="w-terminal__light w-terminal__light--green" />
        </div>

        <div className="w-terminal__title">
          <Terminal size={13} aria-hidden="true" style={{ color: 'var(--accent-ice)' }} />
          <span>wontwe-cli v2.4 // production-engine</span>
        </div>

        <button
          type="button"
          className="w-terminal__rerun-btn"
          onClick={handleRerun}
          title="Rerun simulated command execution"
          aria-label="Rerun simulated command execution"
        >
          <RefreshCw size={12} className={isRerunning ? 'w-spin' : ''} aria-hidden="true" />
          <span>RERUN</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="w-terminal__tabs" role="tablist" aria-label="Terminal Scenarios">
        {TERMINAL_TABS.map((tab, idx) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={idx === activeTabIdx}
            className={`w-terminal__tab ${idx === activeTabIdx ? 'w-terminal__tab--active' : ''}`}
            onClick={() => setActiveTabIdx(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div className="w-terminal__body" aria-live="polite">
        <div className="w-terminal__prompt-row">
          <span className="w-terminal__prompt-symbol" aria-hidden="true">$</span>
          <span className="w-terminal__command">{activeTab.command}</span>
        </div>

        <div className={`w-terminal__logs ${isRerunning ? 'w-terminal__logs--animating' : ''}`}>
          {activeTab.logs.map((log, i) => (
            <div key={`${activeTab.id}-${i}`} className="w-terminal__log-row">
              {log.status === 'ok' ? (
                <span className="w-terminal__log-badge w-terminal__log-badge--ok" aria-hidden="true">
                  <Check size={11} />
                </span>
              ) : log.status === 'highlight' ? (
                <span className="w-terminal__log-badge w-terminal__log-badge--highlight" aria-hidden="true">
                  <Play size={10} />
                </span>
              ) : (
                <span className="w-terminal__log-badge w-terminal__log-badge--info" aria-hidden="true">
                  ›
                </span>
              )}
              <span className={`w-terminal__log-text w-terminal__log-text--${log.status}`}>
                {log.text}
              </span>
            </div>
          ))}
        </div>

        {/* Terminal Status Footer */}
        <div className="w-terminal__footer">
          <div className="w-terminal__status-pill">
            <span className="w-terminal__status-dot" aria-hidden="true" />
            <span>PIPELINE HEALTH // OPERATIONAL</span>
          </div>
          <div className="w-terminal__stat">
            <span className="w-terminal__stat-label">{activeTab.statLabel}:</span>
            <span className="w-terminal__stat-value">{activeTab.statValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

