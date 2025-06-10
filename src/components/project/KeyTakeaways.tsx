
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';

interface KeyTakeawaysProps {
  takeaways: string[];
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways }) => {
  return (
    <AnimatedSection className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-white">Key Takeaways</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {takeaways.map((takeaway, index) => (
          <Card key={index} className="bg-secondary border-accent/20">
            <CardContent className="pt-4">
              <p className="text-muted-foreground">{takeaway}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default KeyTakeaways;
