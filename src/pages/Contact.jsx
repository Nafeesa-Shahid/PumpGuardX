import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MessageSquare, Building, User } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const reasons = [
  {
    title: 'Request a Live Demo',
    desc: 'See PumpGuardX monitoring a real pump in real time — our 20-minute demo is worth more than any datasheet.',
  },
  {
    title: 'Discuss Your Operation',
    desc: "Every facility is different. Tell us your pump count, environment, and we'll map out the right deployment.",
  },
  {
    title: 'Academic Collaboration',
    desc: 'Researchers and students — we welcome collaboration, joint publications, and dataset sharing.',
  },
];

const inputClass =
  'w-full bg-[#0D1F3C] border border-[rgba(0,212,255,0.12)] rounded-xl px-4 py-3 text-[#F0F4F8] text-sm placeholder-[#8B9DB0] outline-none transition-all duration-200 focus:border-[#00D4FF] focus:ring-2 focus:ring-[rgba(0,212,255,0.1)]';

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <main className="bg-[#060E1A] pt-24 min-h-screen relative overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="orb absolute w-[500px] h-[500px] -top-32 -left-32"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb absolute w-[400px] h-[400px] -bottom-20 -right-20"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold mb-4 block">
            Get in Touch
          </span>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}
          >
            Let's Talk <span className="gradient-text">Pumps.</span>
          </h1>
          <p className="text-[#8B9DB0] text-xl max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Whether you want a demo, a deep-dive, or just have a question — we respond within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    {/* Animated checkmark SVG */}
                    <svg className="mx-auto mb-6" width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="2" />
                      <motion.circle
                        cx="40" cy="40" r="38"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="240"
                        strokeDashoffset="240"
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                      <motion.path
                        d="M 24 40 L 36 52 L 56 28"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="50"
                        strokeDashoffset="50"
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                      />
                    </svg>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                      Message Sent!
                    </h3>
                    <p className="text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
                      Thanks, <span className="text-[#00D4FF]">{form.name}</span>. We'll be in touch within 24 hours.
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl p-8 space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#8B9DB0] uppercase tracking-widest mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                      <User size={12} /> Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className={inputClass}
                      value={form.name}
                      onChange={handleChange('name')}
                      style={{ fontFamily: 'Inter' }}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#EF4444] text-xs mt-1"
                          style={{ fontFamily: 'Inter' }}
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#8B9DB0] uppercase tracking-widest mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                      <Building size={12} /> Company (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Your company or institution"
                      className={inputClass}
                      value={form.company}
                      onChange={handleChange('company')}
                      style={{ fontFamily: 'Inter' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#8B9DB0] uppercase tracking-widest mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                      <Mail size={12} /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className={inputClass}
                      value={form.email}
                      onChange={handleChange('email')}
                      style={{ fontFamily: 'Inter' }}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#EF4444] text-xs mt-1"
                          style={{ fontFamily: 'Inter' }}
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#8B9DB0] uppercase tracking-widest mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                      <MessageSquare size={12} /> Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your setup, what you'd like to achieve, or just say hello."
                      className={`${inputClass} resize-none`}
                      value={form.message}
                      onChange={handleChange('message')}
                      style={{ fontFamily: 'Inter' }}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#EF4444] text-xs mt-1"
                          style={{ fontFamily: 'Inter' }}
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-[#060E1A] flex items-center justify-center gap-3 btn-cyan relative z-10"
                    style={{ fontFamily: 'Space Grotesk' }}
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-[#060E1A]/30 border-t-[#060E1A] rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Side panel — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection direction="right">
              <div className="glass-card rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>
                  Why reach out?
                </h3>
                <div className="space-y-5">
                  {reasons.map((r, i) => (
                    <div key={r.title} className="flex gap-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-black text-[#060E1A]"
                        style={{ background: '#00D4FF', fontFamily: 'Space Grotesk' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold mb-1" style={{ fontFamily: 'Space Grotesk' }}>{r.title}</p>
                        <p className="text-[#8B9DB0] text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="glass-card rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-[#8B9DB0] mb-3" style={{ fontFamily: 'Space Grotesk' }}>Response Time</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-[#00D4FF]" style={{ fontFamily: 'Space Grotesk' }}>
                    &lt; 24h
                  </span>
                </div>
                <p className="text-[#8B9DB0] text-sm mt-1" style={{ fontFamily: 'Inter' }}>
                  We're a small team that genuinely cares — every message gets a personal reply.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}
