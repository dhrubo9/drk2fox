import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import Testimonials from './components/Testimonials';
import SpecCalculator from './components/SpecCalculator';
import SlidesWorkspace from './components/SlidesWorkspace';
import ContactForm from './components/ContactForm';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  const [appliedSpecText, setAppliedSpecText] = useState('');

  const handleApplySpec = (specText: string) => {
    setAppliedSpecText(specText);
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-gray-300 font-sans selection:bg-cyber-teal selection:text-cyber-dark antialiased">
      {/* Header section with reactive status clock */}
      <Header />

      {/* Main Hero introduction */}
      <Hero />

      {/* Grid gallery showcasing previous builds */}
      <ProjectGallery />

      {/* Client reviews and core platform benefits */}
      <Testimonials />

      {/* Interactive specification planner */}
      <SpecCalculator onApplySpec={handleApplySpec} />

      {/* Google Slides Integration / Pitch Deck Compiler */}
      <SlidesWorkspace />

      {/* Persistent Client Workspace Intake and Status tracker */}
      <ContactForm appliedSpecText={appliedSpecText} />

      {/* Frequent inquiries intel accordions */}
      <FaqSection />

      {/* Footer copyright, link mappings, and channels */}
      <Footer />
    </div>
  );
}
