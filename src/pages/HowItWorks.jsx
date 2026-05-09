import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, Thermometer, Gauge, Activity, ArrowRight,
  Cloud, Brain, Bell, Smartphone, Mail, CheckCircle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import AnimatedSection from '../components/AnimatedSection';

// ─── Sensor Layer ─────────────────────────────────────────────────────────────
const sensors = [
  { icon: Activity, name: 'Vibration', unit: '3-axis, 0–10 kHz', detects: 'Bearing wear, imbalance, misalignment', color: '#00D4FF', pulse: 1.0 },
  { icon: Thermometer, name: 'Temperature', unit: '−40 to +200°C', detects: 'Overheating, lubrication failure', color: '#F59E0B', pulse: 1.4 },
  { icon: Gauge, name: 'Pressure', unit: '0–400 bar', detects: 'Cavitation, seal failure, blockages', color: '#7C3AED', pulse: 0.8 },
  { icon: Wifi, name: 'Flow Rate', unit: '0–5,000 L/min', detects: 'Impeller wear, pipe leaks', color: '#10B981', pulse: 1.2 },
];

function SensorSection() {
  const [active, setActive] = useState(null);
  return (
    <section className="py-24 bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Layer 1</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            The Sensor Layer
          </h2>
          <p className="text-[#8B9DB0] max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Four sensor modalities, one unified node. Hover each sensor to see what failures it catches.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sensors.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <AnimatedSection key={s.name} delay={i * 0.1}>
                <motion.div
                  className="glass-card rounded-2xl p-6 text-center cursor-pointer relative overflow-hidden"
                  onHoverStart={() => setActive(i)}
                  onHoverEnd={() => setActive(null)}
                  whileHover={{ y: -6, boxShadow: `0 20px 50px ${s.color}25` }}
                  style={{ border: `1px solid ${isActive ? s.color + '50' : 'rgba(0,212,255,0.12)'}` }}
                >
                  <div className="relative flex justify-center mb-6">
                    {/* Pulse rings */}
                    {isActive && [1, 2, 3].map((r) => (
                      <motion.div
                        key={r}
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${s.color}`, margin: 'auto', width: 56, height: 56 }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1 + r * 0.4, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: s.pulse * 1.2, delay: r * s.pulse * 0.3 }}
                      />
                    ))}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                      style={{ background: `${s.color}15`, border: `2px solid ${s.color}40` }}
                    >
                      <Icon size={24} style={{ color: s.color }} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>{s.name}</h3>
                  <p className="text-xs text-[#8B9DB0] mb-3" style={{ fontFamily: 'Inter' }}>{s.unit}</p>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="text-xs p-3 rounded-lg mt-2" style={{ background: `${s.color}10`, color: s.color }}>
                      <span className="font-semibold">Detects: </span>{s.detects}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Data Pipeline ────────────────────────────────────────────────────────────
const pipelineStages = [
  { label: 'Edge Node', sub: 'Sensor board\non the pump', icon: Wifi, color: '#00D4FF' },
  { label: 'Edge Filter', sub: 'Preprocessing + outlier\nremoval', icon: Activity, color: '#7C3AED' },
  { label: 'MQTT Broker', sub: 'Encrypted\nstream upload', icon: Cloud, color: '#10B981' },
  { label: 'AI Engine', sub: 'LSTM anomaly\nscoring', icon: Brain, color: '#F59E0B' },
  { label: 'Dashboard', sub: 'Real-time\noperations view', icon: Gauge, color: '#00D4FF' },
];

function PipelineSection() {
  return (
    <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Layer 2</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            The Data Pipeline
          </h2>
          <p className="text-[#8B9DB0] max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            From raw signal to actionable insight — every stage optimised for reliability and speed.
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center items-center gap-0">
          {pipelineStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <React.Fragment key={stage.label}>
                <AnimatedSection delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center w-32 md:w-40">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                      style={{
                        background: `${stage.color}15`,
                        border: `1px solid ${stage.color}40`,
                      }}
                      whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${stage.color}40` }}
                    >
                      <Icon size={26} style={{ color: stage.color }} />
                    </motion.div>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{stage.label}</p>
                    <p className="text-[10px] text-[#8B9DB0] mt-1 leading-tight whitespace-pre-line" style={{ fontFamily: 'Inter' }}>{stage.sub}</p>
                  </div>
                </AnimatedSection>
                {i < pipelineStages.length - 1 && (
                  <AnimatedSection delay={i * 0.12 + 0.06}>
                    <div className="hidden sm:block mx-1 md:mx-2">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      >
                        <ArrowRight size={20} className="text-[rgba(0,212,255,0.3)]" />
                      </motion.div>
                    </div>
                  </AnimatedSection>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Mockup ──────────────────────────────────────────────────────────
const pumpHealth = [
  { id: 'P-001', name: 'Feed Pump A', health: 94, status: 'Healthy', color: '#10B981' },
  { id: 'P-002', name: 'Circulation B', health: 71, status: 'Watch', color: '#F59E0B' },
  { id: 'P-003', name: 'Transfer C', health: 38, status: 'Warning', color: '#EF4444' },
  { id: 'P-004', name: 'Booster D', health: 88, status: 'Healthy', color: '#10B981' },
];

function DashboardMockup() {
  return (
    <section className="py-24 bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Layer 3</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            The Cloud Dashboard
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Mock top bar */}
            <div className="bg-[#0D1F3C] border-b border-[rgba(0,212,255,0.1)] px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs text-[#8B9DB0] ml-3 font-mono">PumpGuardX Dashboard · Live</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs text-[#10B981]">All Systems Online</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pump health list */}
              <div className="lg:col-span-1">
                <h4 className="text-sm font-bold text-[#8B9DB0] uppercase tracking-widest mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                  Pump Status
                </h4>
                <div className="space-y-3">
                  {pumpHealth.map((p) => (
                    <div key={p.id} className="bg-[#0D1F3C] rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Space Grotesk' }}>{p.name}</p>
                          <p className="text-[#8B9DB0] text-xs">{p.id}</p>
                        </div>
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-md"
                          style={{ background: `${p.color}20`, color: p.color }}
                        >
                          {p.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-[#060E1A] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: p.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${p.health}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <span className="text-xs font-bold" style={{ color: p.color }}>{p.health}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend chart */}
              <div className="lg:col-span-2">
                <h4 className="text-sm font-bold text-[#8B9DB0] uppercase tracking-widest mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                  Vibration Trend · Feed Pump A (72h)
                </h4>
                <AnomalyChart />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Anomaly Chart ─────────────────────────────────────────────────────────────
function generateData() {
  const data = [];
  for (let i = 0; i < 72; i++) {
    const base = 42 + Math.sin(i * 0.3) * 3;
    const noise = (Math.random() - 0.5) * 4;
    const spike = i >= 58 && i <= 62 ? (i - 57) * 14 : 0;
    data.push({ hour: i, value: parseFloat((base + noise + spike).toFixed(2)), upper: 55, lower: 30 });
  }
  return data;
}
const anomalyData = generateData();

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const isAnomaly = payload[0].value > 55;
  return (
    <div className="glass-card rounded-lg px-3 py-2 text-xs" style={{ fontFamily: 'Inter' }}>
      <p className="text-[#8B9DB0]">Hour {label}</p>
      <p style={{ color: isAnomaly ? '#EF4444' : '#00D4FF' }}>
        {payload[0].value} mm/s {isAnomaly ? '⚠ ANOMALY' : ''}
      </p>
    </div>
  );
};

function AnomalyChart() {
  return (
    <div className="bg-[#0D1F3C] rounded-xl p-4 h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={anomalyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <defs>
            <linearGradient id="vibGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="hour" tick={{ fill: '#8B9DB0', fontSize: 10 }} tickLine={false} />
          <YAxis tick={{ fill: '#8B9DB0', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={55} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'Threshold', fill: '#EF4444', fontSize: 10 }} />
          <ReferenceLine y={30} stroke="rgba(0,212,255,0.2)" strokeDasharray="4 4" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00D4FF"
            strokeWidth={2}
            fill="url(#vibGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#00D4FF' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Alerts Section ────────────────────────────────────────────────────────────
function AlertsSection() {
  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">Layer 4</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            The Alerts System
          </h2>
          <p className="text-[#8B9DB0] max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            The right person, the right channel, the right moment — always in under 60 seconds.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* SMS Preview */}
          <AnimatedSection direction="left">
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-semibold text-[#8B9DB0] uppercase tracking-widest mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                <Smartphone size={14} className="inline mr-2 text-[#00D4FF]" />
                SMS Alert
              </h4>
              <div className="w-64 bg-[#1a1a2e] rounded-[2rem] p-3 border border-[rgba(255,255,255,0.08)] shadow-2xl">
                <div className="bg-[#0a0a1a] rounded-[1.5rem] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#00D4FF] flex items-center justify-center text-[#060E1A] text-xs font-bold">PG</div>
                    <div>
                      <p className="text-white text-xs font-bold">PumpGuardX</p>
                      <p className="text-[#8B9DB0] text-[10px]">Now</p>
                    </div>
                  </div>
                  <div className="bg-[#1E3A5F] rounded-xl rounded-tl-sm p-3">
                    <p className="text-[#EF4444] text-xs font-bold mb-1">⚠ CRITICAL ALERT</p>
                    <p className="text-white text-xs leading-relaxed">
                      Pump P-003 (Transfer C): Vibration anomaly detected. Score: 0.94. Estimated failure window: 48–72h. Immediate inspection recommended.
                    </p>
                    <p className="text-[#8B9DB0] text-[10px] mt-2">PumpGuardX · Reply STOP to unsubscribe</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Email Preview */}
          <AnimatedSection direction="right">
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-semibold text-[#8B9DB0] uppercase tracking-widest mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                <Mail size={14} className="inline mr-2 text-[#7C3AED]" />
                Email Alert
              </h4>
              <div className="w-full max-w-sm bg-[#0D1F3C] rounded-xl border border-[rgba(0,212,255,0.12)] overflow-hidden">
                <div className="bg-[#0A1628] px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
                  <p className="text-[10px] text-[#8B9DB0]">From: <span className="text-[#00D4FF]">alerts@pumpguardx.io</span></p>
                  <p className="text-[10px] text-[#8B9DB0]">Subject: <span className="text-white">⚠ [P1] Pump P-003 Anomaly Detected</span></p>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                    <span className="text-[#EF4444] text-xs font-bold">PRIORITY 1 — IMMEDIATE ACTION</span>
                  </div>
                  <p className="text-[#F0F4F8] text-xs mb-3 leading-relaxed">
                    The PumpGuardX AI engine has detected a vibration anomaly on <strong>Transfer Pump C (P-003)</strong>.
                  </p>
                  <div className="bg-[#060E1A] rounded-lg p-3 mb-3 space-y-1">
                    {[['Anomaly Score','0.94 / 1.00'],['Sensor','Vibration (X-axis)'],['Threshold','55 mm/s'],['Current','87.3 mm/s'],['ETA to Failure','48–72 hours']].map(([k,v])=>(
                      <div key={k} className="flex justify-between text-[10px]">
                        <span className="text-[#8B9DB0]">{k}</span>
                        <span className="text-white font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2 rounded-lg text-xs font-bold text-[#060E1A]" style={{ background: '#00D4FF' }}>
                    View Full Report →
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="max-w-2xl mx-auto mt-12">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Bell, label: '< 60s', sub: 'Alert delivery' },
              { icon: CheckCircle, label: '99.2%', sub: 'Delivery rate' },
              { icon: Smartphone, label: 'SMS + Email', sub: 'Dual-channel' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="glass-card rounded-xl p-4">
                <Icon size={20} className="text-[#00D4FF] mx-auto mb-2" />
                <p className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>{label}</p>
                <p className="text-[#8B9DB0] text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  return (
    <main className="bg-[#060E1A] pt-24">
      <div className="text-center py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-4 block">Technical Deep-Dive</span>
          <h1 className="text-5xl md:text-6xl font-black text-white" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
            How It <span className="gradient-text">Works</span>
          </h1>
          <p className="text-[#8B9DB0] text-xl max-w-2xl mx-auto mt-4 px-6" style={{ fontFamily: 'Inter' }}>
            Four layers of intelligence, working in harmony to protect your most critical assets.
          </p>
        </motion.div>
      </div>
      <SensorSection />
      <PipelineSection />
      <DashboardMockup />
      <AlertsSection />
    </main>
  );
}
