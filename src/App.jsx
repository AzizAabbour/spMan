import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#09090b] selection:bg-red-600 selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
