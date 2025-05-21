
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import { FileText, Mail, Briefcase } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <AnimatedSection id="about-me" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a data scientist and machine learning engineer with a passion for transforming complex data into 
              actionable insights. With extensive experience in automation, ETL processes, and AI integration, 
              I help organizations leverage their data to make better decisions and improve operations.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6">
              My technical expertise spans Python, SQL, machine learning, and cloud technologies, 
              with a particular focus on AI applications and large language models. I enjoy tackling 
              challenging problems that combine technical expertise with business acumen.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              When I'm not working with data, I enjoy staying up-to-date with the latest AI research,
              contributing to open-source projects, and exploring new technologies.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-electric text-charcoal hover:bg-white hover:text-charcoal">
                <a href="#experience"><Briefcase className="mr-2 h-4 w-4" /> Experience</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="#projects"><FileText className="mr-2 h-4 w-4" /> Projects</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact"><Mail className="mr-2 h-4 w-4" /> Contact Me</a>
              </Button>
            </div>
          </div>
          
          <div className="bg-secondary rounded-lg p-6 space-y-4">
            <div className="mb-4">
              <h3 className="text-xl font-medium text-electric mb-2">Professional Summary</h3>
              <p className="text-muted-foreground">
                Business Technical Analyst with 5+ years of experience in data engineering, analytics,
                and AI solution development. Focused on delivering scalable data solutions and 
                automation that drives business value.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-electric mb-2">Education</h3>
              <p className="text-white font-medium">Kalamazoo College</p>
              <p className="text-muted-foreground">B.A. Computer Science, Mathematics</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-electric mb-2">Key Focus Areas</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Machine Learning & AI Integration</li>
                <li>Data Engineering & ETL Processes</li>
                <li>Process Automation & Optimization</li>
                <li>Database Design & Management</li>
                <li>Technical Documentation & Knowledge Sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutMe;
