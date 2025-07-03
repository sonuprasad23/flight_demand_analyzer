import React, { useState } from 'react';
import { Plane, Search } from 'lucide-react';

interface SidebarProps {
  departureCity: string;
  setDepartureCity: (city: string) => void;
  arrivalCity: string;
  setArrivalCity: (city: string) => void;
  date: string;
  setDate: (date: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export function Sidebar({
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  date,
  setDate,
  onAnalyze,
  isLoading
}: SidebarProps) {
  const [showProTip, setShowProTip] = useState(false);
  const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Cairns', 'Canberra', 'Hobart', 'Darwin'];

  return (
    <div className="w-80 h-full bg-card border-r border-border flex flex-col shrink-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold">Airline Demand Analyzer</h1>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="space-y-4">
          <h2 className="font-medium">Filters</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="departure">From:</label>
            <select
              id="departure"
              className="w-full bg-background border border-input rounded-md p-2 text-sm"
              value={departureCity}
              onChange={e => setDepartureCity(e.target.value)}
            >
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="arrival">To:</label>
            <select
              id="arrival"
              className="w-full bg-background border border-input rounded-md p-2 text-sm"
              value={arrivalCity}
              onChange={e => setArrivalCity(e.target.value)}
            >
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              className="w-full bg-background border border-input rounded-md p-2 text-sm"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-all hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={18} />
          {isLoading ? 'Analyzing...' : 'Analyze Demand'}
        </button>
      </div>
      <div className="p-4 border-t border-border mt-auto">
        <button onClick={() => setShowProTip(!showProTip)} className="text-sm text-blue-400 hover:text-blue-500 flex items-center gap-1">
          {showProTip ? 'Hide Pro Tip' : 'Show Pro Tip'}
        </button>
        {showProTip && <div className="mt-2 p-3 bg-blue-900/20 border border-blue-800 rounded-md text-xs">
          <p className="font-medium text-blue-400">Pro Tip:</p>
          <p className="mt-1 text-muted-foreground">
            For best results, check popular routes like SYD-MEL or BNE-CNS during peak travel seasons.
          </p>
        </div>}
      </div>
    </div>
  );
}