import React from 'react';
import { InsightCards } from './InsightCards';
import { AIAnalystReport } from './AIAnalystReport';
import { FlightPriceChart } from './FlightPriceChart';
import { FlightDataTable } from './FlightDataTable';
import { ArrowDown, Plane, TriangleAlert } from 'lucide-react';
import { AirfareHeatmap } from './AirfareHeatmap';
import { TopMovers } from './TopMovers';
import { DetailedTrendChart } from './DetailedTrendChart';
import { ApiResponse } from '../types';

interface DashboardProps {
  isLoading: boolean;
  error: string | null;
  data: ApiResponse | null;
  filters: { origin: string; destination: string; date: string; };
}

export function Dashboard({ isLoading, error, data, filters }: DashboardProps) {
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
          Analyzing market data for {filters.origin} to {filters.destination}...
        </p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="h-96 flex flex-col items-center justify-center text-center bg-destructive/10 rounded-lg border border-destructive/50 text-destructive p-4">
        <TriangleAlert className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Analysis Failed</h2>
        <p className="text-destructive/80 max-w-md">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-center bg-card/50 rounded-lg border border-border">
        <Plane className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Ready to Analyze</h2>
        <p className="text-muted-foreground max-w-md">
          Use the sidebar to select a route and date to begin analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <h2 className="text-xl sm:text-2xl font-semibold">Australian Airfare Heatmap</h2>
      <AirfareHeatmap routes={data.airfareHeatmap} />
      
      <TopMovers data={data.topMovers} />
      
      <InsightCards data={data.insightCards} />
      
      <AIAnalystReport report={data.aiAnalystReport} />
      
      <DetailedTrendChart data={data.detailedTrendChart} />
      
      <div className="flex justify-between items-center pt-4">
        <h2 className="text-lg sm:text-xl font-semibold">Price Comparison for {filters.origin} to {filters.destination}</h2>
        <button onClick={handleScrollToTable} className="text-sm text-blue-400 hover:text-blue-500 flex items-center gap-1">
          See Full Data
        </button>
      </div>
      <FlightPriceChart data={data.flightPriceChart} />
      
      <div id="data-table" className="pt-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">All Available Flights</h2>
        <FlightDataTable flights={data.flightDataTable} />
      </div>
      
      <button onClick={handleScrollToTable} className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 sm:p-3 shadow-lg z-30 transition-transform hover:scale-110" aria-label="Scroll to data table">
        <ArrowDown size={18} />
      </button>
    </div>
  );
}