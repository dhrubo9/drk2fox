import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-24 bg-white/[0.01] border-y border-white/5 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyber-purple/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1 bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase mb-4 tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" /> Client Reviews
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Approved by Builders
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans">
            Hear from business founders, engineers, and creators who unlocked professional responsive React layouts for exactly $560.
          </p>
        </div>

        {/* Carousel Layout for Interactive Showcase */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-cyber-card border border-white/10 rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-white/5 pointer-events-none" />

            <div className="min-h-[220px] flex flex-col justify-between">
              {/* Rating stars */}
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed italic mb-8">
                "{TESTIMONIALS[activeIndex].text}"
              </p>

              {/* Client Profile */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <img
                    src={TESTIMONIALS[activeIndex].avatar}
                    alt={TESTIMONIALS[activeIndex].name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full border border-cyber-teal/30 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="text-xs text-gray-400 font-sans">
                      {TESTIMONIALS[activeIndex].role} at{' '}
                      <span className="text-cyber-teal">{TESTIMONIALS[activeIndex].company}</span>
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-500 uppercase">
                  Verified Contract • {TESTIMONIALS[activeIndex].date}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 bg-cyber-card text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'w-6 bg-cyber-teal' : 'w-2 bg-white/10'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 bg-cyber-card text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div id="benefits" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 rounded-2xl bg-cyber-card border border-white/5 hover:border-white/10 transition-all">
            <h3 className="font-display font-semibold text-lg text-white mb-2">
              100% Client-Owned Source
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              You own the React components and git repository 100%. No proprietary templates or walled-garden platform lock-ins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyber-card border border-white/5 hover:border-white/10 transition-all">
            <h3 className="font-display font-semibold text-lg text-white mb-2">
              Stripe checkout hooks
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Sell subscriptions or merchandise instantly with direct client-side Stripe integrations engineered to route payments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyber-card border border-white/5 hover:border-white/10 transition-all">
            <h3 className="font-display font-semibold text-lg text-white mb-2">
              Zero platform maintenance
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our code compiles to statically highly-optimized files that can run on any global CDN with close to zero maintenance or server cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
