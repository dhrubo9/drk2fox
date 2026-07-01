import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Cpu, Zap, DollarSign, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyber-teal/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyber-teal/10 border border-cyber-teal/30 text-cyber-teal text-xs font-semibold font-mono tracking-wide uppercase mb-6 shadow-sm shadow-cyber-teal/10">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            Next-Gen AI Website Developer
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Elite Web Applications{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal via-cyber-blue to-cyber-purple">
              Built at AI Speed
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            By combining deep technical engineering with autonomous AI design pipelines,{' '}
            <strong className="text-white">DRK2FOK</strong> creates state-of-the-art React + Tailwind applications for an unbeatable flat rate.
          </motion.p>

          {/* Key Prompts / CTA Row */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#planner"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyber-teal to-cyber-blue hover:from-cyber-teal/90 hover:to-cyber-blue/90 text-cyber-dark font-display font-semibold rounded-xl shadow-lg shadow-cyber-teal/25 hover:shadow-cyber-teal/35 hover:scale-102 transition-all flex items-center justify-center gap-2 group"
            >
              Configure Website Spec
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              Explore Project Gallery
            </a>
          </motion.div>

          {/* $560 Price Banner Tag */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-lg mx-auto bg-cyber-card/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyber-dark mb-16"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow">
              Unbeatable Pricing
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col text-left">
                <span className="text-gray-400 text-xs font-mono tracking-widest uppercase">Per Custom Website Only</span>
                <span className="text-gray-400 text-xs mt-1">Design, Copywriting, React & Tailwind Dev, Launch</span>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex items-baseline text-white">
                <span className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-cyber-teal">$560</span>
                <span className="text-gray-400 font-mono text-sm ml-1">USD</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12 text-left"
          >
            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="flex items-center gap-2 text-cyber-teal mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Turnaround</span>
              </div>
              <p className="text-2xl font-display font-bold text-white">3 Days Max</p>
              <p className="text-xs text-gray-500 mt-1">From specifications lock to hosting launch.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="flex items-center gap-2 text-cyber-blue mb-2">
                <Code2 className="w-5 h-5" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Stack Integrity</span>
              </div>
              <p className="text-2xl font-display font-bold text-white">React + Tailwind</p>
              <p className="text-xs text-gray-500 mt-1">High fidelity, clean components, fully responsive.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="flex items-center gap-2 text-cyber-purple mb-2">
                <Cpu className="w-5 h-5" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Methodology</span>
              </div>
              <p className="text-2xl font-display font-bold text-white">AI-Accelerated</p>
              <p className="text-xs text-gray-500 mt-1">Eliminating structural boilerplate overhead.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="flex items-center gap-2 text-cyber-teal mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">No Overruns</span>
              </div>
              <p className="text-2xl font-display font-bold text-white">Flat $560</p>
              <p className="text-xs text-gray-500 mt-1">Zero deposit. You pay strictly upon full approval.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
