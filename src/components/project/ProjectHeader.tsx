
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectHeaderProps {
  title: string;
  subtitle: string;
  tags: string[];
  backLink?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  title, 
  subtitle, 
  tags, 
  backLink = "/#projects" 
}) => {
  return (
    <div className="mb-8">
      <Link to={backLink} className="inline-flex items-center text-electric hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      <p className="text-xl text-muted-foreground mb-4">{subtitle}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <Badge key={index} className="bg-accent/30 text-white">{tag}</Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectHeader;
