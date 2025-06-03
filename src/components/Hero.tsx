
import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="about" className="min-h-screen pt-16 flex flex-col justify-center relative">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="text-electric">Justin Taylor</span>
            </h1>
            <h2 className="mt-4 text-2xl md:text-3xl font-medium text-muted-foreground">
              Data Science Professional
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              I transform complex data into actionable insights, build scalable machine learning solutions, 
              and develop data visualization tools that help businesses make data-driven decisions.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                className="bg-electric text-charcoal hover:bg-white hover:text-charcoal"
                size="lg"
              >
                <a 
                  href="#about-me" 
                  onClick={(e) => handleSmoothScroll(e, "about-me")}
                >
                  About Me
                </a>
              </Button>
              <Button 
                className="bg-teal text-charcoal hover:bg-teal/80"
                size="lg"
              >
                <a 
                  href="#experience" 
                  onClick={(e) => handleSmoothScroll(e, "experience")}
                >
                  Experience
                </a>
              </Button>
              <Button 
                className="bg-violet text-white hover:bg-violet/80"
                size="lg"
              >
                <a 
                  href="#skills" 
                  onClick={(e) => handleSmoothScroll(e, "skills")}
                >
                  Skills
                </a>
              </Button>
              <Button 
                className="bg-graphite text-white hover:bg-graphite/80 border border-electric"
                size="lg"
              >
                <a 
                  href="#projects" 
                  onClick={(e) => handleSmoothScroll(e, "projects")}
                >
                  Projects
                </a>
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-electric text-electric hover:bg-electric hover:text-charcoal"
                size="lg"
              >
                <a 
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, "contact")}
                >
                  Contact
                </a>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-electric/30 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <img 
                src="/lovable-uploads/72d564ad-4a7b-4376-a3c1-93e8528b61c1.png"
                alt="Justin Taylor"
                className="w-full h-full object-cover object-center scale-110"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-muted-foreground mb-2">Scroll Down</span>
        <a 
          href="#about-me" 
          onClick={(e) => handleSmoothScroll(e, "about-me")}
          className="cursor-pointer"
        >
          <ArrowDownCircle className="text-electric" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
