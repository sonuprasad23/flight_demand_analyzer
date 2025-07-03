// This file defines the "contract" between our frontend and backend.

export interface Flight {
  id: number;
  airline: string;
  flight: string;
  departure: string;
  arrival: string;
  price: number;
}

export interface InsightCardsData {
  cheapestFlight: {
    price: number;
    airline: string;
    flightNumber: string;
  };
  busiestAirline: {
    name: string;
    flightCount: number;
  };
  bestDeal: {
    name: string;
    savings: string;
  };
}

export interface ChartDataPoint {
  name: string;
  price: number;
}

export interface ApiResponse {
  insightCards: InsightCardsData;
  aiAnalystReport: string;
  flightPriceChart: ChartDataPoint[];
  flightDataTable: Flight[];
}