import React from 'react';
import { InsightCards } from './InsightCards';
import { AIAnalystReport } from './AIAnalystReport';
import { FlightPriceChart } from './FlightPriceChart';
import { FlightDataTable } from './FlightDataTable';
import { ArrowDown, Plane, TriangleAlert } from 'lucide-react';
import { ApiResponse } from '../types';

interface DashboardProps {
  isLoading: boolean;
  hasResults: boolean;
  error: string | null;
  data: ApiResponse | null;
}

export function Dashboard({ isLoading, hasResults, error, data }: DashboardProps) {
  const handleScrollToTable = () => {
    document.getElementById('data-table')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-card/50 rounded-lg">
        <div className="relative">
          <Plane className="h-16 w-16 text-blue-500 animate-pulse" />
        </div>
        <p className="mt-6 text-lg text-muted-foreground">
          Scanning the skies for the best deals...
        </p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="h-96 flex flex-col items-center justify-center text-center bg-destructive/10 rounded-lg border border-destructive/50 text-destructive">
        <TriangleAlert className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Analysis Failed</h2>
        <p className="text-destructive/80 max-w-md">{error}</p>
      </div>
    );
  }

  if (!hasResults || !data) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-center bg-card/50 rounded-lg border border-border">
        <Plane className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Ready to Analyze</h2>
        <p className="text-muted-foreground max-w-md">
          Select a route and date in the control panel on the left, then click "Analyze Demand" to begin.
        </p>
      </div>
    );
  }

  // If we have results, render the full dashboard
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <InsightCards data={data.insightCards} />
      <AIAnalystReport report={data.aiAnalystReport} />

      <div className="flex justify-between items-center pt-4">
        <h2 className="text-xl font-semibold">Price Comparison</h2>
        <button onClick={handleScrollToTable} className="text-sm text-blue-400 hover:text-blue-500 flex items-center gap-1">
          See Full Data
        </button>
      </div>
      <FlightPriceChart data={data.flightPriceChart} />

      <div id="data-table" className="pt-4">
        <h2 className="text-xl font-semibold mb-4">All Available Flights</h2>
        <FlightDataTable flights={data.flightDataTable} />
      </div>

      <button
        onClick={handleScrollToTable}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110"
        aria-label="Scroll to data table"
      >
        <ArrowDown size={20} />
      </button>
    </div>
  );
}