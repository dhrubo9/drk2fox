import React, { useState } from 'react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-white/[0.01] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-cyber-teal/10 border border-cyber-teal/20 text-cyber-teal px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase mb-4 tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 animate-bounce" /> Frequently Answered
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Intel & FAQ
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans">
            Got questions about our flat-rate $560 system, timeline logistics, or custom React frameworks? Read the deployment intel below.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-cyber-card border border-white/5 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-display font-semibold text-white hover:text-cyber-teal text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyber-teal shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans border-t border-white/2 bg-white/1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
