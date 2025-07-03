import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export function Layout({ children, sidebar }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {sidebar}
      <div className="flex-1 overflow-auto">
        <header className="h-14 border-b border-border flex items-center justify-end px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <ThemeToggle />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}