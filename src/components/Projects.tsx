
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import { ExternalLink, Github, X } from 'lucide-react';
import { ProjectData } from './ProjectModal';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Tag category interface
interface TagCategory {
  name: string;
  tags: string[];
  color?: string;
}

const Projects: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('All');
  
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

  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  );
  
  // Define tag categories
  const tagCategories: TagCategory[] = [
    {
      name: "Languages",
      tags: ["Python", "R", "SQL"],
      color: "text-blue-400 border-blue-400"
    },
    {
      name: "Tools / Libraries",
      tags: ["Plotly", "XGBoost", "BERT", "Transformers", "Prophet", "LSTM", "Flask", "FastAPI", "Dash"],
      color: "text-green-400 border-green-400"
    },
    {
      name: "Systems / Platforms",
      tags: ["AWS", "Kafka", "Airflow"],
      color: "text-purple-400 border-purple-400"
    },
    {
      name: "Subject Areas",
      tags: ["Machine Learning", "NLP", "Time Series"],
      color: "text-orange-400 border-orange-400"
    }
  ];

  // Filter tags that are actually used in projects
  const usedTagsByCategory = tagCategories.map(category => {
    return {
      ...category,
      tags: category.tags.filter(tag => allTags.includes(tag))
    };
  }).filter(category => category.tags.length > 0);
  
  // Get filtered projects based on active filters
  const filteredProjects = activeFilters.length
    ? projects.filter(project => 
        activeFilters.some(filter => project.tags.includes(filter))
      )
    : projects;

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  // Get background color class based on category
  const getTagColorClass = (tag: string) => {
    for (const category of tagCategories) {
      if (category.tags.includes(tag)) {
        return category.color;
      }
    }
    return "text-gray-400 border-gray-400"; // Default color
  };

  return (
    <AnimatedSection id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
          A selection of my data science and machine learning projects.
        </p>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Filter by:</h3>
            {activeFilters.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm"
              >
                Clear filters <X className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            <ToggleGroup type="multiple" className="justify-start flex-wrap gap-2">
              {usedTagsByCategory.map((category) => (
                <div key={category.name} className="mb-4 w-full">
                  <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`cursor-pointer border ${
                          activeFilters.includes(tag)
                            ? 'bg-electric text-charcoal'
                            : 'bg-secondary hover:bg-electric/20'
                        } ${getTagColorClass(tag)}`}
                        onClick={() => toggleFilter(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </ToggleGroup>
            
            {activeFilters.length > 0 && (
              <div className="bg-secondary/50 rounded-md p-3 mt-4">
                <p className="text-sm text-muted-foreground mb-2">Active filters:</p>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(filter => (
                    <Badge
                      key={filter}
                      className="bg-electric text-charcoal flex items-center gap-1"
                      onClick={() => toggleFilter(filter)}
                    >
                      {filter}
                      <X className="h-3 w-3 ml-1 cursor-pointer" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} delay={(index % 3) * 100} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <h3 className="text-xl text-muted-foreground">No projects match the selected filters</h3>
              <Button onClick={clearFilters} className="mt-4">Clear all filters</Button>
            </div>
          )}
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
