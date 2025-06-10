
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AnimatedSection from '@/components/AnimatedSection';

interface DetailSection {
  id: string;
  title: string;
  content: string;
}

interface TechnicalDetailsProps {
  sections: DetailSection[];
}

const TechnicalDetails: React.FC<TechnicalDetailsProps> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <AnimatedSection className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-white">Technical Details</h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <Collapsible 
            key={section.id}
            open={openSections.includes(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <Card className="bg-secondary border-accent/20 cursor-pointer hover:bg-secondary/80 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-white">{section.title}</CardTitle>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${
                    openSections.includes(section.id) ? 'rotate-180' : ''
                  }`} />
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="bg-secondary/50 border-accent/10 mt-2">
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{section.content}</p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default TechnicalDetails;
