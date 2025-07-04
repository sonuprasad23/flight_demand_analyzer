import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);
  return <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Toggle theme">
      {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-500" />}
    </button>;
}