
import React, { useState, useEffect } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { analyzeData, analyzePokemonWithPandasAI } from '@/lib/services/dataAnalysis';
import AnimatedSection from '@/components/AnimatedSection';
import ConfigPanel from '@/components/data-viz/ConfigPanel';
import ChatInterface from '@/components/data-viz/ChatInterface';
import DatasetOverview from '@/components/data-viz/DatasetOverview';

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
          <ConfigPanel
            datasets={datasets}
            selectedDataset={selectedDataset}
            onDatasetSelect={setSelectedDataset}
          />

          <ChatInterface
            selectedDataset={selectedDataset}
            messages={messages}
            currentMessage={currentMessage}
            isLoading={isLoading}
            onMessageChange={setCurrentMessage}
            onSendMessage={handleSendMessage}
          />
        </div>

        {selectedDataset && (
          <DatasetOverview
            selectedDataset={selectedDataset}
            onQuestionSelect={setCurrentMessage}
          />
        )}
      </div>
    </div>
  );
};

export default DataVisualizationAgent;
