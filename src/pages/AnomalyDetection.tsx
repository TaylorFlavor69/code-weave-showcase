
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Code, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CodeSnippet from '@/components/CodeSnippet';
import AnomalyChart from '@/components/AnomalyChart';
import MetricCard from '@/components/MetricCard';

const AnomalyDetection: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const gaussianCode = `def estimateGaussian(X):
    """
    Estimates the parameters of a Gaussian distribution using the data in X
    """
    m, n = X.shape
    
    # Calculate mean
    mu = np.mean(X, axis=0)
    
    # Calculate covariance matrix
    sigma2 = np.var(X, axis=0)
    
    return mu, sigma2

def selectThresholdByCV(yval, pval):
    """
    Find the best threshold (epsilon) using the F1 score 
    on a cross validation set
    """
    bestEpsilon = 0
    bestF1 = 0
    F1 = 0
    
    stepsize = (max(pval) - min(pval)) / 1000
    
    for epsilon in np.arange(min(pval), max(pval), stepsize):
        predictions = (pval < epsilon)
        
        tp = np.sum((predictions == 1) & (yval == 1))
        fp = np.sum((predictions == 1) & (yval == 0))
        fn = np.sum((predictions == 0) & (yval == 1))
        
        prec = tp / (tp + fp) if (tp + fp) != 0 else 0
        rec = tp / (tp + fn) if (tp + fn) != 0 else 0
        
        F1 = 2 * prec * rec / (prec + rec) if (prec + rec) != 0 else 0
        
        if F1 > bestF1:
            bestF1 = F1
            bestEpsilon = epsilon
    
    return bestEpsilon, bestF1`;

  const project = {
    id: 6,
    title: "Anomaly Detection",
    subtitle: "Detecting outliers in server latency and throughput using probabilistic modeling and support vector machines.",
    tags: ["Python", "NumPy", "Scikit-learn", "Matplotlib", "Machine Learning", "Anomaly Detection"],
    github: "https://github.com",
    demo: "https://demo.com"
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-charcoal min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <Link to="/#projects" className="inline-flex items-center text-electric hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <Badge key={index} className="bg-accent/30 text-white">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        <AnimatedSection className="mb-12">
          <Card className="bg-secondary border-accent/20">
            <CardHeader>
              <CardTitle className="text-white">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                This project explores how to identify network anomalies in server performance metrics using both probabilistic and machine learning approaches. We apply multivariate Gaussian modeling to estimate density functions, tune thresholds using F1 scores on labeled validation sets, and visualize outlier detection. We also compare this approach with One-Class SVM for anomaly classification.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Key Visuals Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Key Visuals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <CodeSnippet 
                title="Core Gaussian Functions"
                code={gaussianCode}
                language="python"
              />
              <AnomalyChart 
                title="Gaussian Anomaly Detection"
                type="gaussian"
                description="Scatter plot showing normal (blue) vs anomalous (red) points using Gaussian density estimation"
              />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <AnomalyChart 
                title="One-Class SVM Detection"
                type="svm"
                description="SVM-based anomaly detection with decision boundary visualization"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MetricCard 
                  title="Optimal Epsilon"
                  value="9.03e-05"
                  icon={Target}
                  description="Best threshold for anomaly classification"
                />
                <MetricCard 
                  title="Best F1 Score"
                  value="0.571"
                  icon={BarChart3}
                  description="Balanced precision-recall performance"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Details Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Technical Details</h2>
          <div className="space-y-4">
            {[
              {
                id: "data-processing",
                title: "Data Processing",
                content: "CSV loading and parsing with NumPy for efficient numerical computation. Data preprocessing includes normalization and feature scaling to ensure optimal model performance across different metric ranges."
              },
              {
                id: "gaussian-model",
                title: "Gaussian Model & Outlier Detection",
                content: "Mean and covariance calculations are used to establish probability density functions. Points with likelihood below the threshold epsilon are classified as anomalies. The multivariate Gaussian approach captures feature correlations effectively."
              },
              {
                id: "threshold-tuning",
                title: "Threshold Tuning",
                content: "F1 score calculation across multiple epsilon values using cross-validation ensures optimal balance between precision and recall. Grid search methodology identifies the threshold that maximizes detection accuracy while minimizing false positives."
              },
              {
                id: "one-class-svm",
                title: "One-Class SVM",
                content: "Model configuration with nu=0.1 and RBF gamma parameters. Prediction labels (-1 for outliers, 1 for normal) are visualized to compare with Gaussian approach. SVM provides non-linear decision boundaries for complex anomaly patterns."
              }
            ].map((section) => (
              <Collapsible 
                key={section.id}
                open={openSections.includes(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="bg-secondary border-accent/20 cursor-pointer hover:bg-secondary/80 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-white">{section.title}</CardTitle>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${
                        openSections.includes(section.id) ? 'rotate-180' : ''
                      }`} />
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="bg-secondary/50 border-accent/10 mt-2">
                    <CardContent className="pt-4">
                      <p className="text-muted-foreground">{section.content}</p>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </AnimatedSection>

        {/* Takeaways Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Key Takeaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Gaussian modeling can detect low-density anomaly regions effectively",
              "F1 tuning helps find a balanced threshold for classification",
              "One-Class SVM generalizes well without requiring labeled anomalies",
              "Visual validation is crucial in interpreting model performance"
            ].map((takeaway, index) => (
              <Card key={index} className="bg-secondary border-accent/20">
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{takeaway}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button className="bg-electric text-charcoal hover:bg-white" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              View Full Notebook
            </a>
          </Button>
          {project.github && (
            <Button variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repository
              </a>
            </Button>
          )}
          {project.demo && (
            <Button variant="outline" asChild>
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
