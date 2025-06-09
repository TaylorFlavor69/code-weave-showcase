
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnomalyChartProps {
  title: string;
  type: 'gaussian' | 'svm';
  description: string;
}

const AnomalyChart: React.FC<AnomalyChartProps> = ({ title, type, description }) => {
  // Generate sample data for demonstration
  const generateData = () => {
    const normalData = [];
    const anomalyData = [];
    
    // Generate normal points (clustered)
    for (let i = 0; i < 100; i++) {
      normalData.push({
        x: Math.random() * 20 + 30 + (Math.random() - 0.5) * 10,
        y: Math.random() * 20 + 30 + (Math.random() - 0.5) * 10,
        type: 'normal'
      });
    }
    
    // Generate anomaly points (scattered)
    for (let i = 0; i < 15; i++) {
      anomalyData.push({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        type: 'anomaly'
      });
    }
    
    return { normalData, anomalyData };
  };

  const { normalData, anomalyData } = generateData();

  return (
    <Card className="bg-secondary border-accent/20">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                type="number" 
                dataKey="x" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#F9FAFB'
                }}
              />
              <Legend 
                wrapperStyle={{ color: '#F9FAFB' }}
              />
              <Scatter 
                name="Normal" 
                data={normalData} 
                fill="#3B82F6"
                opacity={0.7}
              />
              <Scatter 
                name="Anomaly" 
                data={anomalyData} 
                fill="#EF4444"
                opacity={0.8}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyChart;
