
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const Index = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <Hero />
      <ScrollReveal direction="up" delay={200}>
        <AboutMe />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <Experience />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={150}>
        <Skills />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <Projects />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={200}>
        <Contact />
      </ScrollReveal>
      <ScrollReveal direction="fade" delay={100}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
