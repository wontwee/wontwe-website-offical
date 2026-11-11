import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowRight, Cpu, Layers } from 'lucide-react';
import { BRAND_STATEMENTS, WORLDS } from '../data/wontweData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap, MOTION_EASE, scrollToSection } from '../utils/motion';
import { OptimizedImage } from './OptimizedImage';
import './HeroScene.css';

export const HeroScene: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;

    interface Stream {
      y: number;
      x: number;
      speed: number;
      len: number;
      alpha: number;
    }

    const streams: Stream[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    for (let i = 0; i < 6; i++) {
      streams.push({
        y: Math.round(((i + 1) / 7) * height),
        x: Math.random() * width,
        speed: 0.4 + Math.random() * 0.5,
        len: 90 + Math.random() * 140,
        alpha: 0.16 + Math.random() * 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(245, 247, 250, 0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 112) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (const s of streams) {
        s.x += s.speed;
        if (s.x > width + s.len) s.x = -s.len;

        const grad = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        grad.addColorStop(0, 'rgba(125, 24, 224, 0)');
        grad.addColorStop(1, `rgba(168, 107, 255, ${s.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.architectural } });

      tl.fromTo(mediaRef.current, { opacity: 0.4, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.25 })
        .fromTo(headlineRef.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.15)
        .fromTo(subRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, 0.32)
        .fromTo(actionsRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.44)
        .fromTo(clusterRef.current, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0.38);

      gsap.to(mediaRef.current, {
        yPercent: 9,
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className="w-hero" aria-label="WONTWE Hero Overview">
      <div ref={mediaRef} className="w-hero__media">
        <OptimizedImage
          webpSrc="/images/hero-tech-architecture.webp"
          fallbackSrc="/images/hero-tech-architecture.jpg"
          alt="WONTWE futuristic software architecture, floating glass system topologies, and enterprise cloud servers"
          className="w-hero__image"
          priority
        />
      </div>

      <canvas ref={canvasRef} className="w-hero__data-canvas" aria-hidden="true" />
      <div className="w-hero__scrim" aria-hidden="true" />

      <div className="w-container w-hero__top-bar" aria-hidden="true">
        <span>SOFTWARE ENGINEERING · AI &amp; AUTOMATION · CLOUD SYSTEMS</span>
        <span style={{ color: 'var(--accent-ice)' }}>WONTWE · {BRAND_STATEMENTS.tagline}</span>
      </div>

      <div className="w-container w-hero__stage">
        <div className="w-hero__headline-col">
          <div className="w-hero__tagline-pill">
            <span className="telemetry-kicker">TECHNOLOGY FIRST</span>
            <span className="w-hero__tagline-badge">
              Yes we <span className="w-hero__tagline-accent">Do.</span>
            </span>
          </div>

          <div className="w-hero__mask">
            <h1 ref={headlineRef} className="w-hero__headline">
              {BRAND_STATEMENTS.heroHeadline}
            </h1>
          </div>

          <p ref={subRef} className="w-hero__subtext">
            {BRAND_STATEMENTS.heroSub}
          </p>

          <div ref={actionsRef} className="w-hero__actions">
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

        {/* Floating Layered Interface Depth Elements */}
        <div ref={clusterRef} className="w-hero__floating-cluster">
          <button
            type="button"
            className="w-hero__hud-card"
            onClick={() => scrollToSection('world-tech')}
          >
            <div className="w-hero__hud-top">
              <span>PLATFORM LAYER // SAAS &amp; ERP</span>
              <Layers size={14} aria-hidden="true" />
            </div>
            <div className="w-hero__hud-title">Software &amp; Business Systems</div>
            <div className="w-hero__hud-bar" aria-hidden="true">
              <div className="w-hero__hud-fill" style={{ width: '92%' }} />
            </div>
          </button>

          <button
            type="button"
            className="w-hero__hud-card w-hero__hud-card--offset"
            onClick={() => scrollToSection('world-tech')}
          >
            <div className="w-hero__hud-top">
              <span>INTELLIGENCE // AI &amp; CLOUD OPS</span>
              <Cpu size={14} aria-hidden="true" />
            </div>
            <div className="w-hero__hud-title">AI Automation &amp; CI/CD Pipelines</div>
            <div className="w-hero__hud-bar" aria-hidden="true">
              <div className="w-hero__hud-fill" style={{ width: '86%' }} />
            </div>
          </button>
        </div>
      </div>

      <div className="w-container w-hero__footer-strip">
        <div className="w-hero__hierarchy-list" aria-label="WONTWE divisions">
          {WORLDS.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`w-hero__div-link ${w.id === 'tech' ? 'w-hero__div-link--primary' : ''}`}
              onClick={() => scrollToSection(`world-${w.id}`)}
            >
              <span style={{ color: 'var(--accent-ice)' }}>{w.index}</span>
              <span>{w.name}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="w-hero__scroll-cue"
          onClick={() => scrollToSection('about')}
        >
          <span>PRODUCT ECOSYSTEM</span>
          <ArrowDownRight size={14} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
