import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { ApiResponse } from './types';
import axios from 'axios';

export function App() {
  const [departureCity, setDepartureCity] = useState('Sydney');
  const [arrivalCity, setArrivalCity] = useState('Melbourne');
  const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);
  
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasResults, setHasResults] = useState(false);

  const handleAnalyzeDemand = async () => {
    if (!departureCity || !arrivalCity || !date) {
      setError("Please select departure city, arrival city, and date.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasResults(false);

    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
    const backendUrl = `${baseUrl}/api/analyze-demand`;

    try {
      const response = await axios.get(backendUrl, {
        params: {
          origin: departureCity,
          destination: arrivalCity,
          date: date,
        }
      });
      
      const data: ApiResponse = response.data;
      setApiData(data);
      setHasResults(true);
    } catch (e: any) {
      console.error("Failed to fetch data:", e);
      if (e.response) {
        setError(e.response.data.detail || "An error occurred from the API.");
      } else if (e.request) {
        setError("Could not connect to the analysis server. Is it running?");
      } else {
        setError(e.message || "An unexpected error occurred.");
      }
      setApiData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Layout 
        sidebar={
          <Sidebar
            departureCity={departureCity}
            setDepartureCity={setDepartureCity}
            arrivalCity={arrivalCity}
            setArrivalCity={setArrivalCity}
            date={date}
            setDate={setDate}
            onAnalyze={handleAnalyzeDemand}
            isLoading={isLoading}
          />
        }
      >
        <Dashboard 
          isLoading={isLoading}
          hasResults={hasResults}
          error={error}
          data={apiData}
        />
      </Layout>
    </div>
  );
}