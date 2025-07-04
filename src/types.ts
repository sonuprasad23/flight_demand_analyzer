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

export interface HeatmapRoute {
    from: string;
    to: string;
    status: 'green' | 'yellow' | 'red';
    price: string;
}

export interface Mover {
    route?: string;
    airline?: string;
    drop?: string;
    price?: string;
    city?: string;
    flights?: number;
    change?: string;
}

export interface TrendChartData {
    [route: string]: {
        day: number;
        minPrice: number;
        avgPrice: number;
        maxPrice: number;
    }[];
}

export interface ApiResponse {
  airfareHeatmap: HeatmapRoute[];
  topMovers: {
      priceDrops: Mover[];
      highDemand: Mover[];
  };
  insightCards: InsightCardsData;
  aiAnalystReport: string;
  detailedTrendChart: TrendChartData;
  flightPriceChart: ChartDataPoint[];
  flightDataTable: Flight[];
}