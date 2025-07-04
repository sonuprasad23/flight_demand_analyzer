import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import { Logo } from './Logo';

interface Message {
    text: string;
    isUser: boolean;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hi there! I'm your AI flight assistant. Ask me anything like 'Compare flights from Sydney to Cairns tomorrow'.", isUser: false }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsProcessing(true);

        const baseUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
        try {
            const response = await axios.post(`${baseUrl}/api/chat`, { message: input });
            const botMessage = { text: response.data.reply, isUser: false };
            setMessages(prev => [...prev, botMessage]);
        } catch (error: any) {
            const errorMessage = { text: "Sorry, I'm having trouble connecting. Please try again later.", isUser: false };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-[100] bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <MessageSquare size={24} />
            </button>
            <div className={`fixed bottom-0 right-0 z-[100] w-full sm:w-96 h-full sm:h-[500px] sm:max-h-[80vh] bg-card border border-border sm:rounded-lg shadow-xl transition-all duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} flex flex-col`}>
                <div className="p-3 border-b border-border flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-2"><Logo className="h-6 w-6" /><h3 className="font-medium">AI Flight Assistant</h3></div>
                    <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-accent"><X size={18} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-lg p-3 ${message.isUser ? 'bg-blue-600 text-white' : 'bg-muted/30 border border-border'}`}>
                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                         <div className="flex justify-start">
                            <div className="max-w-[85%] rounded-lg p-3 bg-muted/30 border border-border">
                               <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader size={16} className="animate-spin" /><span>Thinking...</span></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-border mt-auto">
                    <div className="relative">
                        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about flights..." className="w-full bg-background border border-input rounded-md py-2 pl-3 pr-10 text-sm resize-none" rows={1} disabled={isProcessing} />
                        <button onClick={handleSend} disabled={isProcessing || !input.trim()} className={`absolute right-2 bottom-1.5 p-1.5 rounded-md ${isProcessing || !input.trim() ? 'text-muted-foreground' : 'text-blue-500 hover:bg-accent/50'}`}><Send size={16} /></button>
                    </div>
                </div>
            </div>
        </>
    );
}