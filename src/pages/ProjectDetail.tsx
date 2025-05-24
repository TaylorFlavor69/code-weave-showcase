import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/AnimatedSection';
import { ProjectData } from '@/components/ProjectModal';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you'd fetch this from an API or database
    // For now we'll use the sample projects from the Projects component
    const projects = [
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
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Approach & Methodology</h3>
          <p>Our approach to this problem involved extensive exploratory data analysis to identify key indicators of customer churn. We discovered that service calls, contract type, and tenure were the strongest predictors.</p>
          
          <p class="mt-4">After testing multiple algorithms including Random Forests, Gradient Boosting, and Neural Networks, XGBoost provided the best balance between accuracy and interpretability for this particular business problem.</p>
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Results & Impact</h3>
          <p>The deployed model has enabled the business to implement targeted retention campaigns, resulting in:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>18% reduction in overall churn rate</li>
            <li>$2.3M estimated annual savings</li>
            <li>45% improvement in retention campaign efficiency</li>
          </ul>
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
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Technical Architecture</h3>
          <p>The dashboard architecture consists of three main components:</p>
          <ol class="list-decimal pl-6 space-y-2 mt-2">
            <li>Data ingestion layer with Kafka and Kafka Connect</li>
            <li>Processing layer with Python and Pandas for real-time calculations</li>
            <li>Visualization layer with Plotly Dash and custom CSS</li>
          </ol>
          
          <p class="mt-4">The system processes approximately 1.2M events per hour and maintains a 99.9% uptime SLA.</p>
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
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Model Training & Evaluation</h3>
          <p>The ticket classification model was trained on a dataset of 50,000 historical support tickets, manually labeled with appropriate categories and priority levels.</p>
          
          <p class="mt-4">We achieved 88% classification accuracy after three rounds of active learning, where domain experts helped refine edge cases and disambiguate problematic examples.</p>
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Business Outcomes</h3>
          <p>By implementing this NLP system, the customer support team experienced:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>65% reduction in ticket routing errors</li>
            <li>45% faster response times for customers</li>
            <li>23% improvement in CSAT scores</li>
            <li>Annual savings of approximately 12,000 agent hours</li>
          </ul>
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
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Forecasting Methodology</h3>
          <p>We implemented an ensemble approach combining:</p>
          <ol class="list-decimal pl-6 space-y-2 mt-2">
            <li>Facebook Prophet for capturing seasonality and holidays</li>
            <li>ARIMA for short-term trend prediction</li>
            <li>LSTM networks for capturing complex patterns and dependencies</li>
          </ol>
          
          <p class="mt-4">The final model weights each algorithm's predictions based on recent performance, automatically adapting to changing market conditions.</p>
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Deployment & Integration</h3>
          <p>The forecasting system is deployed on AWS using Airflow for orchestration and retraining. It integrates with the company's inventory management system through a custom API and provides daily forecast updates for 250+ stores and 10,000+ products.</p>
        `,
        image: "/placeholder.svg",
        tags: ["Python", "Time Series", "Prophet", "LSTM", "Airflow"],
        github: "https://github.com",
        demo: "https://demo.com"
      },
      {
        id: 5,
        title: "Data Visualization AI Agent",
        shortDescription: "Interactive AI-powered data analysis and visualization tool",
        fullDescription: `
          <p>A secure, interactive demo that uses PandasAI with OpenAI and Gemini models to answer questions about data and generate visualizations from natural language input.</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Natural language query processing for data analysis</li>
            <li>AI-powered chart and graph generation</li>
            <li>Multiple dataset support with preview capabilities</li>
            <li>Secure authentication and request limiting</li>
            <li>Interactive visualization outputs</li>
          </ul>
          <p class="mt-4">This tool democratizes data analysis by allowing users to explore datasets using plain English queries.</p>
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Technical Implementation</h3>
          <p>The application leverages several cutting-edge technologies:</p>
          <ol class="list-decimal pl-6 space-y-2 mt-2">
            <li>PandasAI for intelligent data manipulation and analysis</li>
            <li>OpenAI GPT-4 and Google Gemini for natural language understanding</li>
            <li>Plotly and Matplotlib for dynamic visualization generation</li>
            <li>FastAPI backend with secure authentication</li>
          </ol>
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Key Features</h3>
          <p>The AI agent provides a comprehensive data analysis experience:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Multi-model AI support for enhanced query understanding</li>
            <li>Interactive dataset explorer with live previews</li>
            <li>Automatic chart type selection based on query intent</li>
            <li>Request limiting and user session management</li>
            <li>Responsive design for desktop and mobile use</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-8 mb-4">Use Cases & Impact</h3>
          <p>This tool has proven valuable across multiple domains:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Business analysts exploring sales and marketing data</li>
            <li>Researchers analyzing scientific datasets</li>
            <li>Students learning data analysis concepts</li>
            <li>Non-technical users accessing data insights</li>
          </ul>
        `,
        image: "/placeholder.svg",
        tags: ["Python", "PandasAI", "OpenAI", "Gemini", "Data Visualization"],
        github: "https://github.com",
        demo: "/data-visualization-agent"
      }
    ];

    const projectData = projects.find(p => p.id === parseInt(id || "0"));
    setProject(projectData || null);
    setLoading(false);

    // Scroll to top when navigating to a project
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-electric">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/#projects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <Link to="/#projects" className="inline-flex items-center text-electric hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <Badge key={index} className="bg-accent/30 text-white">{tag}</Badge>
            ))}
          </div>
        </div>

        <AnimatedSection className="mb-12">
          <div className="aspect-video overflow-hidden rounded-md bg-muted mb-6">
            {project.embedUrl ? (
              <iframe 
                src={project.embedUrl} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title={project.title}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <img 
                  src={project.image || '/placeholder.svg'} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="prose prose-invert max-w-none mb-8" 
               dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
        </AnimatedSection>

        <div className="flex flex-wrap gap-4 mb-12">
          {project.github && (
            <Button variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repository
              </a>
            </Button>
          )}
          {project.demo && (
            <Button className="bg-electric text-charcoal hover:bg-white" asChild>
              {project.demo.startsWith('/') ? (
                <Link to={project.demo}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Try Live Demo
                </Link>
              ) : (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
