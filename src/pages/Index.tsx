
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
        <div id="about-me">
          <AboutMe />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <div id="experience">
          <Experience />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={150}>
        <div id="skills">
          <Skills />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <div id="projects">
          <Projects />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={200}>
        <div id="contact">
          <Contact />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="fade" delay={100}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
