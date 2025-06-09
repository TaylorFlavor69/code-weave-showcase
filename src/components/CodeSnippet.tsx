
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

interface CodeSnippetProps {
  title: string;
  code: string;
  language: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ title, code, language }) => {
  return (
    <Card className="bg-secondary border-accent/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="h-5 w-5 text-electric" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-charcoal rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-green-400">
            <code className={`language-${language}`}>
              {code}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeSnippet;
