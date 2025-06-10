
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, BarChart3, Brain } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ModelMetrics from '@/components/ModelMetrics';
import ConfusionMatrix from '@/components/ConfusionMatrix';
import MetricCard from '@/components/MetricCard';

const ModelEvaluationSection: React.FC = () => {
  return (
    <AnimatedSection className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-white">Model Evaluation</h2>
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
          <TabsTrigger value="confusion">Confusion Matrices</TabsTrigger>
          <TabsTrigger value="insights">Feature Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ModelMetrics 
              modelName="Random Forest"
              accuracy={0.9996}
              precision={0.999}
              recall={0.998}
              f1Score={0.999}
              isTopPerformer={true}
            />
            <ModelMetrics 
              modelName="Logistic Regression"
              accuracy={0.854}
              precision={0.823}
              recall={0.801}
              f1Score={0.812}
            />
            <ModelMetrics 
              modelName="Naive Bayes"
              accuracy={0.789}
              precision={0.756}
              recall={0.743}
              f1Score={0.749}
            />
            <ModelMetrics 
              modelName="Bernoulli NB"
              accuracy={0.823}
              precision={0.798}
              recall={0.776}
              f1Score={0.787}
            />
            <ModelMetrics 
              modelName="KNN"
              accuracy={0.867}
              precision={0.845}
              recall={0.834}
              f1Score={0.839}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="confusion" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConfusionMatrix 
              title="Random Forest"
              matrix={[[9823, 4], [8, 9845]]}
              labels={['No', 'Yes']}
            />
            <ConfusionMatrix 
              title="Logistic Regression"
              matrix={[[8456, 1371], [1543, 8310]]}
              labels={['No', 'Yes']}
            />
            <ConfusionMatrix 
              title="KNN"
              matrix={[[8734, 1093], [1267, 8586]]}
              labels={['No', 'Yes']}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Top Conversion City"
              value="Karachi"
              icon={Target}
              description="38.1% of all conversions"
            />
            <MetricCard 
              title="Best Lead Source"
              value="Organic"
              icon={TrendingUp}
              description="31.2% conversion rate"
            />
            <MetricCard 
              title="Avg Time Spent"
              value="18.4 min"
              icon={BarChart3}
              description="For converted customers"
            />
            <MetricCard 
              title="Hot Lead Conv."
              value="89.3%"
              icon={Brain}
              description="Hot leads convert at 89.3%"
            />
          </div>
        </TabsContent>
      </Tabs>
    </AnimatedSection>
  );
};

export default ModelEvaluationSection;
