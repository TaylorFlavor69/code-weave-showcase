
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectData } from './ProjectModal';

interface ProjectCardProps {
  project: ProjectData;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or links
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    navigate(`/project/${project.id}`);
  };

  return (
    <Card 
      className="bg-secondary hover:bg-secondary/80 border-none h-full flex flex-col card-hover animate-fade-in-up cursor-pointer" 
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-muted-foreground">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" asChild>
          <Link to={`/project/${project.id}`}>View Details</Link>
        </Button>
        <div className="flex gap-2">
          {project.github && (
            <Button size="icon" variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.demo && (
            <Button size="icon" variant="outline" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
