
import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DecryptedText from './DecryptedText';
import ScrollReveal from './ScrollReveal';
import RotatingText from './RotatingText';

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

  const rotatingTexts = ["Analyst", "Engineer", "Scientist", "Professional"];

  return (
    <div id="about" className="min-h-screen pt-16 flex flex-col justify-center relative">
      <div className="container mx-auto px-4 md:px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <ScrollReveal direction="left" delay={300} className="flex-1">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-white">
                  <DecryptedText 
                    text="Justin " 
                    animateOn="view"
                    sequential={true}
                    speed={100}
                    maxIterations={8}
                    useOriginalCharsOnly={true}
                    className="text-white"
                    encryptedClassName="text-muted-foreground"
                  />
                </span>
                <span className="text-white">
                  <DecryptedText 
                    text="Taylor" 
                    animateOn="view"
                    sequential={true}
                    speed={120}
                    maxIterations={10}
                    useOriginalCharsOnly={true}
                    className="text-white"
                    encryptedClassName="text-white/50"
                  />
                </span>
              </h1>
              <h2 className="mt-4 text-2xl md:text-3xl font-medium text-muted-foreground flex items-baseline">
                <span className="text-white">Data </span>
                <RotatingText
                  texts={rotatingTexts}
                  rotationInterval={3000}
                  splitBy="characters"
                  staggerDuration={0.035}
                  mainClassName="text-electric ml-2"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                />
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                I transform complex data into actionable insights, build scalable machine learning solutions, 
                and develop data visualization tools that help businesses make data-driven decisions.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={500} className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-electric/30">
              <img 
                src="/lovable-uploads/72d564ad-4a7b-4376-a3c1-93e8528b61c1.png"
                alt="Justin Taylor"
                className="w-full h-full object-cover object-[center_25%] scale-110"
              />
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal direction="up" delay={700}>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
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
        </ScrollReveal>
      </div>
      
      <ScrollReveal direction="fade" delay={1000}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-muted-foreground mb-2 text-sm">Scroll Down</span>
          <a 
            href="#about-me" 
            onClick={(e) => handleSmoothScroll(e, "about-me")}
            className="cursor-pointer hover:text-electric transition-colors"
          >
            <ArrowDownCircle className="text-electric w-6 h-6" />
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Hero;
