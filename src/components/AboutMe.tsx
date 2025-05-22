
import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutMe: React.FC = () => {
  return (
    <AnimatedSection id="about-me" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">About Me</h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Hi, I’m Justin — a Data Science Professional based in Chicago, currently working remotely for Premier Inc., headquartered in North Carolina.
          </p>

          <p className="text-lg text-muted-foreground mb-6">
            My career at Premier began in a data engineering capacity, where I focused on building and maintaining data pipelines, executing ETL processes, and managing data mapping and migration efforts. I worked cross-functionally across teams to support enterprise-scale analytics solutions and was hand-selected to support a flagship initiative around Enterprise Data Acquisition.
          </p>

          <p className="text-lg text-muted-foreground mb-6">
            While Premier has traditionally served as a GPO and ERP provider, the company has recently expanded its focus to market data and analytics products, targeting enterprise clients and large health systems. This work involves integrating data from health systems using third-party ERPs into Premier’s platforms, enabling visibility and benchmarking capabilities. Our pipelines—primarily built with Ab Initio—land data into Azure Data Lake Storage, which is then processed and served via Google Cloud Platform into our Analytics Hub. These workflows involve heavy use of Python, SQL, and cloud-native tools.
          </p>

          <p className="text-lg text-muted-foreground mb-6">
            I’ve recently transitioned into a new hybrid role where I continue to support my previous responsibilities (30–50% of my time), while dedicating the remainder to our Analytics Hub platform. This role blends technical execution with business strategy and market research. I work in BigQuery, create Colab notebooks, and integrate tools like the Gemini Flash 2.5 API to build solutions, automate insights, and fill in analytical gaps for our Member organizations.
          </p>

          <p className="text-lg text-muted-foreground mb-6">
            Before Premier, I worked on a development team at the sixth-largest law firm in the world, designing internal systems for lawyers, PMs, specialists, and analysts—tools that improved workflow efficiency, accuracy, and strategic decision-making.
          </p>
          
          <p className="text-lg text-muted-foreground mb-6">
            Earlier in my career, I was part of Aldi’s Customer Interaction department, where I focused on customer experience analytics, journey mapping, sentiment analysis, and supporting operational improvements across customer communication channels.
          </p>
          
          <p className="text-lg text-muted-foreground">
            I'm passionate about solving meaningful problems and constantly expanding my skillset. I thrive in environments that require adaptability, curiosity, and cross-functional collaboration. The ever-evolving nature of data science keeps me engaged—what worked last year might not work next year, and that’s exactly what I love about this field. I embrace change and navigate ambiguity with confidence and creativity.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutMe;
