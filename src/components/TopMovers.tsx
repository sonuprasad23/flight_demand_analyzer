import React from 'react';
import { TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Mover } from '../types';

interface TopMoversProps {
    data: { priceDrops: Mover[], highDemand: Mover[] };
}

export function TopMovers({ data }: TopMoversProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-20">
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2"><TrendingDown className="h-5 w-5 text-green-500" /><span>Top Price Drops</span></h3>
          <span className="text-xs text-muted-foreground">Last 24 hours</span>
        </div>
        <div className="space-y-3">
          {data.priceDrops.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/20">
              <div>
                <div className="font-medium">{item.route}</div>
                <div className="text-sm text-muted-foreground">{item.airline}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-500">↓ {item.drop}</div>
                <div className="text-sm text-muted-foreground">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /><span>High-Demand Hotspots</span></h3>
          <span className="text-xs text-muted-foreground">Most inbound flights</span>
        </div>
        <div className="space-y-3">
          {data.highDemand.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/20">
              <div>
                <div className="font-medium">{item.city}</div>
                <div className="text-sm text-muted-foreground">{item.flights} inbound flights today</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-500 flex items-center gap-1"><TrendingUp className="h-4 w-4" />{item.change}</div>
                <div className="text-xs text-muted-foreground">vs. last week</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}