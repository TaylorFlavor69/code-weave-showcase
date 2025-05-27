import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Database, Send, Bot, User, BarChart3, Table, MessageSquare, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

const DataVisualizationAgent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const datasets: Dataset[] = [
    {
      id: 'sales',
      title: 'E-commerce Sales Data',
      description: 'Monthly sales data across different product categories and regions',
      rows: 1200,
      columns: ['Date', 'Product', 'Category', 'Region', 'Sales', 'Quantity'],
      preview: [
        { Date: '2024-01-15', Product: 'Laptop Pro', Category: 'Electronics', Region: 'North', Sales: 2500, Quantity: 5 },
        { Date: '2024-01-16', Product: 'Coffee Mug', Category: 'Home', Region: 'South', Sales: 15, Quantity: 3 },
        { Date: '2024-01-17', Product: 'Wireless Mouse', Category: 'Electronics', Region: 'East', Sales: 45, Quantity: 9 },
      ]
    },
    {
      id: 'weather',
      title: 'Weather Patterns',
      description: 'Historical weather data with temperature, humidity, and precipitation',
      rows: 3650,
      columns: ['Date', 'City', 'Temperature', 'Humidity', 'Precipitation', 'WindSpeed'],
      preview: [
        { Date: '2024-01-01', City: 'New York', Temperature: 32, Humidity: 65, Precipitation: 0.2, WindSpeed: 8 },
        { Date: '2024-01-01', City: 'Los Angeles', Temperature: 68, Humidity: 45, Precipitation: 0, WindSpeed: 5 },
        { Date: '2024-01-01', City: 'Chicago', Temperature: 28, Humidity: 70, Precipitation: 0.5, WindSpeed: 12 },
      ]
    },
    {
      id: 'stocks',
      title: 'Stock Market Data',
      description: 'Daily stock prices and trading volumes for major companies',
      rows: 2500,
      columns: ['Date', 'Symbol', 'Open', 'High', 'Low', 'Close', 'Volume'],
      preview: [
        { Date: '2024-01-15', Symbol: 'AAPL', Open: 185.5, High: 187.2, Low: 184.8, Close: 186.9, Volume: 45000000 },
        { Date: '2024-01-15', Symbol: 'GOOGL', Open: 142.1, High: 143.8, Low: 141.5, Close: 143.2, Volume: 28000000 },
        { Date: '2024-01-15', Symbol: 'MSFT', Open: 375.2, High: 378.1, Low: 374.5, Close: 377.4, Volume: 32000000 },
      ]
    }
  ];

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

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedDataset || !selectedModel) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `Based on your query about "${currentMessage}" using the ${selectedDataset.title} dataset with ${selectedModel}, here's what I found:`,
        timestamp: new Date(),
        data: {
          type: 'table',
          content: selectedDataset.preview.slice(0, 3)
        }
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="bg-charcoal min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-electric"></div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen">
      <div className="container mx-auto px-4 py-12">
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
              Analyze data and create visualizations using natural language with AI-powered insights.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Model Selection */}
            <Card className="bg-secondary border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-electric" />
                  AI Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai-gpt4">OpenAI GPT-4</SelectItem>
                    <SelectItem value="gemini-25">Gemini 2.5</SelectItem>
                  </SelectContent>
                </Select>
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
                        {dataset.rows.toLocaleString()} rows • {dataset.columns.length} columns
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Dataset Summary */}
            {selectedDataset && (
              <Card className="bg-secondary border-none">
                <CardHeader>
                  <CardTitle className="text-lg">Dataset Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-white">Columns:</h5>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedDataset.columns.map((col, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{col}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Sample Data:</h5>
                      <div className="text-xs space-y-1 mt-2 max-h-32 overflow-y-auto">
                        {selectedDataset.preview.slice(0, 2).map((row, idx) => (
                          <div key={idx} className="text-muted-foreground">
                            {Object.entries(row).slice(0, 3).map(([key, value]) => (
                              <div key={key}>{key}: {String(value)}</div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-secondary border-none h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-electric" />
                  AI Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Start a conversation by asking questions about your data!</p>
                        <p className="text-sm mt-2">Try: "Show me sales by region" or "What are the trends?"</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.type === 'user' ? 'bg-electric text-charcoal' : 'bg-purple-600 text-white'
                            }`}>
                              {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`rounded-lg p-4 ${
                              message.type === 'user' ? 'bg-electric text-charcoal' : 'bg-charcoal text-white'
                            }`}>
                              <p className="mb-2">{message.content}</p>
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
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-charcoal text-white rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-electric"></div>
                            <span>Analyzing data...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask a question about your data..."
                    className="flex-1 min-h-[50px] max-h-[100px]"
                    disabled={!selectedDataset || !selectedModel}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || !selectedDataset || !selectedModel || isLoading}
                    className="bg-electric text-charcoal hover:bg-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {(!selectedDataset || !selectedModel) && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Please select both an AI model and dataset to start chatting.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationAgent;
