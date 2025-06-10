
import React from 'react';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectOverview from '@/components/project/ProjectOverview';
import InteractiveVisuals from '@/components/project/InteractiveVisuals';
import ModelEvaluationSection from '@/components/project/ModelEvaluationSection';
import TechnicalDetails from '@/components/project/TechnicalDetails';
import KeyTakeaways from '@/components/project/KeyTakeaways';
import ProjectCallToAction from '@/components/project/ProjectCallToAction';
import CodeSnippet from '@/components/CodeSnippet';
import AnimatedSection from '@/components/AnimatedSection';

const CustomerConversionAnalysis: React.FC = () => {
  const project = {
    title: "Customer Conversion Analysis",
    subtitle: "Exploring and predicting customer conversion using behavioral data and machine learning models.",
    tags: ["Python", "EDA", "Machine Learning", "Classification", "Random Forest", "Model Comparison", "Plotly"],
    github: "https://github.com",
    demo: "https://demo.com"
  };

  const overviewContent = "This project analyzes customer interaction data from a fictional e-commerce site, StuffMart, to identify patterns in lead conversion. With over 100,000 entries, we use visual analytics and classification algorithms to investigate engagement behaviors and predict conversion likelihood. Multiple models were trained, evaluated, and compared based on accuracy and F1 scores.";

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

  const technicalSections = [
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
  ];

  const takeaways = [
    "Random Forest outperformed all other models in both accuracy and balanced classification",
    "Leads from Lahore, Islamabad, and Karachi dominate conversion activity",
    "Email and Organic lead sources produced highest conversions",
    "More time spent and more pages viewed correlated with conversion",
    "Hot leads were significantly more likely to convert",
    "Visual validation revealed clear patterns in customer behavior"
  ];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-charcoal min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <ProjectHeader 
          title={project.title}
          subtitle={project.subtitle}
          tags={project.tags}
        />

        <ProjectOverview content={overviewContent} />

        <InteractiveVisuals 
          genderData={genderData}
          cityData={cityData}
          leadSourceData={leadSourceData}
          scatterData={scatterData}
          preprocessingCode={preprocessingCode}
        />

        <ModelEvaluationSection />

        <TechnicalDetails sections={technicalSections} />

        <KeyTakeaways takeaways={takeaways} />

        <AnimatedSection className="mb-12">
          <CodeSnippet 
            title="Model Training Pipeline"
            code={modelTrainingCode}
            language="python"
          />
        </AnimatedSection>

        <ProjectCallToAction 
          githubUrl={project.github}
          demoUrl={project.demo}
          notebookUrl="#"
        />
      </div>
    </div>
  );
};

export default CustomerConversionAnalysis;
