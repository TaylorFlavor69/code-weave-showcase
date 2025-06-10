
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Github, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCallToActionProps {
  githubUrl?: string;
  demoUrl?: string;
  notebookUrl?: string;
}

const ProjectCallToAction: React.FC<ProjectCallToActionProps> = ({
  githubUrl,
  demoUrl,
  notebookUrl
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      <Button className="bg-electric text-charcoal hover:bg-white" asChild>
        <a href={notebookUrl || "#"} target="_blank" rel="noopener noreferrer">
          <Code className="mr-2 h-4 w-4" />
          Explore Full Notebook
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href={demoUrl || "#"} target="_blank" rel="noopener noreferrer">
          <Brain className="mr-2 h-4 w-4" />
          Try Model Live
        </a>
      </Button>
      {githubUrl && (
        <Button variant="outline" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
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
  );
};

export default ProjectCallToAction;
