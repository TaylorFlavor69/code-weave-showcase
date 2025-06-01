
import { ProjectData } from '@/components/ProjectModal';

export const projects: ProjectData[] = [
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
    demo: "/data-visualization-agent"
  },
  {
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
    `,
    image: "/lovable-uploads/f129c379-fae4-4af1-9389-0581fd47ff66.png",
    tags: ["Python", "Machine Learning", "Anomaly Detection", "Statistical Analysis", "Data Pipeline"],
    github: "https://github.com",
    demo: "/anomaly-detection"
  },
  {
    id: 7,
    title: "Customer Conversion Analysis",
    shortDescription: "Advanced analytics platform for customer journey optimization",
    fullDescription: `
      <p>Developed an advanced analytics platform that analyzes customer conversion patterns and optimizes conversion rates through data-driven insights.</p>
      <ul class="list-disc pl-6 space-y-2 mt-2">
        <li>Customer journey mapping and conversion funnel analysis</li>
        <li>Predictive modeling for conversion probability</li>
        <li>A/B testing framework for optimization strategies</li>
        <li>Interactive dashboards for business stakeholders</li>
        <li>Automated recommendations for conversion optimization</li>
      </ul>
      <p class="mt-4">This platform helped identify key conversion bottlenecks and optimization opportunities, resulting in a 25% improvement in conversion rates.</p>
    `,
    image: "/lovable-uploads/2a304990-f8cc-4dce-b4b9-a150fb5c15e9.png",
    tags: ["Python", "Machine Learning", "Statistical Analysis", "Data Visualization", "A/B Testing"],
    github: "https://github.com",
    demo: "/customer-conversion-analysis"
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
