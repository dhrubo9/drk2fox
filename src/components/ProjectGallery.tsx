import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Tag, Clock, Check, ChevronRight, X, Layers, Code2, Globe } from 'lucide-react';

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'saas' | 'landing'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'saas', label: 'SaaS Dashboards' },
    { id: 'landing', label: 'Landing Pages' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const mockArchitecture = {
    'proj-1': {
      server: 'Vite Client Router + Express API Gateway',
      database: 'Local Web DB Sync (localStorage / IndexedDB)',
      aiRole: 'Structured product metadata parsing & tags generator.',
      highlights: ['Dynamic Cart Redux State', 'Stripe checkout proxy endpoints', 'Aesthetic dark theme card layouts']
    },
    'proj-2': {
      server: 'Vite SPA with Recharts analytics client',
      database: 'Real-time JSON mock streams',
      aiRole: 'Automatic telemetry clustering and trend summaries.',
      highlights: ['Smooth fluid line/bar SVG graphs', 'Metric filters and date trackers', 'Responsive multi-grid dashboards']
    },
    'proj-3': {
      server: 'Fully responsive React single-page template',
      database: 'Cloud intake form submission nodes',
      aiRole: 'Semantic sitemap optimization & content structure analysis.',
      highlights: ['Motion transition timelines', 'Aesthetic typography spacing', 'Lead capture hook validations']
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Featured Gallery
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-sans">
              Explore custom React and Tailwind v4 applications constructed with cutting-edge AI orchestration pipelines. Each project was fully compiled, styled, and delivered in under 72 hours for exactly $560.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all duration-250 cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-cyber-teal border-cyber-teal text-cyber-dark font-semibold'
                    : 'bg-white/2 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project.id}
                className="group bg-cyber-card border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-white/15 hover:shadow-2xl transition-all flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-4/3 overflow-hidden bg-cyber-dark/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 bg-cyber-dark/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-cyber-teal">
                    $560 FLAT
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyber-teal transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-white/3 text-[10px] font-mono text-gray-400 px-2 py-1 rounded">
                        <Tag className="w-2.5 h-2.5 text-cyber-blue" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-cyber-purple" />
                      {project.deliveryTime} Build
                    </span>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-cyber-teal hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Inspect Blueprints
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Inspector */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-md"
              ></motion.div>

              {/* Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-cyber-card border border-white/10 rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyber-teal animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-gray-400">Project Blueprint Inspector</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                  {/* Title & Category */}
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-cyber-teal font-mono uppercase tracking-widest">
                      Category: {selectedProject.category} • Budget: $560 Flat Rate
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                    <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-cyber-blue" /> Project Overview
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedProject.description} It delivers optimized modular client-side state hooks, responsive tailwind utility grids, and gorgeous high-contrast visual styling.
                    </p>
                  </div>

                  {/* Architecture spec details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase text-gray-400 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-cyber-purple" /> Technical Blueprint Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-cyber-dark/40 border border-white/5 rounded-lg">
                        <p className="text-[10px] font-mono text-gray-400 mb-1">Client Architecture</p>
                        <p className="text-xs font-semibold text-white">
                          {mockArchitecture[selectedProject.id as keyof typeof mockArchitecture]?.server || 'React 19 Hooks & State Router'}
                        </p>
                      </div>
                      <div className="p-3 bg-cyber-dark/40 border border-white/5 rounded-lg">
                        <p className="text-[10px] font-mono text-gray-400 mb-1">Database Layer</p>
                        <p className="text-xs font-semibold text-white">
                          {mockArchitecture[selectedProject.id as keyof typeof mockArchitecture]?.database || 'Standard Client Cache with browser localStorage'}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-cyber-dark/60 border border-white/5 rounded-lg font-mono text-xs text-gray-300 space-y-2">
                      <p className="text-cyber-teal font-semibold text-[11px] uppercase tracking-wider">AI Developer Pipeline Orchestration Role:</p>
                      <p className="leading-relaxed">
                        {mockArchitecture[selectedProject.id as keyof typeof mockArchitecture]?.aiRole || 'Structural boilerplates automation and code compiling.'}
                      </p>
                    </div>

                    {/* Features Highlights list */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-white">Build Highlights Included in $560 Contract:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(mockArchitecture[selectedProject.id as keyof typeof mockArchitecture]?.highlights || []).map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="w-4 h-4 rounded-full bg-cyber-teal/10 flex items-center justify-center text-cyber-teal font-bold text-[10px] shrink-0">
                              ✓
                            </span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="px-6 py-4 border-t border-white/5 bg-white/2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
                    <Clock className="w-4 h-4 text-cyber-teal" /> Delivery Target: 3 Days Max
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full sm:w-auto px-4 py-2 border border-white/10 hover:border-white/20 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
                    >
                      Close Inspector
                    </button>
                    <a
                      href="#contact"
                      onClick={() => setSelectedProject(null)}
                      className="w-full sm:w-auto text-center px-4 py-2 bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark font-display font-bold text-xs rounded-lg shadow-lg hover:shadow-cyber-teal/10 hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      Book A Build Like This
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
