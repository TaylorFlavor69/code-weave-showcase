
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/AnimatedSection';

const AnomalyDetection: React.FC = () => {
  const project = {
    id: 6,
    title: "Anomaly Detection System",
    shortDescription: "ML pipeline for real-time anomaly detection using isolation forests",
    fullDescription: `
      <p>Built a comprehensive machine learning pipeline for real-time anomaly detection to identify unusual patterns in data streams and business operations.</p>
      <ul class="list-disc pl-6 space-y-2 mt-2">
        <li>Real-time anomaly detection using isolation forests and statistical methods</li>
        <li>Feature engineering for behavioral pattern recognition</li>
        <li>Interactive dashboards for monitoring anomalies</li>
        <li>Automated alerting system for critical anomalies</li>
        <li>Scalable architecture for high-volume data processing</li>
      </ul>
      <p class="mt-4">This system helped identify fraudulent activities and operational issues, resulting in a 40% reduction in fraud and improved system reliability.</p>
      
      <h3 class="text-xl font-semibold mt-8 mb-4">Technical Architecture</h3>
      <p>The anomaly detection system is built on a scalable architecture that processes streaming data in real-time:</p>
      <ol class="list-decimal pl-6 space-y-2 mt-2">
        <li>Data ingestion layer with Apache Kafka for handling high-velocity streams</li>
        <li>Feature engineering pipeline using sliding window statistics and behavioral metrics</li>
        <li>Ensemble of isolation forests and statistical outlier detection methods</li>
        <li>Real-time scoring engine with configurable threshold management</li>
        <li>Alert routing system with escalation rules and notification channels</li>
      </ol>
      
      <h3 class="text-xl font-semibold mt-8 mb-4">Key Innovations</h3>
      <p>Several innovative approaches were implemented to improve detection accuracy:</p>
      <ul class="list-disc pl-6 space-y-2 mt-2">
        <li>Adaptive threshold adjustment based on historical patterns and seasonality</li>
        <li>Multi-dimensional anomaly scoring considering both point and contextual anomalies</li>
        <li>Feedback loop integration for continuous model improvement</li>
        <li>Domain-specific feature engineering for different data types and use cases</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-8 mb-4">Results & Business Impact</h3>
      <p>The anomaly detection system has delivered significant value across multiple areas:</p>
      <ul class="list-disc pl-6 space-y-2 mt-2">
        <li>40% reduction in fraudulent activities through early detection</li>
        <li>60% improvement in system uptime by identifying issues before failure</li>
        <li>35% reduction in false positive alerts compared to previous rule-based systems</li>
        <li>$1.8M annual savings from prevented fraud and reduced downtime</li>
        <li>Real-time processing of 500K+ events per minute with sub-second latency</li>
      </ul>
      
      <p class="mt-4">The system now serves as the foundation for proactive monitoring across the organization, enabling teams to respond to issues before they impact customers or business operations.</p>
    `,
    image: "/lovable-uploads/f129c379-fae4-4af1-9389-0581fd47ff66.png",
    tags: ["Python", "Machine Learning", "Anomaly Detection", "Statistical Analysis", "Data Pipeline"],
    github: "https://github.com",
    demo: "https://demo.com"
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
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
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetection;
