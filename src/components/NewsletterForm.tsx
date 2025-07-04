import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Loader } from 'lucide-react';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    
    const [favDestinations, setFavDestinations] = useState<string[]>([]);
    const [travelOrigin, setTravelOrigin] = useState('');
    const [dob, setDob] = useState('');

    const popularDests = ["Byron Bay", "Cairns", "Whitsundays", "Uluru", "Melbourne Laneways"];
    const popularOrigins = ["(Select an origin)", "United Kingdom", "Germany", "USA", "Canada", "New Zealand", "Within Australia"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const baseUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
        try {
            const response = await axios.post(`${baseUrl}/api/newsletter`, {
                email,
                favDestinations,
                travelOrigin,
                dob,
            });
            setStatus('success');
            setMessage(response.data.message);
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.detail || "An error occurred. Please try again.");
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 text-center">
                <p className="font-medium">{message}</p>
                <p className="text-sm mt-1">You're officially an insider!</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800" required />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <select value={travelOrigin} onChange={e => setTravelOrigin(e.target.value)} className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-800">
                        {popularOrigins.map(o => <option key={o} value={o === popularOrigins[0] ? '' : o}>{o}</option>)}
                     </select>
                     <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-800" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Top destinations your guests ask about? (Optional)</label>
                    <div className="flex flex-wrap gap-2">
                        {popularDests.map(dest => (
                             <button type="button" key={dest} onClick={() => {
                                 setFavDestinations(prev => prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]);
                             }} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${favDestinations.includes(dest) ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                                 {dest}
                             </button>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap disabled:bg-blue-400">
                    {status === 'loading' ? <><Loader size={18} className="animate-spin" /> Subscribing...</> : <>Subscribe <ArrowRight size={18} /></>}
                </button>
                {status === 'error' && <p className="text-red-600 text-sm text-center mt-2">{message}</p>}
            </form>
            <p className="text-sm text-gray-600 mt-3 text-center">Get weekly insights on flight pricing trends and travel demand.</p>
        </div>
    );
}