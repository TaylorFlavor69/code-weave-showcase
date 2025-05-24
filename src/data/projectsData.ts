
import { ProjectData } from '@/components/ProjectModal';

export const projects: ProjectData[] = [
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
    `,
    image: "/placeholder.svg",
    tags: ["Python", "PandasAI", "OpenAI", "Gemini", "Data Visualization"],
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

export interface TagCategory {
  name: string;
  tags: string[];
  color?: string;
}

export const tagCategories: TagCategory[] = [
  {
    name: "Languages",
    tags: ["Python", "R", "SQL"],
    color: "text-blue-400 border-blue-400"
  },
  {
    name: "Tools / Libraries",
    tags: ["Plotly", "XGBoost", "BERT", "Transformers", "Prophet", "LSTM", "Flask", "FastAPI", "Dash", "PandasAI"],
    color: "text-green-400 border-green-400"
  },
  {
    name: "Systems / Platforms",
    tags: ["AWS", "Kafka", "Airflow", "OpenAI", "Gemini"],
    color: "text-purple-400 border-purple-400"
  },
  {
    name: "Subject Areas",
    tags: ["Machine Learning", "NLP", "Time Series", "Data Visualization"],
    color: "text-orange-400 border-orange-400"
  }
];
