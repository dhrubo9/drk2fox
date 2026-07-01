import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Check, Sparkles, Sliders, Layout, ShieldAlert } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
}

const APP_TYPES = [
  { id: 'landing', name: 'Premium Landing Page', desc: 'High-conversion single-page site with premium scroll animations.' },
  { id: 'saas', name: 'SaaS Dashboard UI', desc: 'Analytical dashboard with interactive metrics and state management.' },
  { id: 'ecommerce', name: 'E-Commerce Storefront', desc: 'Secure retail shop with shopping cart and payment portal.' },
  { id: 'custom', name: 'Custom Portal / Web App', desc: 'Bespoke web application with specific business workflows.' }
];

const FEATURES: Feature[] = [
  { id: 'payments', name: 'Stripe Payment Portal', description: 'Fully configured checkout flows and success workflows.' },
  { id: 'auth', name: 'User Registration & Auth', description: 'Interactive forms for user accounts, credentials, and state.' },
  { id: 'charts', name: 'Data Visualization & Charts', description: 'Interactive dashboards displaying responsive metrics via D3/Recharts.' },
  { id: 'animations', name: 'Micro-interactions & Motion', description: 'Advanced transitions and micro-animations to guide user attention.' },
  { id: 'forms', name: 'Interactive Intake Forms', description: 'Client-side validations, secure field submissions, and feedback hooks.' },
  { id: 'seo', name: 'Premium SEO Optimizations', description: 'Configured sitemaps, semantic layout structures, and meta tagging.' },
  { id: 'cms', name: 'Local Admin Content Panel', description: 'Simple password-secured local portal to manage text and assets.' },
  { id: 'support', name: 'Interactive Assistance Dialogs', description: 'Contextual help alerts and customized notification overlays.' }
];

interface SpecCalculatorProps {
  onApplySpec: (specText: string) => void;
}

export default function SpecCalculator({ onApplySpec }: SpecCalculatorProps) {
  const [selectedType, setSelectedType] = useState('landing');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['payments', 'animations']);
  const [pageRange, setPageRange] = useState('1-3');

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getSpecText = () => {
    const typeName = APP_TYPES.find((t) => t.id === selectedType)?.name || '';
    const featureList = FEATURES.filter((f) => selectedFeatures.includes(f.id))
      .map((f) => `  - ${f.name}`)
      .join('\n');
    return `PROJECT SPECIFICATION BRIEF:
============================
- App Template: ${typeName}
- Scope Range: ${pageRange} Pages
- Custom Features Configured:
${featureList || '  - Base React + Tailwind Layout'}
- Cost Breakdown: FLAT $560 USD (All features inclusive)
- Timeline Target: 3 Days Max`;
  };

  const handleApply = () => {
    onApplySpec(getSpecText());
    // Scroll to contact form
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="planner" className="py-20 md:py-24 bg-white/[0.01] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Interactive Project Planner
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans">
            Customize your application parameters and watch the system orchestrate your specific technical blueprint. No matter what parameters you configure, the development fee is strictly locked.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Settings - Left Side */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Web App Type */}
            <div className="space-y-4">
              <label className="text-sm font-mono tracking-wider text-cyber-teal uppercase flex items-center gap-2">
                <Layout className="w-4 h-4" /> 1. Select Application Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {APP_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedType === type.id
                        ? 'bg-cyber-teal/5 border-cyber-teal shadow-md shadow-cyber-teal/5'
                        : 'bg-cyber-card/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display font-semibold text-white text-sm sm:text-base">{type.name}</span>
                      {selectedType === type.id && (
                        <span className="w-5 h-5 rounded-full bg-cyber-teal flex items-center justify-center text-cyber-dark">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale/Pages */}
            <div className="space-y-4">
              <label className="text-sm font-mono tracking-wider text-cyber-teal uppercase flex items-center gap-2">
                <Sliders className="w-4 h-4" /> 2. Define Scope Scale
              </label>
              <div className="flex flex-wrap gap-3">
                {['1-3 Pages', '4-6 Pages', 'Complete Multi-Page Router'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setPageRange(range)}
                    className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${
                      pageRange === range
                        ? 'bg-cyber-blue/10 border-cyber-blue text-white'
                        : 'bg-cyber-card/40 border-white/5 text-gray-400 hover:border-white/10'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Interactive Features */}
            <div className="space-y-4">
              <label className="text-sm font-mono tracking-wider text-cyber-teal uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 3. Select Custom Integrations (Multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-cyber-purple/5 border-cyber-purple'
                          : 'bg-cyber-card/40 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-medium text-white text-sm">{feat.name}</span>
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-cyber-purple border-cyber-purple text-white' : 'border-white/20'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-normal">{feat.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Code Spec Console - Right Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-cyber-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="bg-white/3 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyber-teal" />
                  <span className="text-xs font-mono font-medium text-gray-300">orchestration_engine.log</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                </div>
              </div>

              <div className="p-5 font-mono text-xs leading-relaxed text-gray-300 min-h-[220px] bg-cyber-dark/50 whitespace-pre">
                {getSpecText()}
              </div>

              {/* Price Callout */}
              <div className="p-6 bg-white/2 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Fixed Budget</span>
                    <span className="text-lg font-bold text-white">Flat Pricing Guarantee</span>
                  </div>
                  <div className="flex items-baseline text-cyber-teal font-display">
                    <span className="text-4xl font-extrabold">$560</span>
                    <span className="text-xs font-mono text-gray-500 ml-1">USD</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-3 text-[11px] text-yellow-400/90 leading-relaxed mb-6">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Zero deposit. Unlimited custom libraries included in this contract. 100% money-back guarantee. Delivered in exactly 3 business days.
                  </span>
                </div>

                <button
                  onClick={handleApply}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark font-display font-bold text-sm rounded-xl shadow-lg hover:shadow-cyber-teal/20 cursor-pointer hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 group"
                >
                  Apply Spec to Project Brief
                  <Terminal className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
