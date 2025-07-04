import React from 'react';
import { TrendingDown, Plane, DollarSign } from 'lucide-react';
import { InsightCardsData } from '../types';

interface InsightCardsProps {
  data: InsightCardsData;
}

export function InsightCards({ data }: InsightCardsProps) {
  const { cheapestFlight, busiestAirline, bestDeal } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Cheapest Flight Found</h3>
          <TrendingDown className="h-5 w-5 text-green-500" />
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl sm:text-3xl font-bold">${cheapestFlight.price.toFixed(2)}</span>
          <span className="ml-1 text-sm text-muted-foreground">AUD</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground truncate">{cheapestFlight.airline} • {cheapestFlight.flightNumber}</p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Route Popularity</h3>
          <Plane className="h-5 w-5 text-blue-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl sm:text-3xl font-bold">{busiestAirline.flightCount}</span>
          <span className="ml-2 text-base text-muted-foreground">Flights Today</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Busiest Carrier: {busiestAirline.name}</p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Best Value On</h3>
          <DollarSign className="h-5 w-5 text-green-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl sm:text-3xl font-bold">{bestDeal.name}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{bestDeal.savings}</p>
      </div>
    </div>
  );
}