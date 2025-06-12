
import React from 'react';
import { MessageSquare, Bot, User, Table, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface ChatInterfaceProps {
  selectedDataset: Dataset | null;
  messages: Message[];
  currentMessage: string;
  isLoading: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedDataset,
  messages,
  currentMessage,
  isLoading,
  onMessageChange,
  onSendMessage
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
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
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder={selectedDataset?.id === 'pokemon' 
                ? "Ask about Pokemon stats, battles, or types..." 
                : "Ask a question about your data..."}
              className="flex-1 min-h-[50px] max-h-[100px]"
              disabled={!selectedDataset || selectedDataset.rows === 0}
              onKeyDown={handleKeyDown}
            />
            <Button 
              onClick={onSendMessage}
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
  );
};

export default ChatInterface;
