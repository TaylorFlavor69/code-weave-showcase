
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagCategory } from '@/data/projectsData';

interface ProjectsFilterProps {
  usedTagsByCategory: TagCategory[];
  activeFilters: string[];
  openCategory: string | null;
  onToggleFilter: (tag: string) => void;
  onClearFilters: () => void;
  onToggleCategory: (categoryName: string) => void;
  getTagColorClass: (tag: string) => string;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
  usedTagsByCategory,
  activeFilters,
  openCategory,
  onToggleFilter,
  onClearFilters,
  onToggleCategory,
  getTagColorClass
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Filter by:</h3>
        {activeFilters.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm"
          >
            Clear filters <X className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {usedTagsByCategory.map((category) => (
            <Popover 
              key={category.name} 
              open={openCategory === category.name}
              onOpenChange={() => onToggleCategory(category.name)}
            >
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => onToggleCategory(category.name)}
                >
                  {category.name}
                  {openCategory === category.name ? (
                    <ChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-4 bg-charcoal border border-secondary z-50">
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={`cursor-pointer border ${
                        activeFilters.includes(tag)
                          ? 'bg-electric text-charcoal'
                          : 'bg-secondary hover:bg-electric/20'
                      } ${getTagColorClass(tag)}`}
                      onClick={() => onToggleFilter(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
        
        {activeFilters.length > 0 && (
          <div className="bg-secondary/50 rounded-md p-3 mt-4">
            <p className="text-sm text-muted-foreground mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(filter => (
                <Badge
                  key={filter}
                  className="bg-electric text-charcoal flex items-center gap-1"
                  onClick={() => onToggleFilter(filter)}
                >
                  {filter}
                  <X className="h-3 w-3 ml-1 cursor-pointer" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsFilter;
