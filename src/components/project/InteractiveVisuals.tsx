
import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import EDAChart from '@/components/EDAChart';
import CodeSnippet from '@/components/CodeSnippet';

interface InteractiveVisualsProps {
  genderData: any[];
  cityData: any[];
  leadSourceData: any[];
  scatterData: any[];
  preprocessingCode: string;
}

const InteractiveVisuals: React.FC<InteractiveVisualsProps> = ({
  genderData,
  cityData,
  leadSourceData,
  scatterData,
  preprocessingCode
}) => {
  return (
    <AnimatedSection className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-white">Interactive Visuals</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <EDAChart 
          title="Conversion by Gender"
          type="bar"
          data={genderData}
          description="Gender distribution in conversion data"
        />
        <EDAChart 
          title="Conversion by City"
          type="pie"
          data={cityData}
          description="City-wise conversion breakdown"
        />
        <EDAChart 
          title="Lead Source Distribution"
          type="pie"
          data={leadSourceData}
          description="Distribution of lead sources"
        />
        <EDAChart 
          title="Pages Viewed vs Time Spent"
          type="scatter"
          data={scatterData}
          description="Relationship between engagement metrics"
        />
        <div className="lg:col-span-2">
          <CodeSnippet 
            title="Data Preprocessing Pipeline"
            code={preprocessingCode}
            language="python"
          />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default InteractiveVisuals;
