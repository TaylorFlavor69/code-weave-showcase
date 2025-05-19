
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectData } from './ProjectModal'; // Keep using the same type

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const projects: ProjectData[] = [
    {
      id: 1,
      title: "Customer Churn Prediction",
      shortDescription: "ML model predicting customer churn with 92% accuracy",
      fullDescription: `
        <p>Built an end-to-end machine learning pipeline for predicting customer churn with over 92% accuracy. The solution includes:</p>
        <ul class="list-disc pl-6 space-y-2 mt-2">
          <li>Data preprocessing and feature engineering pipeline</li>
          <li>Model training with XGBoost and hyperparameter optimization</li>
          <li>Model explainability using SHAP values</li>
          <li>API endpoint for real-time predictions</li>
          <li>Interactive dashboard for business stakeholders</li>
        </ul>
        <p class="mt-4">The model is currently deployed in production and has helped reduce churn by 18%.</p>
      `,
      image: "/placeholder.svg",
      tags: ["Python", "Machine Learning", "XGBoost", "Flask", "AWS"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "Real-time Data Analytics Dashboard",
      shortDescription: "Interactive Plotly Dash dashboard for analytics",
      fullDescription: `
        <p>Designed and developed a real-time analytics dashboard using Plotly Dash that processes streaming data from IoT devices.</p>
        <ul class="list-disc pl-6 space-y-2 mt-2">
          <li>Integration with Kafka for real-time data streaming</li>
          <li>Interactive visualizations with drill-down capabilities</li>
          <li>Anomaly detection algorithms for real-time monitoring</li>
          <li>Responsive design that works on desktop and tablets</li>
        </ul>
        <p class="mt-4">This dashboard is used daily by the operations team to monitor system performance and detect issues early.</p>
      `,
      image: "/placeholder.svg",
      tags: ["Python", "Plotly", "Dash", "Kafka", "Time Series"],
      github: "https://github.com",
      demo: "https://demo.com",
      embedUrl: "https://plotly.com/dash/design-kit/"
    },
    {
      id: 3,
      title: "NLP for Customer Support",
      shortDescription: "NLP system for automating customer support",
      fullDescription: `
        <p>Developed a natural language processing system that automatically categorizes and routes customer support tickets.</p>
        <ul class="list-disc pl-6 space-y-2 mt-2">
          <li>Fine-tuned BERT model for ticket classification</li>
          <li>Entity recognition for extracting key information</li>
          <li>Automated response generation for common queries</li>
          <li>Integration with existing ticketing system</li>
        </ul>
        <p class="mt-4">This system reduced the average response time by 45% and improved customer satisfaction scores.</p>
      `,
      image: "/placeholder.svg",
      tags: ["Python", "NLP", "BERT", "Transformers", "FastAPI"],
      github: "https://github.com"
    },
    {
      id: 4,
      title: "Sales Forecasting Engine",
      shortDescription: "Time series forecasting for retail sales",
      fullDescription: `
        <p>Built a time series forecasting engine for predicting retail sales across multiple store locations and product categories.</p>
        <ul class="list-disc pl-6 space-y-2 mt-2">
          <li>Prophet and ARIMA models for baseline forecasting</li>
          <li>LSTM neural networks for capturing complex patterns</li>
          <li>Feature engineering including holiday effects and seasonality</li>
          <li>Automated retraining pipeline using Airflow</li>
        </ul>
        <p class="mt-4">The forecasting engine has improved inventory management efficiency by 28% and reduced stockouts by 33%.</p>
      `,
      image: "/placeholder.svg",
      tags: ["Python", "Time Series", "Prophet", "LSTM", "Airflow"],
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  // Extract unique tags from all projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  
  const filteredProjects = filter
    ? projects.filter(project => project.tags.includes(filter))
    : projects;

  return (
    <AnimatedSection id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
          A selection of my data science and machine learning projects.
        </p>
        
        <div className="mt-4 mb-10 flex flex-wrap gap-2">
          <Badge 
            className={`cursor-pointer ${!filter ? 'bg-electric text-charcoal' : 'bg-secondary text-white hover:bg-electric hover:text-charcoal'}`}
            onClick={() => setFilter(null)}
          >
            All
          </Badge>
          {allTags.map((tag, index) => (
            <Badge 
              key={index}
              className={`cursor-pointer ${filter === tag ? 'bg-electric text-charcoal' : 'bg-secondary text-white hover:bg-electric hover:text-charcoal'}`}
              onClick={() => setFilter(tag === filter ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} delay={(index % 3) * 100} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay }) => {
  return (
    <Card className="bg-secondary hover:bg-secondary/80 border-none h-full flex flex-col card-hover animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-muted-foreground">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/project/${project.id}`}>
          <Button variant="secondary">View Details</Button>
        </Link>
        <div className="flex gap-2">
          {project.github && (
            <Button size="icon" variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.demo && (
            <Button size="icon" variant="outline" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Projects;
