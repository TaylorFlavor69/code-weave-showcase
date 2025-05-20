
import React, { useState, useEffect } from 'react';

interface NavLinkProps {
  href: string;
  title: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  return (
    <a 
      href={href} 
      className="px-4 py-2 rounded-md text-muted-foreground hover:text-electric transition-colors duration-300"
    >
      {title}
    </a>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-charcoal/90 backdrop-blur-md shadow-lg' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#top" className="text-xl md:text-2xl font-bold text-white">
          <span className="text-electric">Justin</span> Taylor
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink href="#about" title="About" />
          <NavLink href="#experience" title="Experience" />
          <NavLink href="#skills" title="Skills" />
          <NavLink href="#projects" title="Projects" />
          <NavLink href="#contact" title="Contact" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-charcoal/95 backdrop-blur-md transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <a href="#about" className="px-4 py-2 text-muted-foreground hover:text-electric" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#experience" className="px-4 py-2 text-muted-foreground hover:text-electric" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#skills" className="px-4 py-2 text-muted-foreground hover:text-electric" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" className="px-4 py-2 text-muted-foreground hover:text-electric" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#contact" className="px-4 py-2 text-muted-foreground hover:text-electric" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
