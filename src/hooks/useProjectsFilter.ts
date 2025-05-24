
import { useState, useMemo } from 'react';
import { projects, tagCategories } from '@/data/projectsData';

export const useProjectsFilter = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Extract all unique tags from projects
  const allTags = useMemo(() => 
    Array.from(new Set(projects.flatMap(project => project.tags))), 
    []
  );
  
  // Filter tags that are actually used in projects
  const usedTagsByCategory = useMemo(() => 
    tagCategories.map(category => ({
      ...category,
      tags: category.tags.filter(tag => allTags.includes(tag))
    })).filter(category => category.tags.length > 0),
    [allTags]
  );
  
  // Get filtered projects based on active filters
  const filteredProjects = useMemo(() => 
    activeFilters.length
      ? projects.filter(project => 
          activeFilters.some(filter => project.tags.includes(filter))
        )
      : projects,
    [activeFilters]
  );

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  // Get background color class based on category
  const getTagColorClass = (tag: string) => {
    for (const category of tagCategories) {
      if (category.tags.includes(tag)) {
        return category.color;
      }
    }
    return "text-gray-400 border-gray-400"; // Default color
  };

  // Toggle category dropdown
  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return {
    activeFilters,
    openCategory,
    usedTagsByCategory,
    filteredProjects,
    toggleFilter,
    clearFilters,
    getTagColorClass,
    toggleCategory
  };
};
