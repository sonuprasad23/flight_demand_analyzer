import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Plane } from 'lucide-react';
import { Logo } from '../components/Logo';
import { NewsletterForm } from '../components/NewsletterForm';
// Flight path animation component with convergence at app name
const AnimatedFlight = ({
  delay,
  duration,
  startX,
  startY,
  endX,
  endY,
  midX,
  midY,
  size,
  color,
  trailColor
}: {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  midX?: number;
  midY?: number;
  size: number;
  color: string;
  trailColor: string;
}) => {
  const [animationState, setAnimationState] = useState<'waiting' | 'flying' | 'converging' | 'hovering'>('waiting');
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Start the animation after delay
    const startTimer = setTimeout(() => {
      setAnimationState('flying');
      // Move to convergence point after 60% of duration
      const convergeTimer = setTimeout(() => {
        setAnimationState('converging');
        // Hover at the end point
        const hoverTimer = setTimeout(() => {
          setAnimationState('hovering');
        }, duration * 0.4);
        return () => clearTimeout(hoverTimer);
      }, duration * 0.6);
      return () => clearTimeout(convergeTimer);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay, duration]);
  // Calculate the current position for the animation
  const getPosition = () => {
    switch (animationState) {
      case 'waiting':
        return {
          left: startX,
          top: startY,
          opacity: 0,
          trailWidth: 0
        };
      case 'flying':
        return {
          left: midX || startX + (endX - startX) * 0.6,
          top: midY || startY + (endY - startY) * 0.6,
          opacity: 1,
          trailWidth: Math.max(30, Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 0.6)
        };
      case 'converging':
        return {
          left: endX,
          top: endY,
          opacity: 1,
          trailWidth: 0
        };
      case 'hovering':
        return {
          left: endX,
          top: endY,
          opacity: 0.7,
          trailWidth: 0
        };
      default:
        return {
          left: startX,
          top: startY,
          opacity: 0,
          trailWidth: 0
        };
    }
  };
  const position = getPosition();
  // Calculate rotation angle for the plane
  const getRotation = () => {
    if (animationState === 'waiting') return 0;
    const dx = (animationState === 'flying' ? midX || endX : endX) - startX;
    const dy = (animationState === 'flying' ? midY || endY : endY) - startY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };
  const rotation = getRotation();
  // Calculate the trail position and dimensions
  const getTrailStyle = () => {
    if (animationState !== 'flying' || !position.trailWidth) {
      return {
        opacity: 0
      };
    }
    const length = position.trailWidth;
    const angle = getRotation();
    return {
      width: `${length}px`,
      height: '2px',
      backgroundColor: trailColor,
      opacity: 0.6,
      position: 'absolute' as const,
      left: `${startX}px`,
      top: `${startY}px`,
      transformOrigin: 'left center',
      transform: `rotate(${angle}deg)`,
      transition: `width ${duration * 0.6}ms ease-out`,
      zIndex: 0
    };
  };
  return <>
      {/* Trail element */}
      <div ref={trailRef} style={getTrailStyle()} />
      {/* Plane element */}
      <div ref={planeRef} className={`absolute transition-all ease-out`} style={{
      left: `${position.left}px`,
      top: `${position.top}px`,
      opacity: position.opacity,
      transform: `rotate(${rotation}deg)`,
      transitionDuration: animationState === 'flying' ? `${duration * 0.6}ms` : `${duration * 0.4}ms`,
      zIndex: 5
    }}>
        <Plane size={size} className={color} />
      </div>
    </>;
};
export function WelcomePage() {
  const navigate = useNavigate();
  const appNameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const [namePosition, setNamePosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  // Get container dimensions and app name position on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const {
          width,
          height
        } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width,
          height
        });
      }
      if (appNameRef.current) {
        const {
          left,
          top,
          width,
          height
        } = appNameRef.current.getBoundingClientRect();
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          setNamePosition({
            x: left - containerRect.left,
            y: top - containerRect.top,
            width,
            height
          });
        }
      }
    };
    // Initial measurement
    setTimeout(updateDimensions, 100);
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  // Generate flight paths that converge at the app name
  const getFlightPaths = () => {
    if (dimensions.width === 0 || namePosition.width === 0) return [];
    const centerX = namePosition.x + namePosition.width / 2;
    const centerY = namePosition.y + namePosition.height / 2;
    return [
    // Top left to app name
    {
      startX: -20,
      startY: -20,
      endX: centerX - 60,
      endY: centerY,
      delay: 1000,
      duration: 5000,
      size: 24,
      color: 'text-blue-600',
      trailColor: '#3b82f6'
    },
    // Top right to app name
    {
      startX: dimensions.width + 20,
      startY: -20,
      endX: centerX + 60,
      endY: centerY,
      delay: 2000,
      duration: 5500,
      size: 22,
      color: 'text-blue-500',
      trailColor: '#60a5fa'
    },
    // Bottom left to app name
    {
      startX: -20,
      startY: dimensions.height - 100,
      endX: centerX - 30,
      endY: centerY + 10,
      delay: 3000,
      duration: 6000,
      size: 20,
      color: 'text-indigo-600',
      trailColor: '#6366f1'
    },
    // Bottom right to app name
    {
      startX: dimensions.width + 20,
      startY: dimensions.height - 50,
      endX: centerX + 30,
      endY: centerY + 10,
      delay: 1500,
      duration: 5200,
      size: 18,
      color: 'text-sky-600',
      trailColor: '#0ea5e9'
    },
    // Middle left to app name
    {
      startX: -20,
      startY: dimensions.height / 2,
      endX: centerX - 40,
      endY: centerY - 10,
      delay: 2500,
      duration: 4800,
      size: 26,
      color: 'text-blue-700',
      trailColor: '#1d4ed8'
    },
    // Middle right to app name
    {
      startX: dimensions.width + 20,
      startY: dimensions.height / 2 - 100,
      endX: centerX + 50,
      endY: centerY - 5,
      delay: 800,
      duration: 5300,
      size: 22,
      color: 'text-cyan-600',
      trailColor: '#0891b2'
    },
    // Top middle to app name
    {
      startX: dimensions.width / 2 - 100,
      startY: -20,
      endX: centerX - 20,
      endY: centerY - 15,
      delay: 3500,
      duration: 4500,
      size: 20,
      color: 'text-blue-600',
      trailColor: '#3b82f6'
    },
    // Bottom middle to app name
    {
      startX: dimensions.width / 2 + 100,
      startY: dimensions.height + 20,
      endX: centerX + 20,
      endY: centerY + 15,
      delay: 2200,
      duration: 5700,
      size: 24,
      color: 'text-indigo-500',
      trailColor: '#6366f1'
    }];
  };
  const flightPaths = getFlightPaths();
  return <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
          {/* Grid pattern */}
          <div className="grid grid-cols-6 h-full">
            {Array.from({
            length: 7
          }).map((_, i) => <div key={i} className="border-r border-gray-300/20"></div>)}
          </div>
          <div className="grid grid-rows-6 w-full">
            {Array.from({
            length: 7
          }).map((_, i) => <div key={i} className="border-b border-gray-300/20"></div>)}
          </div>
        </div>
      </div>
      {/* Flight animations container */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        {flightPaths.map((path, index) => <AnimatedFlight key={index} delay={path.delay} duration={path.duration} startX={path.startX} startY={path.startY} endX={path.endX} endY={path.endY} size={path.size} color={path.color} trailColor={path.trailColor} />)}
        {/* Additional decorative small planes */}
        <div className="absolute left-[10%] top-1/4 animate-[spin_30s_linear_infinite] opacity-30">
          <div className="relative w-32 h-32">
            <Plane className="h-4 w-4 text-blue-300 absolute" />
          </div>
        </div>
        <div className="absolute right-[15%] bottom-1/3 animate-[spin_25s_linear_infinite_reverse] opacity-20">
          <div className="relative w-24 h-24">
            <Plane className="h-3 w-3 text-indigo-300 absolute" />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <header className="w-full p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div ref={appNameRef} className="flex items-center gap-2 relative">
              <div className="relative">
                <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
                <div className="absolute -inset-1 bg-blue-100/50 rounded-full blur-md -z-10"></div>
              </div>
              <span className="text-blue-900 font-medium text-lg sm:text-xl relative">
                Airline Analyzer
                <div className="absolute -inset-1 bg-blue-50/80 rounded-lg blur-sm -z-10"></div>
              </span>
            </div>
            <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base font-medium">
              Skip to Dashboard
            </button>
          </div>
        </header>
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-4">
              Beyond the Horizon.
              <br />
              Before the Booking.
            </h1>
            <h2 className="text-xl sm:text-2xl text-blue-600 font-medium mb-6">
              Flight Demand Analyzer
            </h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
              We scan thousands of flights across Australia every day. Get
              AI-powered insights on pricing, demand, and the best times to
              travel. Your unfair advantage starts here.
            </p>
            <button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md flex items-center justify-center gap-2 mx-auto transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95">
              Launch Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="bg-blue-50/80 py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-8">
              Get Ahead of the Trends. Join the Insider's List.
            </h2>
            <NewsletterForm />
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-white py-6 text-center text-gray-500 text-sm border-t border-gray-100">
          <p>© 2023 Airline Analyzer. All rights reserved.</p>
        </footer>
      </div>
    </div>;
}