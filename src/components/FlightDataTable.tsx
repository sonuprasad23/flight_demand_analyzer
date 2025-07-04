import React from 'react';
import { Flight } from '../types';

interface FlightDataTableProps {
  flights: Flight[];
}

export function FlightDataTable({ flights }: FlightDataTableProps) {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No flight data to display for this route.
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Airline</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Flight</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Departure</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Arrival</th>
              <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {flights.map((flight, index) => (
              <tr key={flight.id || index} className="hover:bg-muted/20">
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">{flight.airline}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted-foreground">{flight.flight}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{flight.departure}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{flight.arrival}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-right font-medium">${flight.price.toFixed(2)} AUD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}