
import React from 'react';
import { Brain, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DatasetCard from './DatasetCard';

interface Dataset {
  id: string;
  title: string;
  description: string;
  rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

interface ConfigPanelProps {
  datasets: Dataset[];
  selectedDataset: Dataset | null;
  onDatasetSelect: (dataset: Dataset) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  datasets, 
  selectedDataset, 
  onDatasetSelect 
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* AI Model Display */}
      <Card className="bg-secondary border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-electric" />
            LLM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-charcoal rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-medium">Open AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Using PandasAI for conversational data analysis with OpenAI fallback
          </p>
        </CardContent>
      </Card>

      {/* Dataset Selection */}
      <Card className="bg-secondary border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-electric" />
            Dataset
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {datasets.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              isSelected={selectedDataset?.id === dataset.id}
              onClick={() => onDatasetSelect(dataset)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigPanel;
