import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onSidebarOpen: () => void;
}

export function Layout({ children, onSidebarOpen }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* The children here will be the Sidebar and the main Dashboard content */}
      {children}
      
      {/* 
        This is a common pattern for a mobile-first responsive header that is part of the layout.
        We can also have the header inside the main content area if we prefer. Let's move it
        into the main content area for better structure.
      */}
    </div>
  );
}