
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
        <section id="about-me">
          <AboutMe />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <section id="experience">
          <Experience />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={150}>
        <section id="skills">
          <Skills />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <section id="projects">
          <Projects />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={200}>
        <section id="contact">
          <Contact />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="fade" delay={100}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
