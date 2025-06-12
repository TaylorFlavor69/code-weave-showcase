
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Dataset {
  id: string;
  title: string;
  description: string;
  rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

interface DatasetCardProps {
  dataset: Dataset;
  isSelected: boolean;
  onClick: () => void;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected 
          ? 'bg-electric/20 border-electric' 
          : 'bg-charcoal hover:bg-charcoal/80'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">{dataset.title}</h4>
        <p className="text-sm text-muted-foreground mb-2">{dataset.description}</p>
        <div className="text-xs text-muted-foreground">
          {dataset.rows === 0 ? (
            <span className="text-yellow-500">No data available</span>
          ) : (
            `${dataset.rows.toLocaleString()} rows • ${dataset.columns.length} columns`
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetCard;
