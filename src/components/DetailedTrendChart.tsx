import React, { useState } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendChartData } from '../types';

interface DetailedTrendChartProps {
    data: TrendChartData;
}

export function DetailedTrendChart({ data }: DetailedTrendChartProps) {
  const routes = Object.keys(data).map(key => ({ value: key, label: key.replace('-', ' to ') }));
  const [selectedRoute, setSelectedRoute] = useState(routes[0]?.value || '');
  
  const getLowestPrice = (d: any[]) => Math.min(...d.map(item => item.minPrice));
  const getHighestPrice = (d: any[]) => Math.max(...d.map(item => item.maxPrice));
  const getAveragePrice = (d: any[]) => Math.round(d.reduce((acc, item) => acc + item.avgPrice, 0) / d.length);

  const chartData = data[selectedRoute] || [];

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 relative z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">30-Day Price Trend</h2>
        <div className="w-full sm:w-64">
          <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} className="w-full bg-background border border-input rounded-md p-2 text-sm">
            {routes.map(route => <option key={route.value} value={route.value}>{route.label}</option>)}
          </select>
        </div>
      </div>
      <div className="h-60 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={value => `Day ${value}`} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={value => `$${value}`} />
            <Tooltip cursor={{ fill: 'hsl(var(--accent))' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
            <defs>
              <linearGradient id="minPriceGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} /><stop offset="95%" stopColor="#22C55E" stopOpacity={0} /></linearGradient>
              <linearGradient id="maxPriceGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#EF4444" stopOpacity={0} /></linearGradient>
            </defs>
            <Area type="monotone" dataKey="minPrice" name="Min Price" stroke="#22C55E" fill="url(#minPriceGradient)" strokeWidth={2} />
            <Line type="monotone" dataKey="avgPrice" name="Avg Price" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="maxPrice" name="Max Price" stroke="#EF4444" fill="url(#maxPriceGradient)" strokeWidth={2} />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>
       <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-sm">Best deal: <strong>${chartData.length > 0 ? getLowestPrice(chartData) : 'N/A'}</strong></span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-sm">Average price: <strong>${chartData.length > 0 ? getAveragePrice(chartData) : 'N/A'}</strong></span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-sm">Highest: <strong>${chartData.length > 0 ? getHighestPrice(chartData) : 'N/A'}</strong></span></div>
        </div>
      </div>
    </div>
  );
}