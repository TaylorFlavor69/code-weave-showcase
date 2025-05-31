
import React from 'react';
import { ArrowLeft, BarChart3, TrendingUp, Users, Target, TestTube, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const CustomerConversionAnalysis = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Customer Journey Mapping",
      description: "Comprehensive mapping of customer touchpoints and conversion paths to identify key interaction moments."
    },
    {
      icon: TrendingUp,
      title: "Predictive Modeling",
      description: "Machine learning models to predict conversion probability and identify high-value prospects."
    },
    {
      icon: TestTube,
      title: "A/B Testing Framework",
      description: "Integrated testing platform for optimization strategies with statistical significance validation."
    },
    {
      icon: BarChart3,
      title: "Interactive Dashboards",
      description: "Real-time visualization dashboards for business stakeholders with customizable metrics."
    },
    {
      icon: Target,
      title: "Conversion Optimization",
      description: "Automated recommendations for improving conversion rates based on data-driven insights."
    },
    {
      icon: Database,
      title: "Data Pipeline",
      description: "Scalable ETL pipeline for processing customer interaction data from multiple sources."
    }
  ];

  const technologies = [
    "Python",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Plotly",
    "Dash",
    "PostgreSQL",
    "Apache Airflow",
    "Docker",
    "AWS"
  ];

  const results = [
    {
      metric: "25%",
      description: "Improvement in overall conversion rates"
    },
    {
      metric: "40%",
      description: "Reduction in customer acquisition cost"
    },
    {
      metric: "15%",
      description: "Increase in customer lifetime value"
    },
    {
      metric: "60%",
      description: "Faster identification of bottlenecks"
    }
  ];

  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 text-electric hover:text-white hover:bg-electric/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Customer Conversion <span className="text-electric">Analysis</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Advanced analytics platform for customer journey optimization and conversion rate improvement through data-driven insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-electric text-charcoal hover:bg-white">
                View Demo
              </Button>
              <Button variant="outline" className="border-electric text-electric hover:bg-electric hover:text-charcoal">
                GitHub Repository
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/17034ede-35a8-419a-8666-1abf4b00bb9d.png"
              alt="Customer Conversion Analysis Funnel"
              className="max-w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-graphite border-electric/20 hover:border-electric/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-electric" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Results & Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <Card key={index} className="bg-graphite border-electric/20 text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-electric mb-2">{result.metric}</div>
                  <p className="text-muted-foreground">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-graphite border border-electric/30 rounded-full text-sm hover:border-electric/60 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Implementation Details */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-graphite border-electric/20">
              <CardHeader>
                <CardTitle className="text-electric">Technical Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Collection & Processing</h4>
                  <p className="text-muted-foreground text-sm">
                    Built scalable ETL pipelines using Apache Airflow to process customer interaction data from web analytics, CRM systems, and transaction databases.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Machine Learning Models</h4>
                  <p className="text-muted-foreground text-sm">
                    Implemented ensemble methods including Random Forest and XGBoost for conversion prediction, with feature engineering for behavioral patterns.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Real-time Analytics</h4>
                  <p className="text-muted-foreground text-sm">
                    Deployed interactive Dash applications with real-time data visualization and automated alert systems for conversion anomalies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-graphite border-electric/20">
              <CardHeader>
                <CardTitle className="text-electric">Business Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Conversion Optimization</h4>
                  <p className="text-muted-foreground text-sm">
                    Identified key bottlenecks in the customer journey, enabling targeted optimization strategies that improved overall conversion rates by 25%.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cost Reduction</h4>
                  <p className="text-muted-foreground text-sm">
                    Optimized marketing spend allocation based on conversion probability scores, reducing customer acquisition costs by 40%.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Strategic Insights</h4>
                  <p className="text-muted-foreground text-sm">
                    Provided actionable insights to product and marketing teams, enabling data-driven decision making for feature development and campaign optimization.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerConversionAnalysis;
