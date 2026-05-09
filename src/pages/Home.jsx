import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Wifi, LayoutDashboard, Brain, Bell, ChevronRight,
  Factory, Droplets, Flame, TrendingUp, ArrowRight, Shield
} from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';
import AnimatedSection from '../components/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="stat-number">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Feature cards data ───────────────────────────────────────────────────────
const features = [
  {
    id: 'iot',
    icon: Wifi,
    title: 'IoT Sensor Network',
    short: 'Real-time data from vibration, temperature & pressure sensors',
    detail: 'Our edge-deployed sensor nodes collect over 1,000 data points per second across vibration (3-axis), temperature, pressure, and flow rate. Data is edge-filtered and streamed to the cloud with sub-100ms latency.',
    metric: '1,000+ data pts/sec',
    color: '#00D4FF',
    chart: [40, 42, 38, 55, 43, 40, 44, 60, 42, 41],
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: 'Cloud Dashboard',
    short: 'Live monitoring across all your pumps from a single screen',
    detail: 'A unified operations centre showing real-time health scores, trend charts, and maintenance schedules for every pump in your facility. Role-based access for operators, engineers, and executives.',
    metric: '< 2s data refresh',
    color: '#7C3AED',
    chart: [30, 45, 35, 50, 40, 55, 45, 60, 50, 65],
  },
  {
    id: 'anomaly',
    icon: Brain,
    title: 'Anomaly Detection',
    short: 'ML models trained to catch micro-deviations before they escalate',
    detail: 'Trained on 50,000+ hours of pump operational data, our LSTM + Isolation Forest pipeline detects deviation signatures as small as 0.2σ — flagging developing faults up to 30 days before failure.',
    metric: '99.1% detection accuracy',
    color: '#F59E0B',
    chart: [42, 43, 41, 42, 44, 80, 95, 43, 42, 40],
  },
  {
    id: 'alerts',
    icon: Bell,
    title: 'Instant Alerts',
    short: 'SMS / email alerts reach your team in under 60 seconds',
    detail: 'Multi-channel notification engine dispatches graded alerts — P1 critical faults trigger simultaneous SMS, email, and in-app push. Escalation trees ensure the right person is always reachable.',
    metric: '< 60s alert delivery',
    color: '#10B981',
    chart: [20, 22, 21, 23, 20, 22, 21, 20, 22, 21],
  },
];

// ─── Mini spark chart ─────────────────────────────────────────────────────────
/*function SparkChart({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 60; const w = 200;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 60 }}>
      <polyline fill="none" stroke={color} strokeWidth="2.5" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      <polyline
        fill={`${color}20`}
        stroke="none"
        points={`0,${h} ${pts} ${w},${h}`}
      />
    </svg>
  );
}*/

// ─── Horizontal scroll feature section ───────────────────────────────────────
function FeaturesSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#060E1A]"
      style={{ minHeight: isMobile ? 'auto' : '100vh' }}
    >
      {/* Section label */}
      <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
        <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold" style={{ fontFamily: 'Space Grotesk' }}>
          The Four Pillars
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: 'Space Grotesk' }}>
          How PumpGuardX Protects You
        </h2>
        {!isMobile && (
          <p className="text-[#8B9DB0] mt-2 text-sm" style={{ fontFamily: 'Inter' }}>
            Scroll to explore →
          </p>
        )}
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className={`flex ${isMobile ? 'flex-col gap-6 px-6 pt-32 pb-16' : 'items-center gap-6 px-[10vw]'}`}
        style={isMobile ? {} : { paddingTop: '10vh', width: 'max-content', height: '100vh' }}
      >
        {features.map((f, i) => {
          const Icon = f.icon;
          const isExpanded = expanded === f.id;
          return (
            <motion.div
              key={f.id}
              layout
              className="glass-card rounded-2xl cursor-pointer relative overflow-hidden flex-shrink-0"
              style={{
                width: isMobile ? '100%' : isExpanded ? '40vw' : 320,
                height: isMobile ? 'auto' : isExpanded ? '70vh' : 380,
                border: `1px solid ${isExpanded ? f.color + '60' : 'rgba(0,212,255,0.15)'}`,
                transition: 'border-color 0.3s ease',
              }}
              animate={{
                boxShadow: isExpanded
                  ? `0 0 60px ${f.color}30, 0 0 120px ${f.color}10`
                  : '0 0 0px transparent',
              }}
              onClick={() => setExpanded(isExpanded ? null : f.id)}
              whileHover={!isExpanded ? { y: -8, boxShadow: `0 20px 60px ${f.color}20` } : {}}
            >
              {/* Card BG gradient */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(ellipse at top left, ${f.color}40 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}
                >
                  <Icon size={26} style={{ color: f.color }} />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {f.title}
                </h3>

                {/* Short desc */}
                <p className="text-[#8B9DB0] text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter' }}>
                  {f.short}
                </p>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col"
                    >
                      <p className="text-[#F0F4F8]/80 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter' }}>
                        {f.detail}
                      </p>
                      <div className="mt-auto">                   
                        <div
                          className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold inline-block"
                          style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}
                        >
                          {f.metric}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand hint */}
                {!isExpanded && (
                  <div className="mt-auto flex items-center gap-2 text-xs text-[#8B9DB0]">
                    <span style={{ color: f.color }}>Click to expand</span>
                    <ChevronRight size={14} style={{ color: f.color }} />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── PdM Comparison section ───────────────────────────────────────────────────
const maintenanceTypes = [
  {
    label: 'Reactive', subtitle: '"Fix it when it breaks"',
    color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)',
    cost: 'Very High', downtime: 'Severe', effort: 'Crisis-driven',
    bar: 95,
  },
  {
    label: 'Preventive', subtitle: '"Fix it on schedule"',
    color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)',
    cost: 'Medium', downtime: 'Moderate', effort: 'Wasted effort',
    bar: 55,
  },
  {
    label: 'Predictive', subtitle: '"Fix it before it breaks"',
    color: '#00D4FF', bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.3)',
    cost: 'Low', downtime: 'Near-Zero', effort: 'Optimised',
    bar: 15,
  },
];

function PdMSection() {
  return (
    <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,212,255,0.03)] to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">
            Understanding Maintenance
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Not All Maintenance is Equal
          </h2>
          <p className="text-[#8B9DB0] max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
            The strategy you choose directly determines how much unplanned downtime costs your operation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {maintenanceTypes.map((m, i) => (
            <AnimatedSection key={m.label} delay={i * 0.15}>
              <div
                className="rounded-2xl p-8 h-full"
                style={{ background: m.bg, border: `1px solid ${m.border}` }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: m.color, fontFamily: 'Space Grotesk' }}>
                    {m.label}
                  </h3>
                  <p className="text-[#8B9DB0] text-sm italic">{m.subtitle}</p>
                </div>

                {/* Cost bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-[#8B9DB0] mb-2">
                    <span>Total Cost Impact</span>
                    <span style={{ color: m.color }}>{m.bar}%</span>
                  </div>
                  <div className="h-2 bg-[#0A1628] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.bar}%` }}
                      transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {[['Cost', m.cost], ['Downtime', m.downtime], ['Effort', m.effort]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-[#8B9DB0]">{k}</span>
                      <span className="font-semibold" style={{ color: m.color }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: 47.8, suffix: 'B', prefix: '$', label: 'PdM Market by 2029', sub: '35% CAGR' },
            { n: 75, suffix: '%', prefix: '', label: 'Reduction in Emergency Repairs', sub: 'Best-in-class PdM' },
            { n: 253, suffix: 'M', prefix: '$', label: 'Lost Annually Per Factory', sub: 'Without PdM' },
            { n: 7, suffix: 'x', prefix: '', label: 'ROI on PdM Investment', sub: 'McKinsey data' },
          ].map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 text-center">
                <div
                  className="text-3xl font-black mb-1 gradient-text"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  <Counter end={s.n} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="text-[#F0F4F8] text-sm font-semibold mb-1" style={{ fontFamily: 'Space Grotesk' }}>{s.label}</p>
                <p className="text-[#8B9DB0] text-xs">{s.sub}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it Works flow ────────────────────────────────────────────────────────
const flowSteps = [
  { icon: Wifi, label: 'Sensor', desc: 'IoT nodes collect vibration, temp & pressure' },
  { icon: TrendingUp, label: 'Edge Processing', desc: 'Local filtering reduces bandwidth 10×' },
  { icon: LayoutDashboard, label: 'Cloud Upload', desc: 'Encrypted MQTT stream to cloud' },
  { icon: Brain, label: 'AI Analysis', desc: 'LSTM models score anomaly probability' },
  { icon: Bell, label: 'Alert', desc: 'Multi-channel notification in < 60s' },
  { icon: Shield, label: 'Action', desc: 'Technician dispatched, failure averted' },
];

function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#060E1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">
            The Pipeline
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            From Sensor to Action in Minutes
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent" style={{ top: '2.5rem' }} />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {flowSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection key={s.label} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center group">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#0D1F3C] border-2 border-[rgba(0,212,255,0.2)] flex items-center justify-center mb-4 relative z-10"
                      whileHover={{
                        scale: 1.15,
                        borderColor: '#00D4FF',
                        boxShadow: '0 0 25px rgba(0,212,255,0.4)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={24} className="text-[#00D4FF]" />
                      <div className="absolute w-16 h-16 rounded-full border border-[#00D4FF] opacity-0 group-hover:opacity-40 scale-100 group-hover:scale-150 transition-all duration-700" />
                    </motion.div>
                    <span
                      className="text-sm font-bold text-white mb-1"
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {s.label}
                    </span>
                    <span className="text-xs text-[#8B9DB0] leading-relaxed" style={{ fontFamily: 'Inter' }}>
                      {s.desc}
                    </span>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Industries section ───────────────────────────────────────────────────────
const industries = [
  {
    icon: Factory,
    name: 'Heavy Manufacturing',
    desc: 'Continuous process plants where a single pump failure halts the line.',
    roi: '340%',
    saving: '$4.2M avg/year',
    color: '#00D4FF',
  },
  {
    icon: Flame,
    name: 'Oil & Gas',
    desc: 'Pipeline and refinery pumps operating 24/7 in hazardous conditions.',
    roi: '520%',
    saving: '$12.8M avg/year',
    color: '#F59E0B',
  },
  {
    icon: Droplets,
    name: 'Food & Beverage',
    desc: 'Sanitary process pumps where contamination risk compounds downtime.',
    roi: '280%',
    saving: '$2.1M avg/year',
    color: '#10B981',
  },
];

function IndustriesSection() {
  return (
    <section className="py-24 bg-[#0A1628] relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">
            Industry Applications
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Built for the World's Toughest Environments
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <AnimatedSection key={ind.name} delay={i * 0.15}>
                <motion.div
                  className="glass-card rounded-2xl p-8 h-full group cursor-default relative overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at top left, ${ind.color}08 0%, transparent 60%)` }}
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}
                  >
                    <Icon size={26} style={{ color: ind.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                    {ind.name}
                  </h3>
                  <p className="text-[#8B9DB0] text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter' }}>
                    {ind.desc}
                  </p>
                  <div className="flex gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <div>
                      <p className="text-2xl font-black" style={{ color: ind.color, fontFamily: 'Space Grotesk' }}>
                        {ind.roi}
                      </p>
                      <p className="text-xs text-[#8B9DB0]">Average ROI</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
                        {ind.saving}
                      </p>
                      <p className="text-xs text-[#8B9DB0]">Cost Savings</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#060E1A]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
      </div>
      <AnimatedSection className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>
          Ready to Stop Reacting and{' '}
          <span className="gradient-text">Start Predicting?</span>
        </h2>
        <p className="text-[#8B9DB0] text-lg mb-8" style={{ fontFamily: 'Inter' }}>
          Join the predictive revolution. See exactly what PumpGuardX can save your operation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pricing"
            className="btn-cyan px-8 py-4 text-base font-bold rounded-xl inline-flex items-center gap-2 relative z-10"
          >
            View Pricing <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 text-base font-semibold rounded-xl border border-[rgba(0,212,255,0.3)] text-[#00D4FF] hover:bg-[rgba(0,212,255,0.08)] transition-colors inline-flex items-center gap-2"
          >
            Get a Demo
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}

// ─── Hero section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const stats = [
    { n: 70, suffix: '%', label: 'Reduction in Unplanned Downtime' },
    { n: 253, suffix: 'M+', prefix: '$', label: 'Lost Annually Without PdM' },
    { n: 30, suffix: 'min', label: 'Advance Failure Warning' },
    { n: 99.2, suffix: '%', label: 'Sensor Uptime' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
      {/* Particle bg */}
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060E1A] via-transparent to-[#060E1A] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.05)] text-[#00D4FF] text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          Predict. Protect. Perform.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}
        >
          Your Pumps Never Sleep.
          <br />
          <span className="gradient-text">Neither Does PumpGuardX.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-[#8B9DB0] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: 'Inter' }}
        >
          AI-powered predictive maintenance that detects pump failures before they happen —
          saving factories millions in downtime.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#features"
            className="btn-cyan px-8 py-4 text-base font-bold rounded-xl inline-flex items-center justify-center gap-2 relative z-10"
          >
            See How It Works <ChevronRight size={18} />
          </a>
          <Link
            to="/about"
            className="px-8 py-4 text-base font-semibold rounded-xl border border-[rgba(255,255,255,0.12)] text-[#F0F4F8] hover:border-[rgba(0,212,255,0.3)] hover:text-[#00D4FF] transition-all inline-flex items-center justify-center gap-2"
          >
            Meet the Team
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-xl px-4 py-5 text-center">
              <div
                className="text-2xl md:text-3xl font-black text-[#00D4FF] mb-1"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <Counter end={s.n} suffix={s.suffix} prefix={s.prefix || ''} />
              </div>
              <p className="text-[#8B9DB0] text-xs leading-snug" style={{ fontFamily: 'Inter' }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#8B9DB0] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-10 bg-gradient-to-b from-[#00D4FF] to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <PdMSection />
      <HowItWorksSection />
      <IndustriesSection />
      <CTABanner />
    </main>
  );
}
