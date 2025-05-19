
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Code, Cloud, Cpu, Database, LineChart, Share2, Terminal, MessageSquare, Users, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from './AnimatedSection';

interface SkillProps {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const SkillItem: React.FC<SkillProps> = ({ name, icon, description }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 text-electric">
          {icon}
        </div>
        <h4 className="text-lg font-medium">{name}</h4>
      </div>
      <p className="text-muted-foreground pl-11">{description}</p>
    </div>
  );
};

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillProps[];
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
            <p className="text-muted-foreground mb-6">{description}</p>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillItem
                  key={index}
                  name={skill.name}
                  icon={skill.icon}
                  description={skill.description}
                />
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code className="h-5 w-5" />,
      description: "Programming languages and frameworks I've mastered for data science and machine learning.",
      skills: [
        { 
          name: "Python", 
          icon: <Code className="h-4 w-4" />,
          description: "My primary language for data analysis and machine learning. I've built production ML pipelines, data processing systems, and web applications using frameworks like Flask and FastAPI."
        },
        { 
          name: "R", 
          icon: <Terminal className="h-4 w-4" />,
          description: "Extensively used for statistical analysis and data visualization. I've developed several R packages for my team and contributed to open-source statistical libraries."
        },
        { 
          name: "SQL", 
          icon: <Database className="h-4 w-4" />,
          description: "Expert in writing complex queries, optimizing database performance, and designing schemas across PostgreSQL, MySQL, and cloud databases like BigQuery and Snowflake."
        },
        { 
          name: "PyTorch", 
          icon: <Cpu className="h-4 w-4" />,
          description: "Implemented deep learning models for NLP and computer vision, with experience in both research and production environments."
        },
        { 
          name: "scikit-learn", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Built countless machine learning pipelines using this versatile library, from feature engineering to model deployment and monitoring."
        }
      ],
      defaultOpen: true
    },
    {
      title: "Cloud & Platforms",
      icon: <Cloud className="h-5 w-5" />,
      description: "Cloud platforms and services I use for deploying and scaling data science solutions.",
      skills: [
        { 
          name: "AWS", 
          icon: <Cloud className="h-4 w-4" />,
          description: "Certified AWS Solutions Architect with experience deploying ML models using SageMaker, managing data pipelines with Step Functions, and building serverless applications."
        },
        { 
          name: "GCP", 
          icon: <Cloud className="h-4 w-4" />,
          description: "Proficient with BigQuery, Vertex AI, and DataProc for large-scale data processing and machine learning workloads."
        },
        { 
          name: "Databricks", 
          icon: <Share2 className="h-4 w-4" />,
          description: "Developed and deployed production data pipelines and ML models on Databricks, leveraging Delta Lake for reliable data engineering workflows."
        },
        { 
          name: "Kubernetes", 
          icon: <Server className="h-4 w-4" />,
          description: "Designed and maintained microservice architectures for data products, with experience in deployment strategies and resource optimization."
        },
        { 
          name: "Docker", 
          icon: <Terminal className="h-4 w-4" />,
          description: "Created reproducible environments for machine learning models and data applications, with CI/CD integration for automated testing and deployment."
        }
      ]
    },
    {
      title: "Data Processing & Storage",
      icon: <Database className="h-5 w-5" />,
      description: "Technologies I use for handling, storing, and processing large-scale data.",
      skills: [
        { 
          name: "PostgreSQL", 
          icon: <Database className="h-4 w-4" />,
          description: "My go-to relational database for most projects, with expertise in performance optimization, indexing strategies, and advanced querying techniques."
        },
        { 
          name: "Spark", 
          icon: <Share2 className="h-4 w-4" />,
          description: "Processed petabyte-scale datasets using Spark for distributed computation, with experience in optimization techniques for complex transformations."
        },
        { 
          name: "Airflow", 
          icon: <Share2 className="h-4 w-4" />,
          description: "Built robust data orchestration workflows, custom operators, and monitoring systems for mission-critical ETL processes."
        },
        { 
          name: "Snowflake", 
          icon: <Database className="h-4 w-4" />,
          description: "Implemented enterprise data warehouses using Snowflake's cloud-native architecture, optimizing for performance and cost."
        },
        { 
          name: "BigQuery", 
          icon: <Database className="h-4 w-4" />,
          description: "Designed analytics solutions leveraging BigQuery's serverless architecture, materializing views, and ML capabilities."
        }
      ]
    },
    {
      title: "Data Visualization",
      icon: <LineChart className="h-5 w-5" />,
      description: "Tools and libraries I use to create compelling data visualizations and dashboards.",
      skills: [
        { 
          name: "Tableau", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Created interactive business intelligence dashboards that drive decision-making across organizations, with experience in server administration and embedding."
        },
        { 
          name: "Plotly", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Built interactive web-based visualizations and dashboards using Plotly and Dash, enabling stakeholders to explore data dynamically."
        },
        { 
          name: "Matplotlib", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Extensive experience creating publication-quality static visualizations for reports and presentations, with custom styling and annotations."
        },
        { 
          name: "D3.js", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Developed custom, interactive data visualizations for web applications, creating unique experiences tailored to specific datasets."
        },
        { 
          name: "Power BI", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Designed enterprise dashboards connected to various data sources, with DAX measures and custom visuals for business analytics."
        }
      ]
    },
    {
      title: "Machine Learning",
      icon: <Cpu className="h-5 w-5" />,
      description: "Machine learning techniques and domains I specialize in.",
      skills: [
        { 
          name: "Deep Learning", 
          icon: <Cpu className="h-4 w-4" />,
          description: "Designed and trained neural networks for various applications including NLP, computer vision, and time series forecasting, with experience in transfer learning and model optimization."
        },
        { 
          name: "Natural Language Processing", 
          icon: <MessageSquare className="h-4 w-4" />,
          description: "Built production systems for text classification, entity extraction, summarization, and sentiment analysis using both traditional techniques and transformer-based models."
        },
        { 
          name: "Time Series Analysis", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Developed forecasting models for sales, demand, and anomaly detection across various industries, combining statistical methods with machine learning approaches."
        },
        { 
          name: "MLOps", 
          icon: <Share2 className="h-4 w-4" />,
          description: "Implemented end-to-end ML pipelines with automated training, evaluation, deployment, and monitoring, ensuring models remain reliable in production."
        },
        { 
          name: "Recommender Systems", 
          icon: <Cpu className="h-4 w-4" />,
          description: "Designed personalization algorithms using collaborative filtering, content-based approaches, and hybrid methods that improved user engagement metrics."
        }
      ]
    },
    {
      title: "Development & Collaboration",
      icon: <Share2 className="h-5 w-5" />,
      description: "Tools and methodologies I use for development, version control, and collaboration.",
      skills: [
        { 
          name: "Git", 
          icon: <Share2 className="h-4 w-4" />,
          description: "Expert in version control workflows including branching strategies, code reviews, and release management for both individual and team projects."
        },
        { 
          name: "Agile", 
          icon: <Users className="h-4 w-4" />,
          description: "Led and participated in agile teams using Scrum and Kanban methodologies, facilitating sprint planning, daily standups, and retrospectives."
        },
        { 
          name: "CI/CD", 
          icon: <Share2 className="h-4 w-4" />,
          description: "Built automated pipelines for testing, building, and deploying data science applications, reducing deployment time and increasing reliability."
        },
        { 
          name: "Documentation", 
          icon: <MessageSquare className="h-4 w-4" />,
          description: "Created comprehensive technical documentation including API references, architectural diagrams, and user guides that improved knowledge sharing across teams."
        },
        { 
          name: "Code Review", 
          icon: <Code className="h-4 w-4" />,
          description: "Established code quality standards and mentored junior team members through thoughtful reviews focused on readability, performance, and maintainability."
        }
      ]
    },
    {
      title: "Soft Skills",
      icon: <Users className="h-5 w-5" />,
      description: "Professional competencies that enhance my technical expertise and enable successful project delivery and team collaboration.",
      skills: [
        {
          name: "Communication",
          icon: <MessageSquare className="h-4 w-4" />,
          description: "Adept at translating complex technical concepts to non-technical stakeholders. I've led data literacy workshops for executives and created documentation that bridges the gap between data science teams and business units. My presentations regularly receive positive feedback for clarity and accessibility."
        },
        {
          name: "Leadership",
          icon: <Users className="h-4 w-4" />,
          description: "Experienced in leading cross-functional data science teams of 3-7 members. I've mentored junior data scientists through project implementations and career development. My collaborative approach focuses on recognizing individual strengths while maintaining alignment with organizational goals."
        },
        {
          name: "Adaptability",
          icon: <Award className="h-4 w-4" />,
          description: "Proven ability to quickly learn new technologies and methodologies as industry standards evolve. I've successfully transitioned projects from legacy systems to modern cloud architectures and pivoted analysis approaches when initial methods proved insufficient. This flexibility has been crucial in fast-paced environments."
        }
      ]
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
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
