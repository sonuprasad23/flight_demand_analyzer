import React, { useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import { ChatBot } from '../components/ChatBot';
import { Dashboard } from '../components/Dashboard';
import { ApiResponse } from '../types';
import { ThemeToggle } from '../components/ThemeToggle';
import { Menu, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dashboardData, setDashboardData] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];
    
    const [filters, setFilters] = useState({
        origin: 'Sydney',
        destination: 'Melbourne',
        date: defaultDate,
    });

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        setSidebarOpen(false);
        const baseUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
        try {
            const response = await axios.get(`${baseUrl}/api/dashboard-data`, { params: filters });
            setDashboardData(response.data);
        } catch (e: any) {
            setError(e.response?.data?.detail || "Failed to fetch dashboard data. The route may be unavailable or the server is busy.");
            setDashboardData(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)}
                filters={filters}
                setFilters={setFilters}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-14 border-b border-border flex-shrink-0 flex items-center justify-between px-4 sm:px-6 bg-background/80 backdrop-blur-sm z-30">
                    <div className="flex items-center gap-2">
                        <button
                          className="p-2 -ml-2 rounded-md hover:bg-accent transition-colors lg:hidden"
                          onClick={() => setSidebarOpen(true)}
                          aria-label="Open sidebar"
                        >
                          <Menu size={20} />
                        </button>
                        <Link to="/" className="flex items-center gap-2 lg:hidden">
                          <Plane className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-sm">Aussie Backpacker Flow</span>
                        </Link>
                    </div>
                    <ThemeToggle />
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Dashboard
                        data={dashboardData}
                        isLoading={isLoading}
                        error={error}
                        filters={filters}
                    />
                </main>
            </div>
            <ChatBot />
        </div>
    );
}