import React from 'react';
import { Bot } from 'lucide-react';

interface AIAnalystReportProps {
  report: string;
}

const parseMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
        line = line.trim();
        if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-semibold text-foreground mt-2">{line.replaceAll('**', '')}</p>;
        }
        if (line.startsWith('* ') || line.startsWith('- ')) {
            const content = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-foreground/90">$1</strong>');
            return <li key={index} className="ml-1" dangerouslySetInnerHTML={{ __html: content }} />;
        }
        if (line.length > 0) {
            const content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-foreground/90">$1</strong>');
            return <p key={index} dangerouslySetInnerHTML={{ __html: content }} />;
        }
        return null;
    }).filter(Boolean);
};


export function AIAnalystReport({ report }: AIAnalystReportProps) {
  const reportParts = parseMarkdown(report);

  return (
    <div className="bg-card/70 border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Bot className="h-5 w-5 text-blue-500" />
        <h2 className="font-semibold">AI Analyst Report</h2>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <ul className="space-y-2">
          {reportParts}
        </ul>
      </div>
    </div>
  );
}