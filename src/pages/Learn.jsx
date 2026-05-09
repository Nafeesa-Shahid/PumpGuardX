import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Thermometer, Gauge, Wifi, TrendingUp, DollarSign, AlertTriangle, Settings } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

// ─── What is PdM ──────────────────────────────────────────────────────────────
function WhatIsPdM() {
  return (
    <section className="py-24 bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Lesson 1</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            What is Predictive Maintenance?
          </h2>
          <p className="text-[#8B9DB0] max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Predictive Maintenance uses real-time sensor data and machine learning to forecast equipment failures
            before they occur — enabling maintenance only when actually needed.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedSection direction="left">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>
                The PdM Cycle
              </h3>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Collect', desc: 'Sensors continuously capture operational data', color: '#00D4FF' },
                  { step: '02', title: 'Analyse', desc: 'AI models identify patterns and anomalies', color: '#7C3AED' },
                  { step: '03', title: 'Predict', desc: 'Failure probability and time-to-failure estimated', color: '#F59E0B' },
                  { step: '04', title: 'Act', desc: 'Targeted maintenance scheduled just in time', color: '#10B981' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                      style={{ background: `${item.color}20`, color: item.color, fontFamily: 'Space Grotesk' }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="text-white font-semibold" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</p>
                      <p className="text-[#8B9DB0] text-sm" style={{ fontFamily: 'Inter' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Traditional Maintenance', sub: 'Reactive + Preventive', cost: 'High', waste: '30% unnecessary', color: '#EF4444' },
                { label: 'Predictive Maintenance', sub: 'Data-driven + Just-in-time', cost: '25–30% lower', waste: 'Near zero', color: '#00D4FF' },
              ].map((item) => (
                <div key={item.label}
                  className="rounded-2xl p-6 col-span-2 md:col-span-1"
                  style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}
                >
                  <h4 className="font-bold text-white mb-1 text-sm" style={{ fontFamily: 'Space Grotesk' }}>{item.label}</h4>
                  <p className="text-[#8B9DB0] text-xs mb-4">{item.sub}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8B9DB0]">Maintenance cost</span>
                      <span style={{ color: item.color }}>{item.cost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8B9DB0]">Wasted work</span>
                      <span style={{ color: item.color }}>{item.waste}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Why Pumps Fail ────────────────────────────────────────────────────────────
const failureModes = [
  {
    icon: Activity,
    name: 'Bearing Wear',
    desc: 'Gradual degradation of rolling element bearings causes increased vibration frequencies at characteristic fault frequencies.',
    sensor: 'Vibration (FFT)',
    color: '#00D4FF',
    frequency: '70% of failures',
  },
  {
    icon: Gauge,
    name: 'Cavitation',
    desc: 'Vapour bubble collapse creates intense localised pressure spikes that erode impeller blades and housing surfaces.',
    sensor: 'Pressure + Acoustics',
    color: '#EF4444',
    frequency: '12% of failures',
  },
  {
    icon: AlertTriangle,
    name: 'Seal Failure',
    desc: 'Progressive leakage path development leads to fluid loss, contamination, and ultimately catastrophic bearing failure.',
    sensor: 'Temperature + Vibration',
    color: '#F59E0B',
    frequency: '10% of failures',
  },
  {
    icon: Settings,
    name: 'Misalignment',
    desc: 'Shaft or coupling misalignment induces cyclical loading that accelerates wear across the entire drive train.',
    sensor: 'Vibration (2× run-speed)',
    color: '#7C3AED',
    frequency: '8% of failures',
  },
];

function WhyFailSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Lesson 2</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Why Do Pumps Fail?
          </h2>
          <p className="text-[#8B9DB0] max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Understanding root causes is the first step to prevention. Hover each mode to learn more.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {failureModes.map((f, i) => {
            const Icon = f.icon;
            const isHovered = hovered === i;
            return (
              <AnimatedSection key={f.name} delay={i * 0.1}>
                <motion.div
                  className="rounded-2xl p-6 h-full cursor-default relative overflow-hidden"
                  style={{
                    background: isHovered ? `${f.color}10` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHovered ? f.color + '50' : 'rgba(0,212,255,0.1)'}`,
                    transition: 'background 0.3s, border-color 0.3s',
                  }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -6 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>{f.name}</h3>
                  <p className="text-[#8B9DB0] text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter' }}>{f.desc}</p>
                  <div className="space-y-2 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8B9DB0]">Primary sensor</span>
                      <span style={{ color: f.color }} className="font-medium">{f.sensor}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8B9DB0]">Share of failures</span>
                      <span className="text-white font-bold">{f.frequency}</span>
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

// ─── Sensor Grid ──────────────────────────────────────────────────────────────
const sensorGrid = [
  { sensor: 'Vibration', icon: Activity, color: '#00D4FF', detects: ['Bearing wear', 'Imbalance', 'Misalignment', 'Looseness'] },
  { sensor: 'Temperature', icon: Thermometer, color: '#F59E0B', detects: ['Overheating', 'Lubrication failure', 'Seal friction', 'Electrical faults'] },
  { sensor: 'Pressure', icon: Gauge, color: '#7C3AED', detects: ['Cavitation', 'Blockages', 'Seal leakage', 'Impeller wear'] },
  { sensor: 'Flow Rate', icon: Wifi, color: '#10B981', detects: ['Impeller wear', 'Pipe leaks', 'Valve failures', 'Partial clog'] },
];

function SensorGridSection() {
  const [active, setActive] = useState(null);
  return (
    <section className="py-24 bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Lesson 3</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            What Sensors Detect What?
          </h2>
          <p className="text-[#8B9DB0] max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Click any sensor card to see the full list of failure modes it monitors.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {sensorGrid.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <AnimatedSection key={s.sensor} delay={i * 0.1}>
                <motion.button
                  className="w-full rounded-2xl p-5 text-left"
                  style={{
                    background: isActive ? `${s.color}15` : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${isActive ? s.color : 'rgba(0,212,255,0.1)'}`,
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onClick={() => setActive(isActive ? null : i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={26} style={{ color: s.color }} className="mb-3" />
                  <p className="text-white font-bold" style={{ fontFamily: 'Space Grotesk' }}>{s.sensor}</p>
                  <p className="text-[#8B9DB0] text-xs mt-1">Sensor</p>
                </motion.button>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-6"
              style={{
                background: `${sensorGrid[active].color}08`,
                border: `1px solid ${sensorGrid[active].color}30`,
              }}
            >
              <h4 className="font-bold mb-4" style={{ color: sensorGrid[active].color, fontFamily: 'Space Grotesk' }}>
                {sensorGrid[active].sensor} Sensor — Detected Failure Modes
              </h4>
              <div className="flex flex-wrap gap-3">
                {sensorGrid[active].detects.map((d) => (
                  <span
                    key={d}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: `${sensorGrid[active].color}15`,
                      color: sensorGrid[active].color,
                      border: `1px solid ${sensorGrid[active].color}30`,
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── ROI Calculator ────────────────────────────────────────────────────────────
function ROICalculator() {
  const [pumps, setPumps] = useState(20);
  const [downtimeCost, setDowntimeCost] = useState(5000);

  const savings = Math.round(pumps * downtimeCost * 0.7 * 50);
  const roi = savings > 0 ? Math.round((savings / (299 * 12)) * 100) : 0;

  return (
    <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Lesson 4</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            ROI Calculator
          </h2>
          <p className="text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
            See your estimated annual savings with PumpGuardX in seconds.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#8B9DB0] mb-3" style={{ fontFamily: 'Inter' }}>
                    Number of Pumps
                    <span className="ml-2 text-[#00D4FF] font-bold text-lg">{pumps}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={pumps}
                    onChange={(e) => setPumps(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #00D4FF ${pumps / 2}%, rgba(255,255,255,0.1) ${pumps / 2}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-[#8B9DB0] mt-1">
                    <span>1</span><span>200</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B9DB0] mb-3" style={{ fontFamily: 'Inter' }}>
                    Avg Downtime Cost / Hour
                    <span className="ml-2 text-[#00D4FF] font-bold text-lg">${downtimeCost.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={downtimeCost}
                    onChange={(e) => setDowntimeCost(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7C3AED ${(downtimeCost - 500) / 495}%, rgba(255,255,255,0.1) ${(downtimeCost - 500) / 495}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-[#8B9DB0] mt-1">
                    <span>$500</span><span>$50,000</span>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-[#8B9DB0] text-sm mb-2" style={{ fontFamily: 'Inter' }}>Estimated Annual Savings</p>
                <motion.div
                  key={savings}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl md:text-6xl font-black gradient-text mb-4"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  ${savings.toLocaleString()}
                </motion.div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="bg-[#0D1F3C] rounded-xl p-3">
                    <p className="text-[#00D4FF] text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                      {roi}%
                    </p>
                    <p className="text-[#8B9DB0] text-xs">Est. ROI</p>
                  </div>
                  <div className="bg-[#0D1F3C] rounded-xl p-3">
                    <p className="text-[#10B981] text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                      70%
                    </p>
                    <p className="text-[#8B9DB0] text-xs">Downtime Reduction</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-[#8B9DB0] border-t border-[rgba(255,255,255,0.05)] pt-4" style={{ fontFamily: 'Inter' }}>
              Formula: pumps × downtime_cost × 0.7 reduction × 50 avoided downtime-hours/year
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Industry Stats ────────────────────────────────────────────────────────────
const stats = [
  { value: '$47.8B', label: 'PdM Market by 2029', sub: '35% CAGR growth', color: '#00D4FF', icon: TrendingUp },
  { value: '70–75%', label: 'Emergency Repair Reduction', sub: 'Best-in-class PdM', color: '#10B981', icon: Activity },
  { value: '$253M', label: 'Lost Annually Per Factory', sub: 'Without PdM', color: '#EF4444', icon: DollarSign },
  { value: '$4–7', label: 'Return per $1 Invested', sub: 'McKinsey analysis', color: '#F59E0B', icon: TrendingUp },
];

function IndustryStats() {
  return (
    <section className="py-24 bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Lesson 5</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Industry Statistics
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <motion.div
                  className="glass-card rounded-2xl p-6 text-center h-full"
                  whileHover={{ y: -6, boxShadow: `0 20px 40px ${s.color}20` }}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                    <Icon size={22} style={{ color: s.color }} />
                  </div>
                  <div className="text-3xl font-black mb-2" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>
                    {s.value}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: 'Space Grotesk' }}>{s.label}</p>
                  <p className="text-[#8B9DB0] text-xs">{s.sub}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Learn() {
  return (
    <main className="bg-[#060E1A] pt-24">
      <div className="text-center py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.05)] text-[#00D4FF] text-xs font-semibold uppercase tracking-widest mb-6">
            PdM Academy
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
            Everything You Need to Know About{' '}
            <span className="gradient-text">Predictive Maintenance</span>
          </h1>
          <p className="text-[#8B9DB0] text-xl max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
            From first principles to ROI calculations — your complete guide to industrial PdM.
          </p>
        </motion.div>
      </div>
      <WhatIsPdM />
      <WhyFailSection />
      <SensorGridSection />
      <ROICalculator />
      <IndustryStats />
    </main>
  );
}
