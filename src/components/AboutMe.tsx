
import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutMe: React.FC = () => {
  return (
    <AnimatedSection id="about-me" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">About Me</h2>
        
        <div className="max-w-3xl mx-auto">
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
          
          <p className="text-lg text-muted-foreground">
            When I'm not working with data, I enjoy staying up-to-date with the latest AI research,
            contributing to open-source projects, and exploring new technologies.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutMe;
