
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Code, Cloud, DollarSign, Cpu, Database, LineChart, Server, Share2, Terminal, MessageSquare, Users, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from './AnimatedSection';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; level?: string }[];
  defaultOpen?: boolean;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  icon, 
  description, 
  skills,
  defaultOpen = false 
}) => {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? title : undefined}>
      <AccordionItem value={title} className="border-b border-muted/20">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4 text-electric">
              {icon}
            </div>
            <h3 className="text-xl font-medium">{title}</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-2 pb-4">
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-secondary hover:bg-electric hover:text-charcoal justify-center py-1.5 text-sm cursor-pointer"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface SoftSkillProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const SoftSkill: React.FC<SoftSkillProps> = ({ title, icon, description }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 text-electric">
          {icon}
        </div>
        <h4 className="text-lg font-medium">{title}</h4>
      </div>
      <p className="text-muted-foreground pl-11">{description}</p>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code className="h-5 w-5" />,
      description: "Programming languages and frameworks I've mastered for data science and machine learning.",
      skills: [
        { name: "Python", level: "Expert" },
        { name: "R", level: "Advanced" },
        { name: "SQL", level: "Expert" },
        { name: "PyTorch", level: "Advanced" },
        { name: "TensorFlow", level: "Advanced" },
        { name: "scikit-learn", level: "Expert" },
        { name: "pandas", level: "Expert" },
        { name: "NumPy", level: "Expert" },
        { name: "SciPy", level: "Advanced" }
      ],
      defaultOpen: true
    },
    {
      title: "Cloud & Platforms",
      icon: <Cloud className="h-5 w-5" />,
      description: "Cloud platforms and services I use for deploying and scaling data science solutions.",
      skills: [
        { name: "AWS", level: "Advanced" },
        { name: "GCP", level: "Intermediate" },
        { name: "Azure", level: "Intermediate" },
        { name: "Databricks", level: "Advanced" },
        { name: "Kubernetes", level: "Intermediate" },
        { name: "Docker", level: "Advanced" },
        { name: "Heroku", level: "Intermediate" },
        { name: "Vertex AI", level: "Intermediate" },
        { name: "SageMaker", level: "Advanced" }
      ]
    },
    {
      title: "Data Processing & Storage",
      icon: <Database className="h-5 w-5" />,
      description: "Technologies I use for handling, storing, and processing large-scale data.",
      skills: [
        { name: "PostgreSQL", level: "Expert" },
        { name: "MongoDB", level: "Advanced" },
        { name: "Redis", level: "Intermediate" },
        { name: "Spark", level: "Advanced" },
        { name: "Kafka", level: "Intermediate" },
        { name: "Airflow", level: "Advanced" },
        { name: "Hadoop", level: "Intermediate" },
        { name: "Snowflake", level: "Advanced" },
        { name: "BigQuery", level: "Advanced" }
      ]
    },
    {
      title: "Data Visualization",
      icon: <LineChart className="h-5 w-5" />,
      description: "Tools and libraries I use to create compelling data visualizations and dashboards.",
      skills: [
        { name: "Tableau", level: "Advanced" },
        { name: "Power BI", level: "Intermediate" },
        { name: "Matplotlib", level: "Expert" },
        { name: "Seaborn", level: "Expert" },
        { name: "Plotly", level: "Expert" },
        { name: "D3.js", level: "Intermediate" },
        { name: "Dash", level: "Advanced" },
        { name: "Bokeh", level: "Advanced" },
        { name: "Looker", level: "Intermediate" }
      ]
    },
    {
      title: "Machine Learning",
      icon: <Cpu className="h-5 w-5" />,
      description: "Machine learning techniques and domains I specialize in.",
      skills: [
        { name: "Deep Learning", level: "Advanced" },
        { name: "NLP", level: "Advanced" },
        { name: "Computer Vision", level: "Intermediate" },
        { name: "Reinforcement Learning", level: "Intermediate" },
        { name: "Time Series", level: "Advanced" },
        { name: "RecSys", level: "Advanced" },
        { name: "MLOps", level: "Advanced" },
        { name: "Feature Engineering", level: "Expert" },
        { name: "AutoML", level: "Intermediate" }
      ]
    },
    {
      title: "Development & Collaboration",
      icon: <Share2 className="h-5 w-5" />,
      description: "Tools and methodologies I use for development, version control, and collaboration.",
      skills: [
        { name: "Git", level: "Expert" },
        { name: "GitHub/GitLab", level: "Expert" },
        { name: "CI/CD", level: "Advanced" },
        { name: "Jira", level: "Advanced" },
        { name: "Agile", level: "Advanced" },
        { name: "Scrum", level: "Advanced" },
        { name: "Documentation", level: "Expert" },
        { name: "Code Review", level: "Expert" },
        { name: "Unit Testing", level: "Advanced" }
      ]
    }
  ];

  const softSkills = [
    {
      title: "Communication",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Adept at translating complex technical concepts to non-technical stakeholders. I've led data literacy workshops for executives and created documentation that bridges the gap between data science teams and business units. My presentations regularly receive positive feedback for clarity and accessibility."
    },
    {
      title: "Leadership",
      icon: <Users className="h-4 w-4" />,
      description: "Experienced in leading cross-functional data science teams of 3-7 members. I've mentored junior data scientists through project implementations and career development. My collaborative approach focuses on recognizing individual strengths while maintaining alignment with organizational goals."
    },
    {
      title: "Adaptability",
      icon: <Award className="h-4 w-4" />,
      description: "Proven ability to quickly learn new technologies and methodologies as industry standards evolve. I've successfully transitioned projects from legacy systems to modern cloud architectures and pivoted analysis approaches when initial methods proved insufficient. This flexibility has been crucial in fast-paced environments."
    }
  ];

  return (
    <AnimatedSection id="skills" className="py-20 bg-navy">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          Technologies, frameworks, and methodologies I've mastered throughout my career.
        </p>
        
        <div className="space-y-4">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              icon={category.icon}
              description={category.description}
              skills={category.skills}
              defaultOpen={category.defaultOpen}
            />
          ))}
          
          <Accordion type="single" collapsible>
            <AccordionItem value="soft-skills" className="border-b border-muted/20">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4 text-electric">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-medium">Soft Skills</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="text-muted-foreground mb-6">
                    Professional competencies that enhance my technical expertise and enable successful project delivery and team collaboration.
                  </p>
                  <div className="space-y-4">
                    {softSkills.map((skill, index) => (
                      <SoftSkill
                        key={index}
                        title={skill.title}
                        icon={skill.icon}
                        description={skill.description}
                      />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
