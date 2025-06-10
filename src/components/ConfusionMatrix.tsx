
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ConfusionMatrixProps {
  title: string;
  matrix: number[][];
  labels: string[];
}

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ title, matrix, labels }) => {
  const total = matrix.flat().reduce((sum, val) => sum + val, 0);
  
  return (
    <Card className="bg-secondary border-accent/20">
      <CardHeader>
        <CardTitle className="text-white text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div></div>
          <div className="text-center text-muted-foreground font-medium">Predicted</div>
          <div></div>
          <div className="text-muted-foreground font-medium">Actual</div>
          <div className="grid grid-cols-2 gap-1">
            {labels.map((label, i) => (
              <div key={i} className="text-center text-muted-foreground text-xs">{label}</div>
            ))}
          </div>
          <div></div>
          <div className="space-y-1">
            {matrix.map((row, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs w-8">{labels[i]}</span>
                <div className="grid grid-cols-2 gap-1 flex-1">
                  {row.map((val, j) => (
                    <div 
                      key={j} 
                      className={`text-center py-2 rounded text-xs font-medium ${
                        i === j ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrix;
