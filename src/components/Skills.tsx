
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Code, 
  Cloud, 
  Cpu, 
  Database, 
  LineChart, 
  Share2, 
  Terminal, 
  MessageSquare, 
  Users, 
  Award,
  Boxes,
  BarChart,
  FileCode,
  Globe,
  Library,
  FolderGit,
  LayoutDashboard,
  Brain,
  Bot,
  PenTool,
  Clock,
  Layers,
  ScrollText,
  FileSpreadsheet
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface SkillProps {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const SkillItem: React.FC<SkillProps> = ({ name, icon, description }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 text-electric">
          {icon}
        </div>
        <h4 className="text-lg font-medium">{name}</h4>
      </div>
      <p className="text-muted-foreground pl-11">{description}</p>
    </div>
  );
};

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillProps[];
  defaultOpen?: boolean;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  icon, 
  description, 
  skills,
  defaultOpen = false 
}) => {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? title : undefined}>
      <AccordionItem value={title} className="border-b border-muted/20">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4 text-electric">
              {icon}
            </div>
            <h3 className="text-xl font-medium">{title}</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-2 pb-4">
            <p className="text-muted-foreground mb-6">{description}</p>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillItem
                  key={index}
                  name={skill.name}
                  icon={skill.icon}
                  description={skill.description}
                />
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code className="h-5 w-5" />,
      description: "Programming languages and frameworks I've mastered for data science and machine learning.",
      skills: [
        { 
          name: "Python", 
          icon: <Code className="h-4 w-4" />,
          description: "Python is central to my data science and automation work. I regularly use libraries like Pandas and NumPy for data wrangling, Plotly and Matplotlib for visualization, Scikit-learn and XGBoost for predictive modeling, and TensorFlow for deep learning. From quick scripts to end-to-end ML pipelines, Python powers much of my analytical toolkit."
        },
        { 
          name: "R", 
          icon: <Terminal className="h-4 w-4" />,
          description: "I used R extensively at Aldi, particularly for processing large volumes of customer feedback. I developed sentiment analysis models to extract insights from unstructured text and support customer experience initiatives."
        },
        { 
          name: "SQL", 
          icon: <Database className="h-4 w-4" />,
          description: "I write performance-optimized SQL across platforms like BigQuery, Teradata, and SQL Server. My experience includes CTEs, cursors, stored procedures, error handling, and advanced joins, supporting everything from data cleaning to real-time dashboards."
        },
        { 
          name: "C#", 
          icon: <FileCode className="h-4 w-4" />,
          description: "I've used C# in enterprise settings for API development, internal tooling, and integration with legacy systems—particularly within Aldi's contact management environment. It's been valuable for building efficient, scalable internal applications."
        },
        { 
          name: "PowerShell", 
          icon: <Terminal className="h-4 w-4" />,
          description: "PowerShell has supported many of my automation efforts, from file system operations to scheduled jobs. I used it extensively at Sidley Austin and continue to rely on it for system-level scripting in Windows-based environments."
        },
        { 
          name: "JavaScript", 
          icon: <Code className="h-4 w-4" />,
          description: "I've used JavaScript to enhance web applications, enabling PMs, specialists, and techs to perform more operations through intuitive browser-based forms. It's a useful tool for bridging backend processes with simple, accessible interfaces."
        },
        { 
          name: "VBA", 
          icon: <FileSpreadsheet className="h-4 w-4" />,
          description: "At Aldi, I used VBA to automate reporting and streamline manual workflows within Excel. I often leveraged it as a stepping stone before transitioning teams to more scalable data tools and platforms."
        },
        { 
          name: "HTML/CSS", 
          icon: <Globe className="h-4 w-4" />,
          description: "I use HTML and CSS for structuring and styling web content, from personal portfolio pages to interactive dashboard components. Clean, accessible design is key to how I communicate insights visually."
        }
      ],
      defaultOpen: true
    },
    {
      title: "Cloud & Platforms",
      icon: <Cloud className="h-5 w-5" />,
      description: "Cloud platforms and services I use for deploying and scaling data science solutions.",
      skills: [
        { 
          name: "AWS (S3, Lambda)", 
          icon: <Cloud className="h-4 w-4" />,
          description: "I've used AWS S3 for storage of structured and semi-structured data in data engineering workflows, and Lambda to execute lightweight, serverless tasks as part of ETL pipelines."
        },
        { 
          name: "Workday", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          description: "I've integrated with Workday's web services to extract procurement, HR, and financial data—building SOAP-based integrations and managing role-based access through security groups for downstream use in analytics and reporting."
        },
        { 
          name: "Infor Cloudsuite", 
          icon: <Boxes className="h-4 w-4" />,
          description: "Within Infor Cloudsuite (especially FSM and Supply Chain), I've worked with RAAS and Infor Connect to replicate and align data for reporting and AI processing, including logic for ERP data conversions and validation."
        },
        { 
          name: "GCP (BigQuery, Dataflow)", 
          icon: <Database className="h-4 w-4" />,
          description: "BigQuery is my most-used SQL platform for querying at scale, validating LLM output, and supporting analytics dashboards. I pair it with Dataflow for orchestrating ETL across high-volume datasets in production environments."
        },
        { 
          name: "Azure (Databricks, Data Factory, ADLS)", 
          icon: <Share2 className="h-4 w-4" />,
          description: "On Azure, I use Databricks for collaborative analytics and machine learning, Data Factory to orchestrate pipelines across environments, and ADLS for secure storage that supports scalable, query-ready datasets."
        },
        { 
          name: "On-Prem ERP Solutions", 
          icon: <Layers className="h-4 w-4" />,
          description: "I've worked with a range of on-prem ERP systems, supporting data migration and modernization efforts. This includes mapping legacy schemas, writing conversion logic, and building integrations to bring that data into cloud platforms."
        }
      ]
    },
    {
      title: "Databases",
      icon: <Database className="h-5 w-5" />,
      description: "Database technologies I've worked with for data storage and management.",
      skills: [
        { 
          name: "MySQL & SQL Server", 
          icon: <Database className="h-4 w-4" />,
          description: "I've used both in various roles to support transactional systems, reporting tools, and analytics layers. I write optimized queries, stored procedures, and handle performance tuning tasks such as indexing and execution plan review."
        },
        { 
          name: "MongoDB", 
          icon: <Boxes className="h-4 w-4" />,
          description: "I've used MongoDB for personal projects involving semi-structured data. I've integrated it into analytics pipelines and used it for lightweight application backends when flexibility in schema was key."
        },
        { 
          name: "Teradata", 
          icon: <Database className="h-4 w-4" />,
          description: "Teradata has been central to several large-scale reporting and data warehouse solutions. I focus on writing efficient SQL while managing spool space and translating legacy logic into more modern cloud-based platforms."
        }
      ]
    },
    {
      title: "Data Visualization & Modeling",
      icon: <LineChart className="h-5 w-5" />,
      description: "Tools and techniques for data visualization, modeling, and analytics.",
      skills: [
        { 
          name: "Looker", 
          icon: <BarChart className="h-4 w-4" />,
          description: "I build dynamic dashboards in Looker with standardized metrics and self-serve capabilities for end users. Its modeling layer makes it easy to maintain governance while enabling flexibility across teams."
        },
        { 
          name: "Tableau", 
          icon: <LineChart className="h-4 w-4" />,
          description: "Tableau is my primary tool for interactive, exploratory visualizations. I've created dashboards with multi-level filtering, geospatial overlays, and drill-down paths tailored to business questions and performance KPIs."
        },
        { 
          name: "Power BI", 
          icon: <BarChart className="h-4 w-4" />,
          description: "In Microsoft-heavy environments, I rely on Power BI for executive reporting. I use DAX to build calculated measures and work with tabular models to support intuitive visual narratives."
        },
        { 
          name: "DBT (Data Build Tool)", 
          icon: <Terminal className="h-4 w-4" />,
          description: "I'm currently adopting DBT to clean and transform data models. It's quickly becoming a core part of my workflow for defining SQL logic, adding automated tests, and aligning documentation with transformation steps."
        },
        { 
          name: "Plotly Dash", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          description: "Plotly Dash allows me to combine Python-based backends with sleek front-end dashboards. It's ideal for building fully custom apps that integrate predictive models, visualizations, and user input in one streamlined interface."
        },
        { 
          name: "Statistical Modeling", 
          icon: <LineChart className="h-4 w-4" />,
          description: "I use statistical techniques like regression, hypothesis testing, and classification to generate insights and support decision-making. I emphasize transparency and rigor, especially when models guide key business actions."
        },
        { 
          name: "A/B Testing", 
          icon: <Share2 className="h-4 w-4" />,
          description: "I design and evaluate experiments to test hypotheses around UX, marketing, or product changes. My process includes clean experiment design, robust metric tracking, and statistically sound interpretation."
        },
        { 
          name: "Predictive Analytics", 
          icon: <LineChart className="h-4 w-4" />,
          description: "I build models that forecast trends, classify behavior, and recommend actions. I focus on explainability and business impact, using tools like XGBoost, logistic regression, and time series models depending on context."
        }
      ]
    },
    {
      title: "AI Tools",
      icon: <Bot className="h-5 w-5" />,
      description: "AI and machine learning tools I use to enhance productivity and insights.",
      skills: [
        { 
          name: "Gemini Flash API", 
          icon: <Brain className="h-4 w-4" />,
          description: "I use Gemini Flash API for fast, lightweight LLM tasks such as document summarization, contextual lookups, and text classification. It's ideal for embedding AI into automated pipelines where speed and scalability matter."
        },
        { 
          name: "Azure OpenAI", 
          icon: <Cloud className="h-4 w-4" />,
          description: "Azure OpenAI enables me to build secure, enterprise-grade generative AI solutions. I've used it to power internal copilots, enhance search with natural language interfaces, and inject intelligence into workflows—while maintaining compliance."
        },
        { 
          name: "OpenAI Gym", 
          icon: <Bot className="h-4 w-4" />,
          description: "I explore OpenAI Gym to prototype reinforcement learning models and test decision-making logic in controlled environments. It's a great sandbox for developing agents and experimenting with adaptive behavior."
        },
        { 
          name: "GitHub Copilot", 
          icon: <Terminal className="h-4 w-4" />,
          description: "Copilot boosts my development workflow by offering context-aware code suggestions and boilerplate generation. It's particularly helpful for repetitive logic, scripting helpers, or quickly jumping between languages."
        },
        { 
          name: "Pandas AI", 
          icon: <Bot className="h-4 w-4" />,
          description: "Pandas AI brings LLM interaction directly into dataframes. I've used it to speed up exploratory data analysis and rapidly test logic without writing out full transformations, making data interaction more intuitive and conversational."
        },
        { 
          name: "Claude", 
          icon: <MessageSquare className="h-4 w-4" />,
          description: "Claude is my go-to for longer-form, structured LLM output—especially for tasks like summarizing meetings, refining documentation, and breaking down business logic into clear, human-readable narratives."
        },
        { 
          name: "Cursor", 
          icon: <Code className="h-4 w-4" />,
          description: "Cursor blends the familiarity of an IDE with AI-native features like smart refactoring, live explanations, and autocompletion. It's a valuable productivity tool for debugging and writing clean, maintainable code faster."
        },
        { 
          name: "Lovable", 
          icon: <PenTool className="h-4 w-4" />,
          description: "You're seeing the impact of Lovable here—it's my design tool of choice for crafting branded, structured content across my portfolio. I use it to pair strong visuals with polished narratives that represent both my work and personality."
        }
      ]
    },
    {
      title: "Documentation & Collaboration Tools",
      icon: <ScrollText className="h-5 w-5" />,
      description: "Tools I use for documentation, collaboration, and project management.",
      skills: [
        { 
          name: "Notion", 
          icon: <ScrollText className="h-4 w-4" />,
          description: "I use Notion as a centralized hub for project notes, research, and documentation. It helps me structure everything from AI experiments to stakeholder updates, creating a flexible knowledge base that evolves with each initiative."
        },
        { 
          name: "Trello (Kanban)", 
          icon: <Layers className="h-4 w-4" />,
          description: "Trello helps me organize tasks visually and manage project workflows with clarity. I use it for sprint planning, tracking task dependencies, and aligning team activity with larger goals."
        },
        { 
          name: "Monday", 
          icon: <Layers className="h-4 w-4" />,
          description: "I use Monday for more complex project tracking—especially those involving cross-functional teams. Its timeline views and automation features make it ideal for coordinating deadlines, approvals, and deliverables."
        },
        { 
          name: "Smartsheet", 
          icon: <FileSpreadsheet className="h-4 w-4" />,
          description: "Smartsheet bridges traditional spreadsheet functionality with project management. I've used it to manage timelines, resource planning, and cross-team collaboration—especially in implementation and reporting projects."
        },
        { 
          name: "Figma", 
          icon: <PenTool className="h-4 w-4" />,
          description: "Figma is my go-to for designing wireframes, dashboards, and visual prototypes. It allows me to quickly mock up interfaces and communicate design intent before development begins."
        },
        { 
          name: "Visio", 
          icon: <PenTool className="h-4 w-4" />,
          description: "Visio supports my documentation of system architecture, data flows, and entity relationships. I use it to map integrations, clarify backend processes, and align technical diagrams with business goals."
        },
        { 
          name: "Knowledge Base (KB) Documentation", 
          icon: <Library className="h-4 w-4" />,
          description: "I maintain internal KBs to document tools, workflows, and lessons learned. These resources reduce onboarding time, ensure process consistency, and foster self-sufficiency across teams."
        },
        { 
          name: "Git", 
          icon: <FolderGit className="h-4 w-4" />,
          description: "Git is core to how I manage code and collaborate with others. I use it to track changes, manage branches, and ensure version control across scripts, models, and data workflows."
        }
      ]
    },
    {
      title: "Soft Skills",
      icon: <Users className="h-5 w-5" />,
      description: "Professional competencies that enhance my technical expertise and enable successful project delivery and team collaboration.",
      skills: [
        {
          name: "Data Storytelling",
          icon: <MessageSquare className="h-4 w-4" />,
          description: "I distill complex datasets into clear, compelling narratives that resonate with both technical and business audiences. Whether in dashboards, decks, or executive briefs, I focus on making insights accessible and actionable."
        },
        {
          name: "Adaptability",
          icon: <Award className="h-4 w-4" />,
          description: "I stay agile in the face of shifting priorities, tooling, or team needs. Whether learning a new platform or jumping into a project midstream, I adapt quickly and keep progress moving."
        },
        {
          name: "Analytical Problem Solving",
          icon: <Brain className="h-4 w-4" />,
          description: "I approach challenges with structured thinking and data-driven logic. Whether troubleshooting a bug, optimizing a model, or designing a metric, I look for the most efficient and scalable path to resolution."
        },
        {
          name: "Attention to Detail",
          icon: <Award className="h-4 w-4" />,
          description: "Accuracy is non-negotiable when it comes to data. I double-check outputs, validate assumptions, and test thoroughly—ensuring quality at every step."
        },
        {
          name: "Teamwork",
          icon: <Users className="h-4 w-4" />,
          description: "I'm a proactive collaborator who values shared success. I contribute to team discussions, offer support, and build tools or documentation that make others' work easier."
        },
        {
          name: "Creativity",
          icon: <PenTool className="h-4 w-4" />,
          description: "I bring creativity into solution design, visual communication, and problem-solving. Whether experimenting with new modeling approaches or designing a cleaner UI, I enjoy finding elegant, unexpected ways to improve outcomes."
        },
        {
          name: "Time Management",
          icon: <Clock className="h-4 w-4" />,
          description: "I prioritize effectively, break work into manageable pieces, and stay ahead of deadlines. I flag blockers early and focus on steady, high-quality progress across multiple projects."
        },
        {
          name: "Cross-functional Collaboration",
          icon: <Users className="h-4 w-4" />,
          description: "I work comfortably across departments—from engineers and analysts to business stakeholders and executives. I adjust my language and approach based on the audience, keeping everyone aligned and moving forward."
        },
        {
          name: "Stakeholder Communication",
          icon: <MessageSquare className="h-4 w-4" />,
          description: "I tailor updates and recommendations to each audience. Whether writing a Slack update, presenting to leadership, or drafting a product spec, I make complex work digestible and relevant."
        },
        {
          name: "Strategic Decision-Making",
          icon: <Award className="h-4 w-4" />,
          description: "I connect insights to action. Whether evaluating trade-offs, forecasting outcomes, or making product recommendations, I aim to guide smart, forward-looking decisions grounded in data."
        }
      ]
    }
  ];

  return (
    <AnimatedSection id="skills" className="py-20 bg-navy">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          Technologies, frameworks, and methodologies I've mastered throughout my career.
        </p>
        
        <div className="space-y-4">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              icon={category.icon}
              description={category.description}
              skills={category.skills}
              defaultOpen={category.defaultOpen}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
