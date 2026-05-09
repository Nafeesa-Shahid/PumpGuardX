import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/learn', label: 'Learn' },
  { path: '/about', label: 'About' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060E1A]/95 backdrop-blur-xl border-b border-[rgba(0,212,255,0.1)] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img 
                src="/logo512.png"  // Direct path since it's in public folder
                alt="PumpGuardX Logo"
                className="h-7 w-auto group-hover:scale-110 transition-transform duration-300"
               />
              <div className="absolute inset-0 rounded-full bg-[#00D4FF] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            </div>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              PumpGuard<span className="text-[#00D4FF]">X</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive ? '#00D4FF' : '#8B9DB0',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#00D4FF] transition-all duration-300 rounded-full"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#00D4FF] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ display: isActive ? 'none' : 'block' }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:block btn-cyan px-5 py-2 text-sm font-semibold rounded-lg relative z-10"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Get Demo
            </Link>
            <button
              className="md:hidden text-[#8B9DB0] hover:text-[#00D4FF] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-[#0A1628]/98 backdrop-blur-xl border-l border-[rgba(0,212,255,0.1)] flex flex-col pt-24 px-8 gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={link.path}
                  className="text-lg font-medium block py-2 border-b border-[rgba(0,212,255,0.08)]"
                  style={{
                    color: location.pathname === link.path ? '#00D4FF' : '#F0F4F8',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4"
            >
              <Link
                to="/contact"
                className="btn-cyan w-full py-3 text-center block font-semibold rounded-lg relative z-10"
              >
                Get Demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
