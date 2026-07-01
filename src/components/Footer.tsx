import React from 'react';
import { Terminal, Shield, ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cyber-dark border-t border-white/5 py-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-teal to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-10">
          
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyber-teal to-cyber-blue flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyber-dark" />
              </div>
              <span className="font-display text-base font-bold text-white tracking-wider">
                DRK2FOK
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono tracking-widest uppercase">
              Pro AI Website Developer • Flat $560
            </p>
          </div>

          {/* Core Footer links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-gray-400">
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#planner" className="hover:text-white transition-colors">Spec Planner</a>
            <a href="#slides-section" className="hover:text-white transition-colors">Pitch Deck</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors text-cyber-teal">Contact</a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Legal and Direct Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-cyber-teal" />
            <span>© 2026 DRK2FOK. All rights reserved. Secure React & Tailwind Deployments.</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-cyber-blue" />
            <a href="mailto:dhruboroy3429@gmail.com" className="hover:text-white transition-colors">
              dhruboroy3429@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
