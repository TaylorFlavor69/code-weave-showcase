
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Code, BarChart3, Target, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Info, Clock, Cpu } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

  const importsCode = `import matplotlib.pyplot as plt
import numpy as np
import pandas  # only for %matplotlib inline context
%matplotlib inline
from numpy import genfromtxt
from scipy.stats import multivariate_normal
from sklearn.metrics import f1_score`;

  const dataLoadCode = `filename = '../input/.../tr_server_data.csv'
a2 = '../input/.../cv_server_data.csv'
a3 = '../input/.../gt_server_data.csv'

tr_data = np.genfromtxt(filename, delimiter=',')
cv_data = np.genfromtxt(a2, delimiter=',')
gt_data = np.genfromtxt(a3, delimiter=',')`;

  const plotCode = `plt.xlabel('Latency (ms)')
plt.ylabel('Throughput (Mb/s)')
plt.plot(tr_data[:,0], tr_data[:,1], 'bx')
plt.show()`;

  const gaussianFunctionsCode = `def estimateGaussian(dataset):
    mu = np.mean(dataset, axis=0)
    sigma = np.cov(dataset.T)
    return mu, sigma

def multivariateGaussian(dataset, mu, sigma):
    return multivariate_normal(mu, sigma).pdf(dataset)`;

  const modelFitCode = `mu, sigma = estimateGaussian(tr_data)
p = multivariateGaussian(tr_data, mu, sigma)`;

  const thresholdTuningCode = `def selectThresholdByCV(probs, gt):
    best_f1, best_eps = 0, 0
    for eps in np.linspace(probs.min(), probs.max(), 1000):
        preds = probs < eps
        f1 = f1_score(gt, preds)
        if f1 > best_f1:
            best_f1, best_eps = f1, eps
    return best_f1, best_eps

p_cv = multivariateGaussian(cv_data, mu, sigma)
best_f1, eps = selectThresholdByCV(p_cv, gt_data)
print(best_f1, eps)`;

  const outlierVisualizationCode = `outliers = np.where(p < eps)
plt.plot(tr_data[:,0], tr_data[:,1], 'bx')
plt.plot(tr_data[outliers,0], tr_data[outliers,1], 'ro')
plt.xlabel('Latency (ms)'); plt.ylabel('Throughput (Mb/s)')
plt.show()`;

  const svmCode = `from sklearn import svm
clf = svm.OneClassSVM(nu=0.05, kernel='rbf', gamma=0.02)
clf.fit(tr_data)
pred = clf.predict(tr_data)
normal = tr_data[pred == 1]
abnormal = tr_data[pred == -1]
plt.plot(normal[:,0], normal[:,1], 'bx')
plt.plot(abnormal[:,0], abnormal[:,1], 'ro')
plt.show()`;

  const project = {
    id: 6,
    title: "Anomaly Detection in Server Performance",
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

        {/* 1. Overview Section */}
        <AnimatedSection className="mb-12">
          <Card className="bg-secondary border-accent/20">
            <CardHeader>
              <CardTitle className="text-white">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We'll detect anomalies in server latency × throughput data. Workflow: load three splits, visualise, fit a multivariate-Gaussian density model, auto-tune ε via F1 on a CV set, and contrast with a One-Class SVM baseline.
              </p>
              
              <h3 className="text-lg font-semibold text-white mb-3">Key Dataset Facts</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
                <li>307 training rows, 2 numeric features</li>
                <li>Additional CV & ground-truth (GT) splits</li>
                <li>Evaluation metric: class-weighted F1</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Runtime ≈ 5 min
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  <Cpu className="mr-1 h-3 w-3" />
                  Python + Scikit-learn
                </Badge>
              </div>

              <Alert className="mt-4 border-electric/20 bg-electric/10">
                <Info className="h-4 w-4 text-electric" />
                <AlertDescription className="text-white">
                  <strong>Key Insight:</strong> Two features lets us plot in 2-D, making visual sanity checks easy.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 2. Imports & Data Load */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Imports & Data Load</h2>
          <p className="text-muted-foreground mb-4">Standard scientific-Python stack plus scikit-learn for metrics.</p>
          
          <div className="space-y-6">
            <CodeSnippet 
              title="Import Dependencies"
              code={importsCode}
              language="python"
            />

            <CodeSnippet 
              title="Data Paths & CSV → NumPy"
              code={dataLoadCode}
              language="python"
            />

            <Card className="bg-secondary/50 border-accent/20">
              <CardHeader>
                <CardTitle className="text-white text-sm">Console Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-charcoal rounded p-3 font-mono text-sm text-green-400">
                  Number of datapoints in training set: 307<br/>
                  Number of dimensions/features: 2
                </div>
              </CardContent>
            </Card>

            <Alert className="border-electric/20 bg-electric/10">
              <Info className="h-4 w-4 text-electric" />
              <AlertDescription className="text-white">
                <strong>Key Insight:</strong> Keeping arrays in NumPy avoids DataFrame overhead for simple math.
              </AlertDescription>
            </Alert>
          </div>
        </AnimatedSection>

        {/* 3. Exploratory Plots */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Exploratory Plots</h2>
          <p className="text-muted-foreground mb-6">Latency vs throughput shows a tight cluster with a few scattered points that might be anomalies.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeSnippet 
              title="Scatter Plot Visualization"
              code={plotCode}
              language="python"
            />
            
            <AnomalyChart 
              title="Figure 1: Latency vs Throughput"
              type="gaussian"
              description="Training data scatter plot showing latency (ms) vs throughput (Mb/s)"
            />
          </div>

          <Alert className="mt-6 border-electric/20 bg-electric/10">
            <Info className="h-4 w-4 text-electric" />
            <AlertDescription className="text-white">
              <strong>Key Insight:</strong> Visual hints suggest Gaussian assumption may hold.
            </AlertDescription>
          </Alert>
        </AnimatedSection>

        {/* 4. Gaussian Density Model */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Gaussian Density Model</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Define Helper Functions</h3>
              <CodeSnippet 
                title="Gaussian Estimation Functions"
                code={gaussianFunctionsCode}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Fit Model</h3>
              <CodeSnippet 
                title="Model Fitting"
                code={modelFitCode}
                language="python"
              />
            </div>

            <Alert className="border-electric/20 bg-electric/10">
              <Info className="h-4 w-4 text-electric" />
              <AlertDescription className="text-white">
                <strong>Key Insight:</strong> μ ≈ [13.9, 15.6]; covariance is 2 × 2 matrix capturing feature spread.
              </AlertDescription>
            </Alert>
          </div>
        </AnimatedSection>

        {/* 5. Threshold Tuning */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Threshold Tuning via Cross-Validation</h2>
          <p className="text-muted-foreground mb-6">Sweep ε over 1,000 steps; choose ε that maximises F1 on CV labels.</p>
          
          <div className="space-y-6">
            <CodeSnippet 
              title="Threshold Selection Function"
              code={thresholdTuningCode}
              language="python"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard 
                title="Best F1 Score"
                value="0.88"
                icon={BarChart3}
                description="Cross-validation performance"
              />
              <MetricCard 
                title="Optimal Epsilon"
                value="9.0e-05"
                icon={Target}
                description="Selected threshold value"
              />
            </div>

            <Card className="bg-secondary/50 border-accent/20">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  ⚠️ Note: sklearn may show warnings about F1 score calculation with imbalanced classes.
                </p>
              </CardContent>
            </Card>

            <Alert className="border-electric/20 bg-electric/10">
              <Info className="h-4 w-4 text-electric" />
              <AlertDescription className="text-white">
                <strong>Key Insight:</strong> Automated sweep avoids hand-picking ε; small ε retains only densest 95%.
              </AlertDescription>
            </Alert>
          </div>
        </AnimatedSection>

        {/* 6. Outlier Visualization */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Outlier Visualization</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeSnippet 
              title="Anomaly Detection & Plotting"
              code={outlierVisualizationCode}
              language="python"
            />
            
            <AnomalyChart 
              title="Figure 2: Detected Anomalies"
              type="gaussian"
              description="Blue: normal points, Red: detected anomalies"
            />
          </div>

          <Alert className="mt-6 border-electric/20 bg-electric/10">
            <Info className="h-4 w-4 text-electric" />
            <AlertDescription className="text-white">
              <strong>Key Insight:</strong> Red points align with extreme latency or throughput, validating threshold.
            </AlertDescription>
          </Alert>
        </AnimatedSection>

        {/* 7. One-Class SVM Baseline */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">One-Class SVM Baseline</h2>
          <p className="text-muted-foreground mb-6">Compare param-free density model with kernel SVM.</p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeSnippet 
                title="One-Class SVM Implementation"
                code={svmCode}
                language="python"
              />
              
              <AnomalyChart 
                title="Figure 3: SVM Decision Result"
                type="svm"
                description="SVM-based anomaly detection results"
              />
            </div>

            <Card className="bg-secondary border-accent/20">
              <CardHeader>
                <CardTitle className="text-white">Gaussian vs One-Class SVM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <div>• <strong>Assumption:</strong> parametric vs kernel</div>
                  <div>• <strong>Tuning:</strong> ε vs ν/γ</div>
                  <div>• <strong>Speed:</strong> O(n) vs O(n²)</div>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-electric/20 bg-electric/10">
              <Info className="h-4 w-4 text-electric" />
              <AlertDescription className="text-white">
                <strong>Key Insight:</strong> SVM spots similar points, but kernel choice & ν control false-positive rate.
              </AlertDescription>
            </Alert>
          </div>
        </AnimatedSection>

        {/* 8. Results & Takeaways */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Results & Takeaways</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-secondary border-accent/20">
              <CardHeader>
                <CardTitle className="text-white">Key Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>• Gaussian + tuned ε yielded F1 0.88 on CV</div>
                <div>• One-Class SVM flagged 5% outliers by design</div>
                <div>• Overlap ≈ 80% with Gaussian picks</div>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-accent/20">
              <CardHeader>
                <CardTitle className="text-white">Conclusions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>• Gaussian provides interpretable density for low-dimensional data</div>
                <div>• SVM useful when shape is non-elliptical</div>
                <div>• Both methods complement each other well</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-secondary border-accent/20">
            <CardHeader>
              <CardTitle className="text-white">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <div>• Scale to &gt; 2 features for higher-dimensional analysis</div>
                <div>• Try Isolation Forest for tree-based anomaly detection</div>
                <div>• Automate ε search with Bayesian optimization</div>
                <div>• Deploy model for real-time server monitoring</div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Call to Action */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button className="bg-electric text-charcoal hover:bg-white" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Notebook
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
          <Button variant="outline" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Share2 className="mr-2 h-4 w-4" />
              Share Project
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetection;
