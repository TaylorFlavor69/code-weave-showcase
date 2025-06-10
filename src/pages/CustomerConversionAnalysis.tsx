
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Code, BarChart3, Target, Brain, Database, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CodeSnippet from '@/components/CodeSnippet';
import EDAChart from '@/components/EDAChart';
import ModelMetrics from '@/components/ModelMetrics';
import ConfusionMatrix from '@/components/ConfusionMatrix';
import MetricCard from '@/components/MetricCard';

const CustomerConversionAnalysis: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const project = {
    id: 7,
    title: "Customer Conversion Analysis",
    subtitle: "Exploring and predicting customer conversion using behavioral data and machine learning models.",
    tags: ["Python", "EDA", "Machine Learning", "Classification", "Random Forest", "Model Comparison", "Plotly"],
    github: "https://github.com",
    demo: "https://demo.com"
  };

  // Sample data for charts
  const genderData = [
    { name: 'Male', value: 42.3 },
    { name: 'Female', value: 57.7 }
  ];

  const cityData = [
    { name: 'Islamabad', value: 35.2 },
    { name: 'Karachi', value: 38.1 },
    { name: 'Lahore', value: 26.7 }
  ];

  const scatterData = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 20 + 1,
    y: Math.random() * 60 + 10,
    conversion: Math.random() > 0.7 ? 'Converted' : 'Not Converted'
  }));

  const leadSourceData = [
    { name: 'Email', value: 28.5 },
    { name: 'Organic', value: 31.2 },
    { name: 'Social Media', value: 19.8 },
    { name: 'Paid Ads', value: 20.5 }
  ];

  const preprocessingCode = `# Data Preprocessing
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load the dataset
df = pd.read_csv('customer_data.csv')

# Check for null values and duplicates
print(f"Null values: {df.isnull().sum().sum()}")
print(f"Duplicates: {df.duplicated().sum()}")

# Label encode categorical variables
le = LabelEncoder()
categorical_cols = ['Gender', 'City', 'LeadSource', 'Device', 'ReferralSource']

for col in categorical_cols:
    df[col] = le.fit_transform(df[col])

# Drop LeadID and prepare features
X = df.drop(['LeadID', 'Conversion'], axis=1)
y = df['Conversion']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)`;

  const modelTrainingCode = `# Model Training and Evaluation
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB, BernoulliNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Naive Bayes': GaussianNB(),
    'Bernoulli NB': BernoulliNB(),
    'KNN': KNeighborsClassifier(n_neighbors=5)
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    results[name] = {
        'model': model,
        'accuracy': accuracy,
        'predictions': y_pred
    }
    print(f"{name} Accuracy: {accuracy:.4f}")`;

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
                This project analyzes customer interaction data from a fictional e-commerce site, StuffMart, to identify patterns in lead conversion. With over 100,000 entries, we use visual analytics and classification algorithms to investigate engagement behaviors and predict conversion likelihood. Multiple models were trained, evaluated, and compared based on accuracy and F1 scores.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Interactive Visuals Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Interactive Visuals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <EDAChart 
              title="Conversion by Gender"
              type="bar"
              data={genderData}
              description="Gender distribution in conversion data"
            />
            <EDAChart 
              title="Conversion by City"
              type="pie"
              data={cityData}
              description="City-wise conversion breakdown"
            />
            <EDAChart 
              title="Lead Source Distribution"
              type="pie"
              data={leadSourceData}
              description="Distribution of lead sources"
            />
            <EDAChart 
              title="Pages Viewed vs Time Spent"
              type="scatter"
              data={scatterData}
              description="Relationship between engagement metrics"
            />
            <div className="lg:col-span-2">
              <CodeSnippet 
                title="Data Preprocessing Pipeline"
                code={preprocessingCode}
                language="python"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Model Evaluation Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Model Evaluation</h2>
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
              <TabsTrigger value="confusion">Confusion Matrices</TabsTrigger>
              <TabsTrigger value="insights">Feature Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ModelMetrics 
                  modelName="Random Forest"
                  accuracy={0.9996}
                  precision={0.999}
                  recall={0.998}
                  f1Score={0.999}
                  isTopPerformer={true}
                />
                <ModelMetrics 
                  modelName="Logistic Regression"
                  accuracy={0.854}
                  precision={0.823}
                  recall={0.801}
                  f1Score={0.812}
                />
                <ModelMetrics 
                  modelName="Naive Bayes"
                  accuracy={0.789}
                  precision={0.756}
                  recall={0.743}
                  f1Score={0.749}
                />
                <ModelMetrics 
                  modelName="Bernoulli NB"
                  accuracy={0.823}
                  precision={0.798}
                  recall={0.776}
                  f1Score={0.787}
                />
                <ModelMetrics 
                  modelName="KNN"
                  accuracy={0.867}
                  precision={0.845}
                  recall={0.834}
                  f1Score={0.839}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="confusion" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ConfusionMatrix 
                  title="Random Forest"
                  matrix={[[9823, 4], [8, 9845]]}
                  labels={['No', 'Yes']}
                />
                <ConfusionMatrix 
                  title="Logistic Regression"
                  matrix={[[8456, 1371], [1543, 8310]]}
                  labels={['No', 'Yes']}
                />
                <ConfusionMatrix 
                  title="KNN"
                  matrix={[[8734, 1093], [1267, 8586]]}
                  labels={['No', 'Yes']}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="Top Conversion City"
                  value="Karachi"
                  icon={Target}
                  description="38.1% of all conversions"
                />
                <MetricCard 
                  title="Best Lead Source"
                  value="Organic"
                  icon={TrendingUp}
                  description="31.2% conversion rate"
                />
                <MetricCard 
                  title="Avg Time Spent"
                  value="18.4 min"
                  icon={BarChart3}
                  description="For converted customers"
                />
                <MetricCard 
                  title="Hot Lead Conv."
                  value="89.3%"
                  icon={Brain}
                  description="Hot leads convert at 89.3%"
                />
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>

        {/* Details Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Technical Details</h2>
          <div className="space-y-4">
            {[
              {
                id: "data-preprocessing",
                title: "Data Preprocessing",
                content: "Label encoding of categorical fields (Gender, City, LeadSource, Device, ReferralSource). Confirmation of no null values or duplicates in the dataset. Feature selection by dropping LeadID as it's not predictive."
              },
              {
                id: "feature-selection",
                title: "Feature Selection & Engineering",
                content: "Analysis of correlation matrix to identify key features. Time spent, pages viewed, and lead temperature emerged as strong predictors. Device type and referral source showed moderate correlation with conversion."
              },
              {
                id: "model-training",
                title: "Model Training & Evaluation",
                content: "Training/testing split with 80/20 ratio. Multiple algorithms tested: Logistic Regression, Random Forest, Gaussian NB, Bernoulli NB, and KNN. Evaluation based on accuracy, precision, recall, and F1 scores."
              },
              {
                id: "model-comparison",
                title: "Model Comparison",
                content: "Random Forest achieved the highest performance with 99.96% accuracy and 0.999 F1 score for class 1. The model effectively captured non-linear relationships and feature interactions that simpler models missed."
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
              "Random Forest outperformed all other models in both accuracy and balanced classification",
              "Leads from Lahore, Islamabad, and Karachi dominate conversion activity",
              "Email and Organic lead sources produced highest conversions",
              "More time spent and more pages viewed correlated with conversion",
              "Hot leads were significantly more likely to convert",
              "Visual validation revealed clear patterns in customer behavior"
            ].map((takeaway, index) => (
              <Card key={index} className="bg-secondary border-accent/20">
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{takeaway}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Code Section */}
        <AnimatedSection className="mb-12">
          <CodeSnippet 
            title="Model Training Pipeline"
            code={modelTrainingCode}
            language="python"
          />
        </AnimatedSection>

        {/* Call to Action */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button className="bg-electric text-charcoal hover:bg-white" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              Explore Full Notebook
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Brain className="mr-2 h-4 w-4" />
              Try Model Live
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
            <Link to="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerConversionAnalysis;
