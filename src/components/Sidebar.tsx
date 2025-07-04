import React, { useState } from 'react';
import { Plane, Search, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: { origin: string; destination: string; date: string; };
  setFilters: React.Dispatch<React.SetStateAction<{ origin: string; destination: string; date: string; }>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

export function Sidebar({ isOpen, onClose, filters, setFilters, onAnalyze, isLoading }: SidebarProps) {
  const [showProTip, setShowProTip] = useState(false);
  const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Cairns', 'Canberra', 'Hobart', 'Darwin'];

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              <h1 className="text-lg sm:text-xl font-bold">Aussie Backpacker Flow</h1>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-accent transition-colors lg:hidden" aria-label="Close sidebar">
              <X size={18} />
            </button>
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col gap-4 sm:gap-6 overflow-y-auto">
            <div className="space-y-4">
              <h2 className="font-medium">Dashboard Filters</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="departure">From:</label>
                <select id="departure" className="w-full bg-background border border-input rounded-md p-2 text-sm" value={filters.origin} onChange={e => handleFilterChange('origin', e.target.value)}>
                  {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="arrival">To:</label>
                <select id="arrival" className="w-full bg-background border border-input rounded-md p-2 text-sm" value={filters.destination} onChange={e => handleFilterChange('destination', e.target.value)}>
                  {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="date">Date:</label>
                <input id="date" type="date" className="w-full bg-background border border-input rounded-md p-2 text-sm" value={filters.date} onChange={e => handleFilterChange('date', e.target.value)} />
              </div>
            </div>
            <button onClick={onAnalyze} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-all hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
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
              <p className="mt-1 text-muted-foreground">The Heatmap and Trend charts use mock data. Focus analysis on the specific route you select.</p>
            </div>}
        </div>
      </div>
    </>
  );
}