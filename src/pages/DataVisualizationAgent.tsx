import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Database, Send, Bot, User, BarChart3, Table, MessageSquare, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { analyzeData, analyzePokemonWithPandasAI } from '@/lib/services/dataAnalysis';
import AnimatedSection from '@/components/AnimatedSection';

interface Dataset {
  id: string;
  title: string;
  description: string;
  rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  data?: {
    type: 'table' | 'chart' | 'text';
    content: any;
  };
}

type TableName = 'CustomerExperience' | 'SuccessEducationBackground' | 'PokemonData';

const DataVisualizationAgent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getTableName = (datasetId: string): TableName => {
    switch (datasetId) {
      case 'pokemon':
        return 'PokemonData';
      case 'CustomerExperience':
        return 'CustomerExperience';
      case 'SuccessEducationBackground':
        return 'SuccessEducationBackground';
      default:
        return 'CustomerExperience';
    }
  };

  const fetchDatasetPreview = async (datasetId: string, limit: number = 5) => {
    try {
      const tableName = getTableName(datasetId);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(limit);
      
      if (error) {
        console.error(`Preview fetch error:`, error.message);
        toast({
          title: "Data Access Error",
          description: `Failed to fetch preview data. Please check your permissions.`,
          variant: "destructive"
        });
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error(`Preview fetch exception:`, error);
      return [];
    }
  };

  const fetchDatasetCount = async (datasetId: string) => {
    try {
      const tableName = getTableName(datasetId);
      
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error(`Count fetch error:`, error.message);
        return 0;
      }
      
      return count || 0;
    } catch (error) {
      console.error(`Count fetch exception:`, error);
      return 0;
    }
  };

  const initializeDatasets = async () => {
    const baseDatasets = [
      {
        id: 'CustomerExperience',
        title: 'Customer Experience Analytics',
        description: 'Customer satisfaction and retention data with demographics, interactions, and feedback scores',
        columns: ['Customer_ID', 'Age', 'Gender', 'Location', 'Satisfaction_Score', 'Feedback_Score', 'Products_Purchased', 'Products_Viewed', 'Time_Spent_on_Site', 'Num_Interactions', 'Retention_Status']
      },
      {
        id: 'SuccessEducationBackground',
        title: 'Success & Education Analysis',
        description: 'Educational backgrounds and career success metrics of professionals across various fields',
        columns: ['Name', 'Degree', 'Field', 'Institution', 'Graduation Year', 'Country', 'University Global Ranking', 'GPA (or Equivalent)', 'Scholarship/Award', 'Profession']
      },
      {
        id: 'pokemon',
        title: 'Pokémon Battle Analytics',
        description: 'Comprehensive Pokémon statistics including battle data, stats, types, and performance metrics',
        columns: ['#', 'Name', 'Type 1', 'Type 2', 'HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Generation', 'Legendary', 'height', 'weight', 'base_experience']
      }
    ];

    const datasetsWithData = await Promise.all(
      baseDatasets.map(async (dataset) => {
        const [preview, count] = await Promise.all([
          fetchDatasetPreview(dataset.id),
          fetchDatasetCount(dataset.id)
        ]);

        return {
          ...dataset,
          rows: count,
          preview: preview
        };
      })
    );

    setDatasets(datasetsWithData);

    // Check if we have any data at all
    const totalRecords = datasetsWithData.reduce((sum, dataset) => sum + dataset.rows, 0);
    if (totalRecords === 0) {
      toast({
        title: "No Data Available",
        description: "No records were found in any dataset. Please check data access permissions.",
        variant: "destructive"
      });
    }
  };

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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      
      // Create or update user session
      await supabase
        .from('user_sessions')
        .upsert({
          user_id: session.user.id,
          agent_type: 'data_visualization'
        });

      // Initialize datasets with real data
      await initializeDatasets();
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !selectedDataset) return;

    // Check if Pokemon dataset for enhanced analysis
    const usePandasAI = selectedDataset.id === 'pokemon';

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      let result;
      
      if (usePandasAI) {
        // Use PandasAI for Pokemon dataset
        result = await analyzePokemonWithPandasAI(currentMessage);
      } else {
        // Use regular analysis for other datasets
        result = await analyzeData(currentMessage, selectedDataset.id);
      }
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: result.text,
        timestamp: new Date(),
        data: result.table ? {
          type: 'table',
          content: result.table
        } : undefined
      };
      
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `I apologize, but I encountered an error while analyzing your data: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      
      toast({
        title: "Analysis Error",
        description: "Failed to analyze data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-charcoal min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-electric"></div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Link to="/#projects" className="inline-flex items-center text-electric hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <AnimatedSection className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Data Visualization AI Agent</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Analyze data and create visualizations using natural language with PandasAI-powered insights.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Configuration Panel */}
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
                  <Card 
                    key={dataset.id} 
                    className={`cursor-pointer transition-all ${
                      selectedDataset?.id === dataset.id 
                        ? 'bg-electric/20 border-electric' 
                        : 'bg-charcoal hover:bg-charcoal/80'
                    }`}
                    onClick={() => setSelectedDataset(dataset)}
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
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-secondary border-none h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-electric" />
                  {selectedDataset?.id === 'pokemon' ? 'Enhanced PandasAI Chat' : 'PandasAI Chat'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                {/* Messages */}
                <ScrollArea className="flex-1 mb-4 pr-4">
                  <div className="space-y-4 min-h-0">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Start a conversation by asking questions about your data!</p>
                        <p className="text-sm mt-2">PandasAI will analyze your data using Python and provide conversational insights.</p>
                        {selectedDataset?.id === 'pokemon' && (
                          <p className="text-sm mt-2 text-electric">Pokemon dataset uses enhanced PandasAI analysis!</p>
                        )}
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === 'user' ? 'bg-electric text-charcoal' : 'bg-purple-600 text-white'
                            }`}>
                              {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`rounded-lg p-4 ${
                              message.type === 'user' ? 'bg-electric text-charcoal' : 'bg-charcoal text-white'
                            }`}>
                              <p className="mb-2 whitespace-pre-wrap break-words">{message.content}</p>
                              {message.data && message.data.type === 'table' && (
                                <div className="mt-3 p-3 bg-secondary/50 rounded">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Table className="h-4 w-4" />
                                    <span className="text-sm font-medium">Data Table</span>
                                  </div>
                                  <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
                                    {message.data.content.map((row: any, idx: number) => (
                                      <div key={idx} className="border-b border-secondary pb-1">
                                        {Object.entries(row).map(([key, value]) => (
                                          <span key={key} className="mr-3">{key}: {String(value)}</span>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-charcoal text-white rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-electric"></div>
                            <span>PandasAI is analyzing your data...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="flex gap-2 flex-shrink-0">
                  <Textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={selectedDataset?.id === 'pokemon' 
                      ? "Ask about Pokemon stats, battles, or types..." 
                      : "Ask a question about your data..."}
                    className="flex-1 min-h-[50px] max-h-[100px]"
                    disabled={!selectedDataset || selectedDataset.rows === 0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || !selectedDataset || isLoading || selectedDataset.rows === 0}
                    className="bg-electric text-charcoal hover:bg-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {!selectedDataset && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Please select a dataset to start chatting.
                  </p>
                )}
                {selectedDataset && selectedDataset.rows === 0 && (
                  <p className="text-xs text-yellow-500 mt-2">
                    This dataset has no available data. Please check data access permissions.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dataset Summary - Full Width Bottom Section */}
        {selectedDataset && (
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
                    <Table className="h-4 w-4" />
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
                          onClick={() => setCurrentMessage(question)}
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
        )}
      </div>
    </div>
  );
};

export default DataVisualizationAgent;
