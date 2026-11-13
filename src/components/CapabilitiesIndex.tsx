import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  Search,
  Terminal,
  X,
} from 'lucide-react';
import {
  ACTIVE_WORLDS,
  buildWhatsAppUrl,
  CapabilityCluster,
  COMING_SOON_WORLDS,
  DivisionId,
  ServiceItem,
  WorldDivision,
} from '../data/wontweData';
import { handleTablistKeyDown } from '../utils/a11y';
import { scrollToSection } from '../utils/motion';
import { OptimizedImage } from './OptimizedImage';
import './CapabilitiesIndex.css';

interface CapabilitiesIndexProps {
  onEnquireService: (divisionName: string, serviceName?: string) => void;
}

// Fallback tech tags to enrich practice areas with authentic engineering context
const CLUSTER_TECH_TAGS: Record<string, string[]> = {
  'TECH-01': ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  'TECH-02': ['ERP Core', 'Multi-Tenant CRM', 'HRMS Engine', 'Stock Ledger', 'Live Webhooks', 'KPI Telemetry'],
  'TECH-03': ['OpenAI / Gemini SDK', 'Vector DB', 'RAG Pipelines', 'Document Triage', 'Guardrails'],
  'TECH-04': ['AWS Cloud', 'Docker', 'Kubernetes', 'CI/CD Gates', 'Terraform IaC', 'Database Replication'],
  'TECH-05': ['Design Tokens', 'REST & GraphQL', 'Playwright / Jest', 'Continuous QA', 'API Gateways'],
  'DIG-01': ['Technical SEO', 'Google Ads', 'Meta Performance', 'Attribution Modeling', 'Conversion Funnels'],
  'DIG-02': ['Brand Positioning', 'Visual Identity Systems', 'Editorial Systems', 'Content Architecture'],
};

export const CapabilitiesIndex: React.FC<CapabilitiesIndexProps> = ({ onEnquireService }) => {
  const [selectedDivId, setSelectedDivId] = useState<DivisionId>('tech');
  const [clusterIdx, setClusterIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [query, setQuery] = useState('');

  // Active division
  const activeDivision = useMemo<WorldDivision>(() => {
    return ACTIVE_WORLDS.find((w) => w.id === selectedDivId) ?? ACTIVE_WORLDS[0];
  }, [selectedDivId]);

  // Active cluster (safe fallback)
  const activeCluster = useMemo<CapabilityCluster>(() => {
    const clusters = activeDivision.clusters ?? [];
    return clusters[clusterIdx] ?? clusters[0] ?? {
      cluster: 'General',
      specCode: 'GEN-01',
      headline: '',
      summary: '',
      bgWebp: '/images/hero-tech-architecture.webp',
      bgFallback: '/images/hero-tech-architecture.jpg',
      mockupTitle: '',
      mockupMetrics: [],
      mockupPipeline: [],
      items: [],
    };
  }, [activeDivision, clusterIdx]);

  // Active item (safe fallback)
  const activeItem = useMemo<ServiceItem>(() => {
    const items = activeCluster.items ?? [];
    return items[itemIdx] ?? items[0] ?? {
      name: 'Custom Architecture',
      detail: 'Tailored software engineering and digital deployment.',
      deliverable: 'Production Software Architecture',
    };
  }, [activeCluster, itemIdx]);

  // Total active capability count
  const totalCount = useMemo(
    () => ACTIVE_WORLDS.reduce((acc, w) => acc + w.services.length, 0),
    []
  );

  // Search results across all active divisions
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: {
      division: WorldDivision;
      clusterIndex: number;
      cluster: CapabilityCluster;
      itemIndex: number;
      item: ServiceItem;
    }[] = [];

    ACTIVE_WORLDS.forEach((div) => {
      div.clusters.forEach((cl, cIdx) => {
        cl.items.forEach((it, iIdx) => {
          if (
            it.name.toLowerCase().includes(q) ||
            it.detail.toLowerCase().includes(q) ||
            it.deliverable.toLowerCase().includes(q) ||
            cl.cluster.toLowerCase().includes(q)
          ) {
            results.push({
              division: div,
              clusterIndex: cIdx,
              cluster: cl,
              itemIndex: iIdx,
              item: it,
            });
          }
        });
      });
    });

    return results;
  }, [query]);

  const isSearching = query.trim().length > 0;

  // Handlers that update views in place (no jump to contact!)
  const handleSelectDivision = (divId: DivisionId) => {
    setSelectedDivId(divId);
    setClusterIdx(0);
    setItemIdx(0);
    setQuery('');
  };

  const handleSelectCluster = (idx: number) => {
    setClusterIdx(idx);
    setItemIdx(0);
  };

  const handleSelectItem = (idx: number) => {
    setItemIdx(idx);
  };

  const handleSelectSearchResult = (result: (typeof searchResults)[0]) => {
    setSelectedDivId(result.division.id);
    setClusterIdx(result.clusterIndex);
    setItemIdx(result.itemIndex);
    setQuery('');
  };

  const handleInitiateEnquiry = () => {
    onEnquireService(activeDivision.name, activeItem.name);
    scrollToSection('contact');
  };

  const whatsAppUrl = useMemo(() => {
    const text = `Hello WONTWE team, I would like to enquire about your "${activeItem.name}" service under ${activeDivision.name}.`;
    return buildWhatsAppUrl(text);
  }, [activeDivision.name, activeItem.name]);

  const techTags = useMemo(() => {
    return CLUSTER_TECH_TAGS[activeCluster.specCode] ?? [
      'Production Architecture',
      'Continuous Delivery',
      'Quality Engineering',
    ];
  }, [activeCluster.specCode]);

  return (
    <section id="services" className="w-services" aria-labelledby="services-heading">
      <div className="w-container">
        {/* Section Header */}
        <div className="w-services__top">
          <div>
            <span className="telemetry-kicker">
              CAPABILITY DIRECTORY // {totalCount} ACTIVE SERVICES
            </span>
            <h2 id="services-heading" className="headline-section" style={{ marginTop: '0.75rem' }}>
              INTERACTIVE SERVICE CONSOLE
            </h2>
          </div>
          <div className="w-services__header-aside">
            <span className="w-world__env-name">
              SELECT ANY CATEGORY OR PILL TO INSPECT ARCHITECTURE IN REAL TIME
            </span>
          </div>
        </div>

        {/* Search & Global Filter Bar */}
        <div className="w-services__search-row">
          <div className="w-services__search-wrap">
            <Search size={15} className="w-services__search-icon" aria-hidden="true" />
            <label htmlFor="service-console-search" className="skip-link">
              Search all capabilities
            </label>
            <input
              id="service-console-search"
              type="search"
              className="w-services__search-input"
              placeholder={`Search capabilities (e.g. ERP, Mobile, AI, SEO, Cloud, Docker)...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isSearching && (
              <button
                type="button"
                className="w-services__search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Division Pill Buttons */}
          <div className="w-services__division-tabs" role="tablist" aria-label="Select Division">
            {ACTIVE_WORLDS.map((div, idx) => {
              const isActive = !isSearching && selectedDivId === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`w-services__div-pill ${
                    isActive ? 'w-services__div-pill--active' : ''
                  }`}
                  onClick={() => handleSelectDivision(div.id)}
                  onKeyDown={(e) =>
                    handleTablistKeyDown(e, idx, ACTIVE_WORLDS.length, (nextIdx) =>
                      handleSelectDivision(ACTIVE_WORLDS[nextIdx].id)
                    )
                  }
                >
                  <span className="w-services__div-pill-idx">{div.index}</span>
                  <span>{div.name.toUpperCase()}</span>
                  <span className="w-services__div-pill-count">({div.services.length})</span>
                </button>
              );
            })}

            {/* Studios & Events - Coming Soon Badges */}
            {COMING_SOON_WORLDS.map((w) => (
              <span
                key={w.id}
                className="w-services__div-pill w-services__div-pill--coming-soon"
                title={`${w.name} is in pre-launch development.`}
              >
                <span className="w-services__div-pill-idx">{w.index}</span>
                <span>{w.name.toUpperCase()}</span>
                <span className="w-services__coming-badge">COMING SOON</span>
              </span>
            ))}
          </div>
        </div>

        {/* If user is searching, display quick results chips */}
        {isSearching && (
          <div className="w-services__search-results-panel">
            <div className="w-services__search-results-head">
              <span>
                SEARCH RESULTS FOR &ldquo;{query}&rdquo; ({searchResults.length} FOUND)
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Click any result to load its architecture in the console below
              </span>
            </div>
            {searchResults.length === 0 ? (
              <div className="w-services__empty">
                No services matched &ldquo;{query}&rdquo;. Try keywords like &ldquo;React&rdquo;,
                &ldquo;Cloud&rdquo;, &ldquo;ERP&rdquo;, &ldquo;SEO&rdquo;, or clear search.
              </div>
            ) : (
              <div className="w-services__search-results-chips">
                {searchResults.map((res) => (
                  <button
                    key={`${res.division.id}-${res.item.name}`}
                    type="button"
                    className="w-services__search-chip"
                    onClick={() => handleSelectSearchResult(res)}
                  >
                    <span className="w-services__search-chip-div">{res.division.shortName}</span>
                    <span className="w-services__search-chip-name">{res.item.name}</span>
                    <ArrowUpRight size={13} aria-hidden="true" style={{ opacity: 0.6 }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MAIN OPTION A CONSOLE: SPLIT-SCREEN ARCHITECTURE */}
        <div className="w-console">
          {/* Left Frame: Architecture Spec & Live Telemetry Monitor */}
          <div className="w-console__monitor" aria-live="polite">
            <div className="w-console__monitor-head">
              <div className="w-console__status-badge">
                <span className="w-console__status-dot" aria-hidden="true" />
                <span>SYSTEM STATUS // DEPLOYMENT READY</span>
              </div>
              <span className="w-console__spec-code">
                {activeDivision.shortName.toUpperCase()} · {activeCluster.specCode}
              </span>
            </div>

            {/* Visual Frame */}
            <div className="w-console__visual-frame">
              <OptimizedImage
                webpSrc={activeCluster.bgWebp}
                fallbackSrc={activeCluster.bgFallback}
                alt={`${activeItem.name} architecture visual`}
                className="w-console__visual-img"
              />
              <div className="w-console__visual-scrim" aria-hidden="true" />

              {/* Aerospace Corner HUD Reticles */}
              <div className="w-console__hud-corner w-console__hud-corner--tl" aria-hidden="true" />
              <div className="w-console__hud-corner w-console__hud-corner--tr" aria-hidden="true" />
              <div className="w-console__hud-corner w-console__hud-corner--bl" aria-hidden="true" />
              <div className="w-console__hud-corner w-console__hud-corner--br" aria-hidden="true" />

              <div className="w-console__visual-overlay">
                <span className="w-console__deliverable-badge">
                  DELIVERABLE: {activeItem.deliverable.toUpperCase()}
                </span>
                <span className="w-console__visual-cluster-name">
                  {activeCluster.cluster.toUpperCase()}
                </span>
              </div>
            </div>

            {/* In-Depth Capability Details */}
            <div className="w-console__monitor-body">
              <div className="w-console__title-wrap">
                <span className="telemetry-kicker">SELECTED CAPABILITY</span>
                <h3 className="w-console__item-title">{activeItem.name}</h3>
              </div>

              <p className="w-console__item-detail">{activeItem.detail}</p>

              {/* Technology Stack & Pipeline Tags */}
              <div className="w-console__tech-section">
                <span className="w-console__tech-title">
                  <Terminal size={12} aria-hidden="true" style={{ color: 'var(--accent-ice)' }} />
                  ARCHITECTURE &amp; DELIVERY SPEC
                </span>
                <div className="w-console__tech-tags">
                  {techTags.map((tag) => (
                    <span key={tag} className="w-console__tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric Highlights if present in cluster */}
              {activeCluster.mockupMetrics && activeCluster.mockupMetrics.length > 0 && (
                <div className="w-console__metrics-grid">
                  {activeCluster.mockupMetrics.slice(0, 3).map((metric) => (
                    <div key={metric.label} className="w-console__metric-item">
                      <span className="w-console__metric-label">{metric.label}</span>
                      <span className="w-console__metric-value">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions Footer */}
              <div className="w-console__action-row">
                <button
                  type="button"
                  className="btn-primary w-console__enquire-btn"
                  onClick={handleInitiateEnquiry}
                >
                  <span>ENQUIRE: {activeItem.name.toUpperCase()}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-console__whatsapp-btn"
                  aria-label={`Discuss ${activeItem.name} with WONTWE on WhatsApp`}
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Category Tabs & Capability Selector */}
          <div className="w-console__controls">
            {/* Category Tabs (Like Photography & Video vs Motion in screenshot) */}
            <div className="w-console__category-section">
              <div className="w-console__category-header">
                <span className="telemetry-kicker">01 // SELECT PRACTICE AREA</span>
                <span className="w-world__env-name">
                  {activeDivision.clusters.length} PRACTICE AREAS
                </span>
              </div>

              <div
                className="w-console__category-tabs"
                role="tablist"
                aria-label={`${activeDivision.name} Practice Areas`}
              >
                {activeDivision.clusters.map((cluster, idx) => {
                  const isActive = idx === clusterIdx;
                  return (
                    <button
                      key={cluster.specCode}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      className={`w-console__cat-tab ${
                        isActive ? 'w-console__cat-tab--active' : ''
                      }`}
                      onClick={() => handleSelectCluster(idx)}
                      onKeyDown={(e) =>
                        handleTablistKeyDown(
                          e,
                          idx,
                          activeDivision.clusters.length,
                          handleSelectCluster
                        )
                      }
                    >
                      <span>{cluster.cluster}</span>
                      <span className="w-console__cat-tab-badge">{cluster.items.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Capability Pills (Like Video Editing, Motion Graphics in screenshot) */}
            <div className="w-console__pills-section">
              <div className="w-console__pills-header">
                <div>
                  <span className="telemetry-kicker">02 // SELECT CAPABILITY TO REFLECT DETAILS</span>
                  <h4 className="w-console__pills-title">
                    {activeCluster.headline || activeCluster.cluster}
                  </h4>
                </div>
                <span className="w-console__pills-summary">{activeCluster.summary}</span>
              </div>

              <div
                className="w-console__pills-grid"
                role="listbox"
                aria-label={`${activeCluster.cluster} capabilities`}
              >
                {activeCluster.items.map((item, idx) => {
                  const isSelected = idx === itemIdx;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`w-console__pill ${
                        isSelected ? 'w-console__pill--active' : ''
                      }`}
                      onClick={() => handleSelectItem(idx)}
                    >
                      <span className="w-console__pill-name">{item.name}</span>
                      {isSelected ? (
                        <CheckCircle2
                          size={14}
                          className="w-console__pill-check"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpRight
                          size={13}
                          className="w-console__pill-arrow"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Practice Area Summary Card */}
            <div className="w-console__summary-box">
              <div className="w-console__summary-row">
                <span className="w-console__summary-kicker">
                  {activeDivision.name.toUpperCase()} // PRACTICE SCOPE
                </span>
                <span className="w-console__summary-count">
                  {activeCluster.items.length} CAPABILITIES AVAILABLE
                </span>
              </div>
              <p className="w-console__summary-text">
                {activeDivision.description}
              </p>
              <div className="w-console__summary-hint">
                <span>💡 Tip:</span> Clicking any pill above dynamically updates the architecture monitor on the left. To contact our engineers directly about this service, click the purple &ldquo;Enquire&rdquo; button.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
