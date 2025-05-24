
import React from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import { ProjectData } from './ProjectModal';

interface ProjectsGridProps {
  filteredProjects: ProjectData[];
  onClearFilters: () => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ filteredProjects, onClearFilters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} delay={(index % 3) * 100} />
        ))
      ) : (
        <div className="col-span-3 py-12 text-center">
          <h3 className="text-xl text-muted-foreground">No projects match the selected filters</h3>
          <Button onClick={onClearFilters} className="mt-4">Clear all filters</Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
