import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const plans = [
  {
    name: 'Monitor',
    tier: 'Starter',
    price: 'Free',
    sub: 'Academic / Demo Use',
    badge: 'FYP Demo',
    badgeColor: '#8B9DB0',
    icon: Star,
    color: '#8B9DB0',
    cta: 'Start Free',
    ctaLink: '/contact',
    popular: false,
    features: [
      'Up to 3 pumps monitored',
      'Basic cloud dashboard',
      'Email alerts',
      '7-day data history',
      'Community support',
      'PumpGuardX branding',
    ],
  },
  {
    name: 'Predict',
    tier: 'Professional',
    price: '$299',
    priceSub: '/month',
    sub: 'Growing operations',
    badge: 'Most Popular',
    badgeColor: '#00D4FF',
    icon: Zap,
    color: '#00D4FF',
    cta: 'Start Trial',
    ctaLink: '/contact',
    popular: true,
    features: [
      'Up to 50 pumps monitored',
      'Advanced ML anomaly detection',
      'SMS + Email alerts',
      '90-day data history',
      'REST API access',
      'Role-based access control',
      'Weekly health reports',
      'Priority email support',
    ],
  },
  {
    name: 'Dominate',
    tier: 'Enterprise',
    price: 'Custom',
    sub: 'Large-scale operations',
    badge: 'Full Power',
    badgeColor: '#F59E0B',
    icon: Crown,
    color: '#F59E0B',
    cta: 'Contact Us',
    ctaLink: '/contact',
    popular: false,
    features: [
      'Unlimited pumps',
      'Dedicated cloud instance',
      'On-premise deployment option',
      'Custom ML model training',
      'SLA guarantee (99.9% uptime)',
      '24/7 phone + email support',
      'Custom integrations (SCADA/ERP)',
      'Quarterly strategy reviews',
    ],
  },
];

const faqs = [
  {
    q: 'What sensors are compatible with PumpGuardX?',
    a: 'PumpGuardX works with any MEMS-based vibration sensor, PT100/PT1000 temperature sensors, and standard 4–20mA pressure transmitters. Our sensor node firmware supports MQTT and Modbus protocols out of the box.',
  },
  {
    q: 'How long does installation take?',
    a: 'A typical sensor installation on a single pump takes 30–60 minutes. The cloud dashboard is configured remotely by our team and is usually live within 24 hours of sensor activation.',
  },
  {
    q: 'What is the data refresh rate on the dashboard?',
    a: 'The Professional and Enterprise plans support sub-2-second data refresh. The Starter plan refreshes every 30 seconds.',
  },
  {
    q: 'Can PumpGuardX detect all types of pump failures?',
    a: 'PumpGuardX is a proof-of-concept system designed to demonstrate real-time monitoring for common pump operating anomalies. While it may not detect every possible failure mode, it focuses on identifying key indicators such as vibration or temperature irregularities. Future iterations can be extended to cover a wider range of failure types.',
  },
  {
    q: 'Is there a contract or can I cancel anytime?',
    a: 'The Professional plan is month-to-month with no lock-in. Enterprise contracts are typically 12–36 months with volume pricing. You can cancel anytime with 30 days notice.',
  },
  {
    q: 'Is the data stored securely?',
    a: 'All sensor data is encrypted in transit (TLS 1.3) and at rest (AES-256). Data is stored in ISO 27001-certified cloud infrastructure with geo-redundant backups.',
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className="text-sm font-semibold text-white pr-4"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} className="text-[#00D4FF]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-6 pb-5 text-sm text-[#8B9DB0] leading-relaxed"
                        style={{ fontFamily: 'Inter' }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <main className="bg-[#060E1A] pt-24">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-4 block">
            Simple, Transparent Pricing
          </span>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}
          >
            Invest in <span className="gradient-text">Prevention,</span>
            <br />Not Recovery
          </h1>
          <p className="text-[#8B9DB0] text-xl max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Every plan pays for itself. Start free, scale as you grow.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <AnimatedSection key={plan.name} delay={i * 0.15}>
                  <motion.div
                    className={`rounded-2xl p-8 h-full flex flex-col relative overflow-hidden ${
                      plan.popular
                        ? 'border-2 border-[#00D4FF]'
                        : 'border border-[rgba(0,212,255,0.12)]'
                    }`}
                    style={{
                      background: plan.popular
                        ? 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(10,22,40,0.98) 100%)'
                        : 'rgba(255,255,255,0.03)',
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: `0 30px 60px ${plan.color}20`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Popular glow */}
                    {plan.popular && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ boxShadow: 'inset 0 0 40px rgba(0,212,255,0.08)' }} />
                    )}

                    {/* Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}30` }}
                      >
                        <Icon size={22} style={{ color: plan.color }} />
                      </div>
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{
                          background: `${plan.badgeColor}20`,
                          color: plan.badgeColor,
                          border: `1px solid ${plan.badgeColor}40`,
                          animation: plan.popular ? 'glow 2s ease-in-out infinite alternate' : 'none',
                        }}
                      >
                        {plan.badge}
                      </span>
                    </div>

                    {/* Plan name */}
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-widest text-[#8B9DB0] mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                        {plan.tier}
                      </p>
                      <h3 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                        {plan.name}
                      </h3>
                      <p className="text-[#8B9DB0] text-sm">{plan.sub}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-end gap-1">
                        <span
                          className="text-5xl font-black"
                          style={{ color: plan.color, fontFamily: 'Space Grotesk' }}
                        >
                          {plan.price}
                        </span>
                        {plan.priceSub && (
                          <span className="text-[#8B9DB0] text-sm mb-2">{plan.priceSub}</span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Inter' }}>
                          <Check size={16} style={{ color: plan.color }} className="mt-0.5 shrink-0" />
                          <span className="text-[#F0F4F8]/80">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={plan.ctaLink}
                      className={`w-full py-4 rounded-xl font-bold text-center block transition-all duration-300 ${
                        plan.popular
                          ? 'btn-cyan relative z-10'
                          : 'border border-[rgba(255,255,255,0.12)] text-[#F0F4F8] hover:border-[rgba(0,212,255,0.3)] hover:text-[#00D4FF]'
                      }`}
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Trust badges */}
          {/* <AnimatedSection className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                '✓ No credit card required',
                '✓ Cancel anytime',
                '✓ Data encrypted in transit & at rest',
                '✓ ISO 27001-aligned infrastructure',
              ].map((badge) => (
                <span key={badge} className="text-sm text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
                  {badge}
                </span>
              ))}
            </div>
          </AnimatedSection> */}
        </div>
      </section>

      <FAQAccordion />
    </main>
  );
}
