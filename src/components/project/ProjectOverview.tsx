
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';

interface ProjectOverviewProps {
  content: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ content }) => {
  return (
    <AnimatedSection className="mb-12">
      <Card className="bg-secondary border-accent/20">
        <CardHeader>
          <CardTitle className="text-white">Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {content}
          </p>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default ProjectOverview;
