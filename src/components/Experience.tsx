
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Building2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from './AnimatedSection';

interface BulletPoint {
  text: string;
}

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  bulletPoints: BulletPoint[];
  skills: string[];
  delay: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ 
  title, 
  company, 
  period, 
  description, 
  bulletPoints,
  skills,
  delay
}) => {
  return (
    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <Card className="bg-secondary border-none card-hover">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <CardTitle className="text-xl md:text-2xl text-white">
                {title}
              </CardTitle>
              <CardDescription className="flex items-center mt-1 text-lg">
                <Building2 className="mr-2 h-4 w-4 text-electric" /> 
                {company}
              </CardDescription>
            </div>
            <div className="flex items-center text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{period}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {bulletPoints.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point.text}</li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} className="bg-electric/20 hover:bg-electric text-electric hover:text-charcoal cursor-pointer">
                {skill}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Senior Data Scientist",
      company: "Tech Company Inc.",
      period: "2021 - Present",
      description: "Led the development of machine learning models to predict customer behavior, resulting in a 24% increase in conversion rates. Designed and implemented data pipelines processing over 5TB of data daily.",
      bulletPoints: [
        { text: "Led a team of 5 data scientists in building a real-time recommendation engine using PyTorch and Kafka" },
        { text: "Reduced infrastructure costs by 35% through optimization of cloud resources and processing workflows" },
        { text: "Presented quarterly insights to C-level executives, translating technical findings into business impact" }
      ],
      skills: ["Python", "PyTorch", "AWS", "Airflow", "SQL"]
    },
    {
      title: "Data Scientist",
      company: "Data Insights Corp.",
      period: "2018 - 2021",
      description: "Developed NLP algorithms for sentiment analysis on customer feedback, improving product satisfaction scores by 18%. Created interactive dashboards for business stakeholders.",
      bulletPoints: [
        { text: "Built and deployed a BERT-based text classification system with 92% accuracy for routing customer inquiries" },
        { text: "Designed a real-time dashboard system used by 200+ business users to track KPIs and product performance" },
        { text: "Mentored 3 junior data scientists, developing their technical and communication skills" }
      ],
      skills: ["Python", "Spark", "NLP", "Tableau", "GCP"]
    },
    {
      title: "Data Analyst",
      company: "Analytics Startup",
      period: "2016 - 2018",
      description: "Performed exploratory data analysis to identify trends in user acquisition. Built automated reporting systems that saved 15 hours of manual work weekly.",
      bulletPoints: [
        { text: "Created automated ETL pipelines using Python and SQL, reducing manual reporting time by 80%" },
        { text: "Identified key user segments that led to a 28% increase in customer retention after targeted interventions" },
        { text: "Collaborated with marketing team to design and implement A/B testing framework for campaign optimization" }
      ],
      skills: ["SQL", "R", "Excel", "PowerBI", "Statistics"]
    }
  ];

  return (
    <AnimatedSection id="experience" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Experience</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          My professional journey in transforming data into actionable insights and solutions.
        </p>
        
        <div className="mt-12">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              bulletPoints={exp.bulletPoints}
              skills={exp.skills}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
