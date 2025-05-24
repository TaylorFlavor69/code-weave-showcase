
import React from 'react';
import AnimatedSection from './AnimatedSection';
import ProjectsFilter from './ProjectsFilter';
import ProjectsGrid from './ProjectsGrid';
import { useProjectsFilter } from '@/hooks/useProjectsFilter';

const Projects: React.FC = () => {
  const {
    activeFilters,
    openCategory,
    usedTagsByCategory,
    filteredProjects,
    toggleFilter,
    clearFilters,
    getTagColorClass,
    toggleCategory
  } = useProjectsFilter();

  return (
    <AnimatedSection id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
          A selection of my data science and machine learning projects.
        </p>
        
        <ProjectsFilter
          usedTagsByCategory={usedTagsByCategory}
          activeFilters={activeFilters}
          openCategory={openCategory}
          onToggleFilter={toggleFilter}
          onClearFilters={clearFilters}
          onToggleCategory={toggleCategory}
          getTagColorClass={getTagColorClass}
        />
        
        <ProjectsGrid
          filteredProjects={filteredProjects}
          onClearFilters={clearFilters}
        />
      </div>
    </AnimatedSection>
  );
};

export default Projects;
