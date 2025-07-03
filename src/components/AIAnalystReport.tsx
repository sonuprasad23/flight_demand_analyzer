import React from 'react';
import { Bot } from 'lucide-react';

interface AIAnalystReportProps {
  report: string;
}

// Simple markdown-to-HTML parser for bullet points
const parseMarkdown = (text: string) => {
  return text
    .split('\n')
    .map((line, index) => {
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.replace(/(\* | - )/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium">$1</strong>');
        return <li key={index} dangerouslySetInnerHTML={{ __html: content }} />;
      }
      if (line.trim().length > 0) {
        const content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium">$1</strong>');
        return <p key={index} dangerouslySetInnerHTML={{ __html: content }} />;
      }
      return null;
    })
    .filter(Boolean);
};

export function AIAnalystReport({ report }: AIAnalystReportProps) {
  const reportParts = parseMarkdown(report);

  return (
    <div className="bg-card/70 border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-blue-500" />
        <h2 className="font-semibold">AI Analyst Report</h2>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        {reportParts.slice(0, 1)}
        <ul className="list-disc pl-5 space-y-2">
          {reportParts.slice(1)}
        </ul>
      </div>
    </div>
  );
}