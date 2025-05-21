
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <Hero />
      <AboutMe />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
