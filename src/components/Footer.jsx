import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/learn', label: 'PdM Academy' },
  { path: '/about', label: 'About Us' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#060E1A] border-t border-[rgba(0,212,255,0.08)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo512.png"  // Direct path since it's in public folder
                alt="PumpGuardX Logo"
                className="h-7 w-auto group-hover:scale-110 transition-transform duration-300"
               />
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                PumpGuard<span className="text-[#00D4FF]">X</span>
              </span>
            </div>
            <p className="text-[#8B9DB0] text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter' }}>
              Guard Your Pumps. Guard Your Profits.
              <br />
              AI-powered predictive maintenance for industrial pumps — built to learn, test and solve real maintenance challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#8B9DB0] hover:text-[#F0F4F8] transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: 'Inter' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Contact
            </h3>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'pumpguardx@gmail.com' },
                { icon: MapPin, text: 'IBM Department, UET Lahore' },
                { icon: Phone, text: '+92 311 7880898' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
                  <Icon size={15} className="text-[#00D4FF] mt-0.5 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(0,212,255,0.06)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
            © 2026 PumpGuardX. All rights reserved.
          </p>
          <p className="text-xs text-[#8B9DB0]" style={{ fontFamily: 'Inter' }}>
            Built with purpose by{' '}
            <span className="text-[#00D4FF]">Nafeesa, Zainab, Bilal & Nisar</span>
            {' '}— FYP 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
