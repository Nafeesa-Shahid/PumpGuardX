import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Lightbulb, Cpu, Brain, Cloud, Wrench } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const team = [
  {
    name: 'Nafeesa Shahid',
    role: 'WEBSITE & DASHBOARD DEVELOPMENT',
    bio: 'Built the project website and interactive dashboard. Also involved in model testing and validation.',
    icon: Cpu,
    color: '#00D4FF',
    initials: 'NS',
  },
  {
    name: 'Zainab Awais',
    role: 'ML RESEARCH AND MARKETING',
    bio: 'Contributed to early-stage model experimentation and algorithm benchmarking. Manages content creation and collaboration.',
    icon: Brain,
    color: '#7C3AED',
    initials: 'ZA',
  },
  {
    name: 'Bilal Naseer',
    role: 'DATASET & ALERT SYSTEM',
    bio: 'Sourced and managed the dataset. Implemented the alerting system within the dashboard.',
    icon: Cloud,
    color: '#10B981',
    initials: 'BN',
  },
  {
    name: 'Nisar Akhtar',
    role: 'MODEL DEVELOPMENT & OPTIMIZATION',
    bio: 'Developed the anomaly detection model, experimented with multiple algorithms and finalized the hybrid approach.',
    icon: Wrench,
    color: '#F59E0B',
    initials: 'NA',
  },
];

const timeline = [
  { phase: 'Ideation', date: 'Oct 2025', desc: 'Problem identified in local factory visits. Research phase begins.' },
  { phase: 'Research', date: 'Dec 2025', desc: 'Literature review on PdM, IoT protocols, and ML fault detection.' },
  { phase: 'Prototype', date: 'Feb 2026', desc: 'End-to-end pipeline designed and simulated.' },
  { phase: 'Testing', date: 'March 2026', desc: 'Validated on public datasets & simulated pump failure scenarios.' },
  { phase: 'Launch', date: 'Apr 2026', desc: 'Model pipeline finalized. Dashboard ready. Awaiting real-world deployment.' },
];

export default function About() {
  return (
    <main className="bg-[#060E1A] pt-24">
      {/* ── Hero / Origin Story ─────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Industrial SVG background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 1440 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Simplified factory silhouette */}
            <rect x="0" y="400" width="1440" height="200" fill="#1E3A5F" />
            <rect x="100" y="300" width="200" height="300" fill="#122348" />
            <rect x="350" y="250" width="250" height="350" fill="#0D1F3C" />
            <rect x="650" y="200" width="180" height="400" fill="#122348" />
            <rect x="900" y="280" width="220" height="320" fill="#0D1F3C" />
            <rect x="1180" y="330" width="200" height="270" fill="#122348" />
            {/* Chimneys */}
            <rect x="150" y="220" width="30" height="80" fill="#1E3A5F" />
            <rect x="400" y="170" width="30" height="80" fill="#1E3A5F" />
            <rect x="700" y="140" width="25" height="60" fill="#1E3A5F" />
            <rect x="950" y="200" width="28" height="80" fill="#1E3A5F" />
            {/* Windows */}
            {[120,160,200,370,420,470,670,720,920,970,1200,1250].map((x,i)=>(
              <rect key={i} x={x} y={i%2===0?340:380} width="25" height="20" fill="rgba(0,212,255,0.3)" rx="2" />
            ))}
            {/* Pipes */}
            <line x1="0" y1="500" x2="1440" y2="500" stroke="#1E3A5F" strokeWidth="8" />
            <line x1="0" y1="520" x2="1440" y2="520" stroke="#0D1F3C" strokeWidth="5" />
          </svg>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #060E1A 0%, transparent 30%, transparent 70%, #060E1A 100%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-4 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
              It Started With<br />
              <span className="gradient-text">a Question.</span>
            </h1>
            <p className="text-[#8B9DB0] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'Inter' }}>
              Four univeristy students watched factories lose millions to surprise pump failures.
              They asked:{' '}
              <em className="text-[#F0F4F8] not-italic font-medium">
                "What if machines could warn us before breaking down?"
              </em>
              {' '}That question became PumpGuardX.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">
              The Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Built by Four, Powered by Purpose
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => {
              const Icon = member.icon;
              return (
                <AnimatedSection key={member.name} delay={i * 0.12}>
                  <motion.div
                    className="glass-card rounded-2xl p-8 text-center group relative overflow-hidden cursor-default h-full"
                    whileHover={{ y: -10, boxShadow: `0 20px 60px ${member.color}20` }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Gradient pulse background */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${member.color}10 0%, transparent 70%)` }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Animated border glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ border: `1px solid ${member.color}50`, borderRadius: '1rem' }}
                    />

                    {/* Avatar */}
                    <div className="relative mb-6">
                      <motion.div
                        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-bold relative"
                        style={{
                          background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
                          border: `2px solid ${member.color}40`,
                          color: member.color,
                          fontFamily: 'Space Grotesk',
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {member.initials}
                        {/* Slow gradient pulse ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ border: `2px solid ${member.color}` }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                        />
                      </motion.div>
                    </div>

                    <h3
                      className="text-lg font-bold text-white mb-1"
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {member.name}
                    </h3>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-3"
                      style={{ color: member.color, fontFamily: 'Space Grotesk' }}
                    >
                      {member.role}
                    </div>
                    <p className="text-[#8B9DB0] text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                      {member.bio}
                    </p>

                    {/* Role icon badge */}
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${member.color}15` }}
                    >
                      <Icon size={16} style={{ color: member.color }} />
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#060E1A] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <div className="w-16 h-16 rounded-2xl bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center mx-auto mb-8">
              <Target size={30} className="text-[#00D4FF]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              Our Mission
            </h2>
            <p className="text-xl text-[#F0F4F8]/80 leading-relaxed mb-6 italic" style={{ fontFamily: 'Inter' }}>
              "We believe predictive intelligence should be accessible to every factory —
              not just Fortune 500 companies."
            </p>
            <p className="text-[#8B9DB0] leading-relaxed" style={{ fontFamily: 'Inter' }}>
              PumpGuardX was designed from day one to be deployable with off-the-shelf sensors
              and cloud infrastructure any team can afford. We built the intelligence; you bring the pumps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-3 block">
              The Journey
            </span>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              From Idea to Implementation
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#00D4FF] via-[rgba(0,212,255,0.3)] to-transparent" />

            <div className="space-y-8 pl-12">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.phase} delay={i * 0.1} direction="left">
                  <div className="relative">
                    {/* Node */}
                    <div
                      className="absolute -left-[47px] top-1 w-6 h-6 rounded-full border-2 border-[#00D4FF] bg-[#060E1A] flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                    </div>

                    <div className="glass-card rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                          {item.phase}
                        </h3>
                        <span className="text-xs text-[#00D4FF] font-semibold bg-[rgba(0,212,255,0.08)] px-3 py-1 rounded-full">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-[#8B9DB0] text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FYP Badge ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#060E1A]">
        <AnimatedSection className="max-w-2xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-10 inline-block w-full">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award size={32} className="text-[#00D4FF]" />
              <span
                className="text-2xl font-black text-white"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                FYP 2026
              </span>
            </div>
            <p className="text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
              A Final Year Project — Built With Purpose
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Lightbulb size={16} className="text-[#F59E0B]" />
              <span className="text-[#F0F4F8] text-sm" style={{ fontFamily: 'Inter' }}>
                Institue of Business and Management · UET LAHORE · 2026
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
