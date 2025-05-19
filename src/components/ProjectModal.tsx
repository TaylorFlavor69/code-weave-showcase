
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export interface ProjectData {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  embedUrl?: string;
}

interface ProjectModalProps {
  project: ProjectData;
  children: React.ReactNode;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl bg-secondary border-none text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.shortDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="aspect-video overflow-hidden rounded-md bg-muted mb-6">
            {project.embedUrl ? (
              <iframe 
                src={project.embedUrl} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title={project.title}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <img 
                  src={project.image || '/placeholder.svg'} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="mb-6 text-muted-foreground" dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <Badge key={index} className="bg-accent/30 text-white">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <Button variant="outline" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repo
                </a>
              </Button>
            )}
            {project.demo && (
              <Button className="bg-electric text-charcoal hover:bg-white" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
