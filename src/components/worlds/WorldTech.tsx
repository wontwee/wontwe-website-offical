import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { WORLDS } from '../../data/wontweData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, scrollToSection } from '../../utils/motion';
import { OptimizedImage } from '../OptimizedImage';
import './WorldsShared.css';
import './WorldTech.css';

interface WorldTechProps {
  onEnquireService?: (divisionName: string, serviceName: string) => void;
}

const techWorld = WORLDS[0];

export const WorldTech: React.FC<WorldTechProps> = ({ onEnquireService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const interfaceLayerRef = useRef<HTMLDivElement>(null);
  const physicalRef = useRef<HTMLDivElement>(null);
  const phaseFillRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [phaseLabel, setPhaseLabel] = useState('CLOUD & SERVER INFRASTRUCTURE');
  const [selectedClusterIdx, setSelectedClusterIdx] = useState(0);
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const reducedMotion = useReducedMotion();

  const activeCluster = techWorld.clusters[selectedClusterIdx] ?? techWorld.clusters[0];
  const activeService = activeCluster.items[selectedServiceIdx] ?? activeCluster.items[0];

  const handleSelectCluster = (idx: number) => {
    setSelectedClusterIdx(idx);
    setSelectedServiceIdx(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let t = 0;

    interface Node {
      x: number;
      y: number;
      tier: number;
    }

    let nodes: Node[] = [];

    const buildTopology = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const cols = width > 900 ? 6 : 4;
      const rows = 4;
      const startX = width * 0.46;
      const spanX = width * 0.48;
      const startY = height * 0.2;
      const spanY = height * 0.6;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: startX + (c / Math.max(1, cols - 1)) * spanX,
            y: startY + (r / Math.max(1, rows - 1)) * spanY,
            tier: (r + c) % 2,
          });
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(245, 247, 250, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (Math.hypot(b.x - a.x, b.y - a.y) < 190) {
            ctx.strokeStyle = 'rgba(168, 107, 255, 0.18)';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.6);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.4 + pulse * 1.1, 0, Math.PI * 2);
        ctx.fillStyle =
          n.tier === 0 ? `rgba(168, 107, 255, ${0.45 + pulse * 0.42})` : `rgba(245, 247, 250, ${0.35 + pulse * 0.35})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        t += 0.015;
        animId = requestAnimationFrame(drawFrame);
      }
    };

    buildTopology();
    drawFrame();

    window.addEventListener('resize', buildTopology);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', buildTopology);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !runwayRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        interfaceLayerRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: runwayRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            onUpdate: (self) => {
              const p = self.progress;
              if (phaseFillRef.current) {
                phaseFillRef.current.style.transform = `scaleX(${Math.max(0.12, p)})`;
              }
              if (p < 0.35) {
                setPhaseLabel('CLOUD & SERVER INFRASTRUCTURE');
              } else if (p < 0.7) {
                setPhaseLabel('API & DATA FLOW TOPOLOGY');
              } else {
                setPhaseLabel('SOFTWARE & AI ARCHITECTURE');
              }
            },
          },
        }
      );

      gsap.to(physicalRef.current, {
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: runwayRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      id="world-tech"
      ref={sectionRef}
      className="w-world w-tech"
      aria-labelledby="tech-heading"
    >
      {/* Part 1: Full-Viewport Technology Scene */}
      <div ref={runwayRef} className="w-tech__runway">
        <div className="w-tech__sticky">
          <div ref={physicalRef} className="w-tech__physical-layer" aria-hidden="true">
            <OptimizedImage
              webpSrc="/images/world-tech-lab.webp"
              fallbackSrc="/images/world-tech-lab.jpg"
              alt=""
              className="w-tech__lab-img"
            />
          </div>

          <div ref={interfaceLayerRef} className="w-tech__interface-layer" aria-hidden="true">
            <OptimizedImage
              webpSrc="/images/exp-tech.webp"
              fallbackSrc="/images/exp-tech.jpg"
              alt=""
              className="w-tech__interface-img"
            />
            <canvas ref={canvasRef} className="w-tech__schematic-canvas" />
          </div>

          <div className="w-tech__scrim" aria-hidden="true" />

          <div className="w-container">
            <div className="w-tech__stage-content">
              <div className="w-world__header-meta">
                <span className="w-world__index-badge">
                  <span>{techWorld.index}</span>
                  <span>—</span>
                  <span>{techWorld.name.toUpperCase()}</span>
                </span>
                <span className="w-world__env-name">{techWorld.tier}</span>
              </div>

              <div className="w-tech__phase-meter" aria-hidden="true">
                <div className="w-tech__phase-bar">
                  <div ref={phaseFillRef} className="w-tech__phase-fill" />
                </div>
                <span>{phaseLabel}</span>
              </div>

              <h2 id="tech-heading" className="headline-world">
                {techWorld.headline}
              </h2>

              <p className="text-lead" style={{ maxWidth: '48ch', color: 'rgba(245, 247, 250, 0.86)' }}>
                {techWorld.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Technology Capability Explorer */}
      <div className="w-tech__explorer">
        <div className="w-container">
          <div className="w-tech__explorer-head">
            <div>
              <span className="telemetry-kicker">INTERACTIVE CAPABILITY EXPLORER</span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginTop: '0.65rem',
                }}
              >
                WONTWE Tech Architecture
              </h3>
            </div>
            <span className="w-world__env-name">SELECT A PRACTICE AREA &amp; CAPABILITY</span>
          </div>

          {/* 5 Interactive Category Tabs */}
          <div className="w-tech__category-bar" role="tablist" aria-label="WONTWE Tech Categories">
            {techWorld.clusters.map((cluster, idx) => {
              const isSelected = idx === selectedClusterIdx;
              return (
                <button
                  key={cluster.specCode}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`w-tech__cat-btn ${isSelected ? 'w-tech__cat-btn--active' : ''}`}
                  onClick={() => handleSelectCluster(idx)}
                >
                  <span className="w-tech__cat-code">{cluster.specCode}</span>
                  <span className="w-tech__cat-name">{cluster.cluster}</span>
                  <span className="w-tech__cat-count">{cluster.items.length} Capabilities</span>
                </button>
              );
            })}
          </div>

          {/* Immersive Dynamic Capability Stage */}
          <div className="w-tech__interactive-stage" role="tabpanel" aria-live="polite">
            <div className="w-tech__stage-bg" aria-hidden="true">
              <OptimizedImage
                webpSrc={activeCluster.bgWebp}
                fallbackSrc={activeCluster.bgFallback}
                alt=""
                className="w-tech__stage-bg-img"
              />
            </div>
            <div className="w-tech__stage-scrim" aria-hidden="true" />

            <div className="w-tech__stage-grid">
              {/* Left: Service Selector Pills */}
              <div className="w-tech__selector-col">
                <div>
                  <span className="telemetry-kicker">{activeCluster.cluster}</span>
                  <h4 className="w-tech__cat-headline" style={{ marginTop: '0.65rem' }}>
                    {activeCluster.headline}
                  </h4>
                  <p className="text-lead" style={{ fontSize: '0.96rem', marginTop: '0.55rem' }}>
                    {activeCluster.summary}
                  </p>
                </div>

                <div className="w-tech__service-chips" role="listbox" aria-label={activeCluster.cluster}>
                  {activeCluster.items.map((service, idx) => {
                    const isFocused = idx === selectedServiceIdx;
                    return (
                      <button
                        key={service.name}
                        type="button"
                        role="option"
                        aria-selected={isFocused}
                        className={`w-tech__service-chip ${
                          isFocused ? 'w-tech__service-chip--active' : ''
                        }`}
                        onClick={() => setSelectedServiceIdx(idx)}
                      >
                        <span>{service.name}</span>
                        <ChevronRight size={14} style={{ flexShrink: 0, color: 'var(--accent-ice)' }} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Product UI Mockup + Selected Capability Focus */}
              <div className="w-tech__mockup-col">
                <div className="w-tech__mockup-window">
                  <div className="w-tech__mockup-bar">
                    <span>{activeCluster.mockupTitle}</span>
                    <span>{activeCluster.specCode}</span>
                  </div>

                  <div className="w-tech__mockup-body">
                    <div className="w-tech__mockup-metrics">
                      {activeCluster.mockupMetrics.map((m) => (
                        <div key={m.label} className="w-tech__metric-box">
                          <span className="w-tech__metric-label">{m.label}</span>
                          <span className="w-tech__metric-val">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="w-tech__mockup-flow">
                      {activeCluster.mockupPipeline.map((step, idx) => (
                        <div
                          key={step}
                          className={`w-tech__flow-pill ${
                            idx === activeCluster.mockupPipeline.length - 1
                              ? 'w-tech__flow-pill--end'
                              : ''
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Capability Spotlight & Direct Enquiry Action */}
                <div className="w-tech__spotlight">
                  <div className="w-tech__spotlight-top">
                    <h5
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {activeService.name}
                    </h5>
                    <span className="w-tech__deliverable-tag">
                      <CheckCircle2
                        size={13}
                        style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px' }}
                        aria-hidden="true"
                      />
                      {activeService.deliverable}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                    {activeService.detail}
                  </p>

                  <button
                    type="button"
                    className="btn-primary"
                    style={{ width: 'fit-content', padding: '0.72rem 1.4rem', fontSize: '0.74rem' }}
                    onClick={() => {
                      onEnquireService?.(techWorld.name, activeService.name);
                      scrollToSection('contact');
                    }}
                  >
                    <span>ENQUIRE ABOUT {activeService.name.toUpperCase()}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
