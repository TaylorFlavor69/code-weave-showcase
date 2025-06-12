
import React from 'react';
import { Database, Table as TableIcon, MessageSquare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Dataset {
  id: string;
  title: string;
  description: string;
  rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

interface DatasetOverviewProps {
  selectedDataset: Dataset;
  onQuestionSelect: (question: string) => void;
}

const DatasetOverview: React.FC<DatasetOverviewProps> = ({ 
  selectedDataset, 
  onQuestionSelect 
}) => {
  const getSampleQuestions = (datasetId: string) => {
    const questions = {
      CustomerExperience: [
        "What is the average satisfaction score by location?",
        "Show me customers with high retention rates",
        "Which demographics have the lowest satisfaction scores?",
        "Compare satisfaction scores across different age groups",
        "What's the correlation between time spent and purchases?"
      ],
      SuccessEducationBackground: [
        "What are the most common degrees among successful people?",
        "Show me the top universities by success rate",
        "Compare success metrics across different fields",
        "What's the average GPA of successful professionals?",
        "Which countries produce the most successful graduates?"
      ],
      pokemon: [
        "Which Pokemon has the highest attack stat?",
        "Show me all legendary Pokemon and their stats",
        "Compare different Pokemon types by average stats",
        "What are the strongest Pokemon from Generation 1?",
        "Which Pokemon type combination is most effective?"
      ]
    };
    return questions[datasetId as keyof typeof questions] || [];
  };

  return (
    <div className="mt-6">
      <Card className="bg-secondary border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-electric" />
            Dataset Overview: {selectedDataset.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dataset Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-charcoal p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Records</h4>
              <p className="text-2xl font-bold text-electric">{selectedDataset.rows.toLocaleString()}</p>
            </div>
            <div className="bg-charcoal p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Columns</h4>
              <p className="text-2xl font-bold text-electric">{selectedDataset.columns.length}</p>
            </div>
            <div className="bg-charcoal p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedDataset.description}</p>
            </div>
          </div>

          {/* Data Preview Table */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <TableIcon className="h-4 w-4" />
              Sample Data (First 5 Records)
            </h4>
            <div className="bg-charcoal rounded-lg p-4">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="w-max">
                  {selectedDataset.preview.length > 0 ? (
                    <TableComponent>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(selectedDataset.preview[0]).map((column) => (
                            <TableHead key={column} className="text-electric font-medium whitespace-nowrap min-w-[120px]">
                              {column}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDataset.preview.map((row, idx) => (
                          <TableRow key={idx}>
                            {Object.keys(selectedDataset.preview[0]).map((column) => (
                              <TableCell key={column} className="text-white whitespace-nowrap min-w-[120px] max-w-[200px] truncate">
                                <span title={String(row[column] || '-')}>
                                  {String(row[column] || '-')}
                                </span>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableComponent>
                  ) : (
                    <div className="text-white text-center py-8">
                      <p>No data available for preview</p>
                      <p className="text-sm text-muted-foreground mt-2">Please check data access permissions or contact support</p>
                    </div>
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>

          {/* Sample Questions */}
          {selectedDataset.rows > 0 && (
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Try These Questions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getSampleQuestions(selectedDataset.id).map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="text-left justify-start p-3 h-auto bg-charcoal hover:bg-charcoal/80 border-muted text-white hover:text-electric transition-colors"
                    onClick={() => onQuestionSelect(question)}
                  >
                    <div className="flex items-start gap-2 w-full">
                      <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-electric" />
                      <span className="text-sm leading-relaxed">{question}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetOverview;
