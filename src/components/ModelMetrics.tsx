
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelMetricsProps {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  isTopPerformer?: boolean;
}

const ModelMetrics: React.FC<ModelMetricsProps> = ({ 
  modelName, 
  accuracy, 
  precision, 
  recall, 
  f1Score, 
  isTopPerformer = false 
}) => {
  return (
    <Card className={`bg-secondary border-accent/20 ${isTopPerformer ? 'ring-2 ring-electric' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          {modelName}
          {isTopPerformer && (
            <span className="text-xs bg-electric text-charcoal px-2 py-1 rounded">
              TOP PERFORMER
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Accuracy</div>
            <div className="text-white font-bold">{(accuracy * 100).toFixed(2)}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Precision</div>
            <div className="text-white font-bold">{precision.toFixed(3)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Recall</div>
            <div className="text-white font-bold">{recall.toFixed(3)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">F1 Score</div>
            <div className="text-white font-bold">{f1Score.toFixed(3)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelMetrics;
