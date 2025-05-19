
import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div id="about" className="min-h-screen pt-16 flex flex-col justify-center relative">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="text-electric">Your Name</span>
            </h1>
            <h2 className="mt-4 text-2xl md:text-3xl font-medium text-muted-foreground">
              Data Scientist & Machine Learning Engineer
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              I transform complex data into actionable insights, build scalable machine learning solutions, 
              and develop data visualization tools that help businesses make data-driven decisions.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                asChild 
                className="bg-electric text-charcoal hover:bg-white hover:text-charcoal"
                size="lg"
              >
                <a href="#experience">Experience</a>
              </Button>
              <Button 
                asChild 
                className="bg-secondary hover:bg-accent"
                size="lg"
              >
                <a href="#skills">Skills</a>
              </Button>
              <Button 
                asChild 
                variant="outline"
                size="lg"
              >
                <a href="#projects">Projects</a>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-electric/30 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {/* Replace with your image */}
              <div className="absolute inset-0 bg-secondary flex items-center justify-center text-white text-lg">
                Your Photo
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-muted-foreground mb-2">Scroll Down</span>
        <ArrowDownCircle className="text-electric" />
      </div>
    </div>
  );
};

export default Hero;
