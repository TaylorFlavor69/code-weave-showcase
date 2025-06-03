
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from './AnimatedSection';

interface Role {
  title: string;
  period: string;
}

interface BulletPoint {
  text: string;
}

interface ExperienceItemProps {
  company: string;
  location?: string;
  roles: Role[];
  description: string;
  bulletPoints: BulletPoint[];
  skills: string[];
  delay: number;
  tenure: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ 
  company,
  location,
  roles, 
  description, 
  bulletPoints,
  skills,
  delay,
  tenure
}) => {
  return (
    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <Card className="bg-secondary border-none card-hover">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <CardTitle className="text-xl md:text-2xl text-white mb-1">
                {company}
              </CardTitle>
              <CardDescription className="flex items-center text-lg">
                {location && (
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-electric" /> 
                    {location}
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{tenure}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 mb-4">
            {roles.map((role, index) => (
              <div key={index}>
                <h4 className="text-lg font-medium text-white">{role.title}</h4>
              </div>
            ))}
          </div>
          
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {bulletPoints.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
              {bulletPoints.map((point, idx) => (
                <li key={idx}>{point.text}</li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} className="bg-electric/20 hover:bg-electric text-electric hover:text-charcoal cursor-pointer">
                {skill}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Premier Inc",
      location: "Remote (NC)",
      tenure: "Apr 2022 - Present",
      roles: [
        { title: "Business Technical Analyst", period: "Jan 2025 - Present" },
        { title: "Data Acquisition Analyst", period: "Apr 2022 - Dec 2024" }
      ],
      description: "Began in a data engineering role within the Advisory department, focused on managing data migrations and ETL processes from various Member source systems into proprietary ERP or analytics platforms. Later transitioned into a hybrid position, supporting both ongoing data engineering efforts and developing new data solutions within the Analytics Hub in collaboration with the Business Intelligence team.",
      bulletPoints: [
        { text: "Supported the Analytics Hub product by integrating internal and external systems, enabling up to 43% reduction in procurement operations costs for some Member organizations." },
        { text: "Led AI and automation initiatives centered on LLMs, RAG, and AI agents, addressing key functional gaps and accelerating productivity." },
        { text: "Collaborated cross-functionally with Advisory, BI, Supply Chain, offshore teams, and external partners to align business strategies and deliver scalable data solutions." },
        { text: "Built ML models in Python to enhance field mapping and data matching, improving ERP conversion accuracy and reducing manual intervention." },
        { text: "Automated repetitive workflows using Python, SQL, and Shell scripting, improving reliability and cutting down error-prone manual tasks." },
        { text: "Engineered and maintained ETL pipelines using Python, SQL, Ab Initio, and APIs (SOAP, REST, RAAS) for secure cloud migration to Azure ADLS and BigQuery." },
        { text: "Created and maintained internal documentation and a knowledge base to promote onboarding efficiency and cross-team transparency." },
        { text: "Developed a scalable, automated demo database to support always-on product demonstrations." },
        { text: "Delivered production-ready workflows and scripts in Python, PowerShell, and SQL for recurring analytics and reporting use cases." },
        { text: "Regularly presented complex project updates to stakeholders, including executives and business leads, in clear, actionable formats." }
      ],
      skills: ["Python", "ML/AI", "SQL", "Azure", "BigQuery", "LLMs", "ETL", "PowerShell", "Documentation"]
    },
    {
      company: "Sidley Austin LLP",
      location: "Chicago, IL",
      tenure: "Mar 2021 - Apr 2022",
      roles: [
        { title: "DevOps Analyst", period: "Mar 2021 - Apr 2022" }
      ],
      description: "Joined the Litigation Support department at the sixth-largest law firm globally, focusing on systems automation and infrastructure to enhance operational efficiency and accuracy across departments.",
      bulletPoints: [
        { text: "Managed and automated tasks across 90+ servers containing sensitive client data using Python, PowerShell, JavaScript, and SQL." },
        { text: "Conducted system maintenance and server restarts to ensure uptime and performance." },
        { text: "Refactored 1,000+ SQL objects to align with new billing logic, improving data quality and system integrity." },
        { text: "Supported and extended the client billing platform using C#, improving billing operations." },
        { text: "Streamlined billing processes and eDiscovery workflows, increasing throughput and clarity." },
        { text: "Provided frontline technical troubleshooting to both technical and non-technical users, minimizing business disruptions." },
        { text: "Created user-friendly tools and forms that empowered users to complete secure, complex operations independently." },
        { text: "Enforced data security, governance, and compliance standards across all environments, ensuring proper data retention and ethical usage practices." },
        { text: "Designed and implemented autonomous QA and validation workflows, reducing risk of human error and enhancing both technical accuracy and procedural integrity." },
        { text: "Collaborated with senior developers to execute both short-term priorities and long-term roadmap initiatives, supporting scalable and sustainable DevOps strategies." },
        { text: "Extended functionality within the GDE (Graphical Development Environment) by leveraging JavaScript, enabling advanced workflows and empowering power users." }
      ],
      skills: ["Python", "PowerShell", "SQL", "C#", "JavaScript", "Automation"]
    },
    {
      company: "ALDI Inc",
      location: "Batavia, IL",
      tenure: "Apr 2019 - Mar 2021",
      roles: [
        { title: "IT Specialist", period: "Dec 2019 - Mar 2021" },
        { title: "Systems and Data Analyst", period: "Apr 2019 - Dec 2019" }
      ],
      description: "Joined in a contract role and was promoted to a senior team member within seven months. Worked with the newly formed Customer Interaction department, where I helped establish foundational systems and processes in a highly ambiguous environment.",
      bulletPoints: [
        { text: "Became Subject Matter Expert for 13 internal systems; promoted to senior role within first year." },
        { text: "Provided technical support to 80+ non-technical users, ensuring smooth use of internal applications." },
        { text: "Identified gaps in data collection and improved workflows for greater clarity and reliability." },
        { text: "Used R to perform sentiment analysis on customer feedback, delivering actionable insights." },
        { text: "Built automation scripts in C# and VBA to enhance CRM system efficiency and reduce manual tasks." },
        { text: "Played a key role in CRM system rollovers, ensuring seamless transitions and minimal disruption." },
        { text: "Analyzed customer journey data to identify friction points and improve handling processes, enhancing overall customer experience and operational efficiency." },
        { text: "Delivered insightful data visualizations and dashboards to senior leadership, translating complex behavioral patterns into clear, actionable narratives." },
        { text: "Collaborated cross-functionally with operations and support teams to align customer feedback with process improvements and service delivery goals." },
        { text: "Utilized tools like Excel, Power BI and Tableau to uncover trends in customer interactions and guide strategic decision-making." }
      ],
      skills: ["R", "C#", "VBA", "SQL", "CRM", "Technical Support", "Data Analysis", "Process Improvement"]
    }
  ];

  return (
    <AnimatedSection id="experience" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Experience</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          My professional journey in transforming data into actionable insights and solutions.
        </p>
        
        <div className="mt-12">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              company={exp.company}
              location={exp.location}
              roles={exp.roles}
              description={exp.description}
              bulletPoints={exp.bulletPoints}
              skills={exp.skills}
              delay={index * 200}
              tenure={exp.tenure}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
