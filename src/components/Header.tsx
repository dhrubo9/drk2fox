import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Spec Planner', href: '#planner' },
    { name: 'Pitch Deck', href: '#slides-section' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyber-dark/85 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyber-teal to-cyber-blue flex items-center justify-center shadow-lg shadow-cyber-teal/20 transition-transform group-hover:scale-105">
              <Terminal className="w-5 h-5 text-cyber-dark" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-wider text-white group-hover:text-cyber-teal transition-colors">
                DRK2FOK
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyber-teal font-medium uppercase">
                AI Site Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors hover:underline decoration-cyber-teal decoration-2 underline-offset-4"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action + Live Telemetry */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                SLOT AVAILABLE • {time}
              </span>
            </div>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium text-white rounded-lg group bg-gradient-to-br from-cyber-teal to-cyber-purple hover:text-cyber-dark focus:ring-4 focus:outline-none focus:ring-cyber-teal/30"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-cyber-dark rounded-md group-hover:bg-opacity-0 flex items-center gap-1.5">
                Start Build <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[9px] font-mono text-gray-400">{time}</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cyber-dark/95 border-b border-white/10 px-4 py-4 space-y-3 shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-cyber-teal py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono text-gray-400">
                ACTIVE PIPELINE • $560 FLAT RATE
              </span>
            </div>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark font-display font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              Book Web Project ($560) <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
