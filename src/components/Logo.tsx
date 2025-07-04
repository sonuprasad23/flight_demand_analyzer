import React from 'react';
interface LogoProps {
  className?: string;
}
export function Logo({
  className = 'h-6 w-6'
}: LogoProps) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 30C80 46.5685 66.5685 60 50 60C33.4315 60 20 46.5685 20 30C20 13.4315 33.4315 0 50 0C66.5685 0 80 13.4315 80 30Z" fill="#3B82F6" fillOpacity="0.7" />
      <path d="M70 70C70 86.5685 56.5685 100 40 100C23.4315 100 10 86.5685 10 70C10 53.4315 23.4315 40 40 40C56.5685 40 70 53.4315 70 70Z" fill="#60A5FA" fillOpacity="0.5" />
      <path d="M90 50C90 66.5685 76.5685 80 60 80C43.4315 80 30 66.5685 30 50C30 33.4315 43.4315 20 60 20C76.5685 20 90 33.4315 90 50Z" fill="#2563EB" fillOpacity="0.6" />
      <path d="M15 20L85 80" stroke="white" strokeWidth="6" strokeLinecap="round" />
      <path d="M15 20L50 40" stroke="white" strokeWidth="6" strokeLinecap="round" />
    </svg>;
}