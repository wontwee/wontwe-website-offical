import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { DivisionId, WORLDS } from '../data/wontweData';
import { scrollToSection } from '../utils/motion';
import './CapabilitiesIndex.css';

interface CapabilitiesIndexProps {
  onEnquireService: (divisionName: string, serviceName?: string) => void;
}

export const CapabilitiesIndex: React.FC<CapabilitiesIndexProps> = ({ onEnquireService }) => {
  const [selectedDiv, setSelectedDiv] = useState<DivisionId>('tech');
  const [query, setQuery] = useState('');

  const totalCount = useMemo(
    () => WORLDS.reduce((acc, w) => acc + w.services.length, 0),
    []
  );

  const visibleServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return WORLDS.flatMap((w) =>
        w.services
          .filter((s) => s.name.toLowerCase().includes(q) || s.detail.toLowerCase().includes(q))
          .map((s) => ({ ...s, divisionName: w.name, divisionShort: w.shortName }))
      );
    }
    const current = WORLDS.find((w) => w.id === selectedDiv) ?? WORLDS[0];
    return current.services.map((s) => ({
      ...s,
      divisionName: current.name,
      divisionShort: current.shortName,
    }));
  }, [selectedDiv, query]);

  return (
    <section id="services" className="w-services" aria-labelledby="services-heading">
      <div className="w-container">
        <div className="w-services__top">
          <div>
            <span className="telemetry-kicker">CAPABILITY FINDER // {totalCount} SERVICES</span>
            <h2 id="services-heading" className="headline-section" style={{ marginTop: '0.75rem' }}>
              EXPLORE ALL CAPABILITIES
            </h2>
          </div>
          <span className="w-world__env-name">CLICK ANY CAPABILITY TO INITIATE AN ENQUIRY</span>
        </div>

        <div className="w-services__console">
          <div className="w-services__controls">
            <div className="w-services__filters" role="tablist" aria-label="Filter capabilities by division">
              {WORLDS.map((w) => {
                const isActive = !query.trim() && selectedDiv === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`w-services__filter-btn ${
                      isActive ? 'w-services__filter-btn--active' : ''
                    }`}
                    onClick={() => {
                      setQuery('');
                      setSelectedDiv(w.id);
                    }}
                  >
                    {w.shortName} ({w.services.length})
                  </button>
                );
              })}
            </div>

            <div className="w-services__search-wrap">
              <Search size={15} className="w-services__search-icon" aria-hidden="true" />
              <label htmlFor="capability-search" className="skip-link">
                Search all capabilities
              </label>
              <input
                id="capability-search"
                type="search"
                className="w-services__search-input"
                placeholder="Search across all 63 capabilities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {visibleServices.length === 0 ? (
            <div className="w-services__empty">
              No services matched &ldquo;{query}&rdquo;. Clear search to explore divisions.
            </div>
          ) : (
            <div className="w-services__tiles" role="tabpanel">
              {visibleServices.map((item) => (
                <button
                  key={`${item.divisionShort}-${item.name}`}
                  type="button"
                  className="w-services__tile"
                  title={item.detail}
                  onClick={() => {
                    onEnquireService(item.divisionName, item.name);
                    scrollToSection('contact');
                  }}
                >
                  <div>
                    <div className="w-services__tile-div">{item.divisionShort}</div>
                    <div>{item.name}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ flexShrink: 0, color: 'var(--accent-ice)' }} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
