
import React, { useState } from 'react';
import { ArrowLeft, Brain, Database, Eye, EyeOff, HelpCircle, Github, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AnimatedSection from '@/components/AnimatedSection';

interface Dataset {
  id: string;
  title: string;
  description: string;
  rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

const DataVisualizationAgent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [query, setQuery] = useState('');
  const [requestsRemaining, setRequestsRemaining] = useState(25);
  const [isInspiration, setIsInspiration] = useState(false);
  const [authError, setAuthError] = useState('');

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
        { Date: '2024-01-18', Product: 'Desk Chair', Category: 'Furniture', Region: 'West', Sales: 180, Quantity: 2 },
        { Date: '2024-01-19', Product: 'Phone Case', Category: 'Accessories', Region: 'North', Sales: 25, Quantity: 7 }
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
        { Date: '2024-01-01', City: 'Miami', Temperature: 75, Humidity: 80, Precipitation: 0.1, WindSpeed: 6 },
        { Date: '2024-01-01', City: 'Seattle', Temperature: 45, Humidity: 85, Precipitation: 0.8, WindSpeed: 9 }
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
        { Date: '2024-01-15', Symbol: 'TSLA', Open: 248.5, High: 252.1, Low: 246.8, Close: 251.3, Volume: 65000000 },
        { Date: '2024-01-15', Symbol: 'AMZN', Open: 156.8, High: 158.2, Low: 155.9, Close: 157.6, Volume: 38000000 }
      ]
    }
  ];

  const inspirationQueries = [
    "Show sales by country as a bar chart",
    "What are the top 5 products by quantity sold?",
    "Visualize monthly trends for revenue",
    "Create a scatter plot of temperature vs humidity",
    "Display the correlation matrix of all numeric columns",
    "Show the distribution of sales amounts as a histogram",
    "Compare sales performance across different regions"
  ];

  const handleLogin = () => {
    // Demo authentication - in a real app, this would be proper validation
    if (username.trim() && password.trim()) {
      if (username === 'demo' && password === 'demo123') {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Invalid credentials. Try demo/demo123');
      }
    } else {
      setAuthError('Please enter both username and password');
    }
  };

  const handleRunQuery = () => {
    if (query.trim() && selectedDataset && selectedModel) {
      // Simulate query processing
      setRequestsRemaining(prev => Math.max(0, prev - 1));
      // Here you would integrate with PandasAI
      console.log('Running query:', query, 'on dataset:', selectedDataset.title, 'with model:', selectedModel);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-charcoal min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Link to="/#projects" className="inline-flex items-center text-electric hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
          
          <div className="max-w-md mx-auto">
            <Card className="bg-secondary border-none">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-electric/20 rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-electric" />
                </div>
                <CardTitle className="text-2xl text-white">Data Visualization AI Agent</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Secure demo access required
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                {authError && (
                  <p className="text-red-400 text-sm">{authError}</p>
                )}
                <Button onClick={handleLogin} className="w-full bg-electric text-charcoal hover:bg-white">
                  Access Demo
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Limited access demo – each account is allowed up to 25 requests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen relative overflow-hidden">
      {/* AI-themed background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-electric rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link to="/#projects" className="inline-flex items-center text-electric hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>

        {/* Project Overview */}
        <AnimatedSection className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Data Visualization AI Agent</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A secure, interactive demo that uses PandasAI with OpenAI and Gemini models to answer questions about data and generate visualizations from natural language input.
            </p>
          </div>
        </AnimatedSection>

        {/* Request Counter */}
        <div className="mb-6 text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Requests Remaining: {requestsRemaining}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Model Selection */}
            <Card className="bg-secondary border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-electric" />
                  Model Selection
                </CardTitle>
                <p className="text-muted-foreground text-sm">Choose which AI model you'd like to use</p>
              </CardHeader>
              <CardContent>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai-gpt4">OpenAI GPT-4</SelectItem>
                    <SelectItem value="openai-gpt35">OpenAI GPT-3.5</SelectItem>
                    <SelectItem value="gemini-pro">Google Gemini Pro</SelectItem>
                    <SelectItem value="gemini-pro-vision">Google Gemini Pro Vision</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Dataset Explorer */}
            <Card className="bg-secondary border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-electric" />
                  Dataset Explorer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{dataset.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{dataset.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {dataset.rows.toLocaleString()} rows • {dataset.columns.length} columns
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-xs font-medium">Sample Data:</p>
                          <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
                            {dataset.preview.slice(0, 2).map((row, idx) => (
                              <div key={idx} className="text-muted-foreground">
                                {Object.entries(row).slice(0, 3).map(([key, value]) => (
                                  <span key={key} className="mr-2">
                                    {key}: {String(value)}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          variant={selectedDataset?.id === dataset.id ? "default" : "outline"}
                        >
                          {selectedDataset?.id === dataset.id ? 'Selected' : 'Use this dataset'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ask a Question */}
            <Card className="bg-secondary border-none">
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question about your data... e.g., 'Show me the sales trends by month'"
                  rows={3}
                />
                <Button 
                  onClick={handleRunQuery}
                  disabled={!query.trim() || !selectedDataset || !selectedModel || requestsRemaining === 0}
                  className="w-full bg-electric text-charcoal hover:bg-white"
                >
                  Run Query
                </Button>
                
                {/* Output Area */}
                <div className="min-h-[300px] bg-charcoal rounded-md p-4 border border-secondary">
                  <p className="text-muted-foreground text-center">
                    Query results and visualizations will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* FAQ/Inspiration Panel */}
            <Card className="bg-secondary border-none">
              <CardHeader>
                <Collapsible open={isInspiration} onOpenChange={setIsInspiration}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-electric" />
                        <span>Need Inspiration?</span>
                      </div>
                      {isInspiration ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-4">
                    <p className="text-sm text-muted-foreground mb-3">Try these example queries:</p>
                    {inspirationQueries.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3"
                        onClick={() => setQuery(example)}
                      >
                        {example}
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-secondary/50 text-center">
          <p className="text-muted-foreground mb-4">
            Built with Python, PandasAI, OpenAI, Gemini, and a touch of imagination.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:contact@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DataVisualizationAgent;
