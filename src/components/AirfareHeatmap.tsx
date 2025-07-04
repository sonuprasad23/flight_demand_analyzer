import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeatmapRoute } from '../types';

interface AirfareHeatmapProps {
  routes: HeatmapRoute[];
}

const airports: { [key: string]: L.LatLngExpression } = {
  Sydney: [-33.9399, 151.1753], Melbourne: [-37.669, 144.841], Brisbane: [-27.3942, 153.1218],
  Perth: [-31.9405, 115.9674], Adelaide: [-34.945, 138.5311], "Gold Coast": [-28.1667, 153.5333],
  Cairns: [-16.8858, 145.755], Canberra: [-35.2809, 149.13], Hobart: [-42.8361, 147.507], Darwin: [-12.4083, 130.8889]
};
const airportCodes: { [key: string]: string } = {
  Sydney: "SYD", Melbourne: "MEL", Brisbane: "BNE", Perth: "PER", Adelaide: "ADL", 
  "Gold Coast": "OOL", Cairns: "CNS", Canberra: "CBR", Hobart: "HBA", Darwin: "DRW"
};


export function AirfareHeatmap({ routes }: AirfareHeatmapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, { zoomControl: false }).setView([-28, 134], 4);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB',
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    const style = document.createElement('style');
    style.innerHTML = `
      .airport-label { background: transparent; border: none; box-shadow: none; color: white; font-weight: bold; font-size: 12px; text-shadow: 1px 1px 2px black; }
      .price-tooltip { background: rgba(30, 41, 59, 0.9); border: 1px solid #3B82F6; border-radius: 4px; color: white; }
      .leaflet-container { background-color: #0f172a; }
      .leaflet-pane, .leaflet-control { z-index: 20 !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !routes) return;

    const map = mapInstanceRef.current;
    map.eachLayer(layer => {
      if (!!layer.getLatLng) { map.removeLayer(layer); }
    });
    
    Object.entries(airports).forEach(([name, coords]) => {
      L.circle(coords, { color: '#3B82F6', fillColor: '#2563EB', fillOpacity: 0.8, radius: 20000 })
        .addTo(map).bindTooltip(airportCodes[name], { permanent: true, direction: 'center', className: 'airport-label' });
    });

    routes.forEach(route => {
      const fromCoords = airports[route.from];
      const toCoords = airports[route.to];
      if (fromCoords && toCoords) {
        const color = route.status === 'green' ? '#22C55E' : route.status === 'yellow' ? '#EAB308' : '#EF4444';
        const line = L.polyline([fromCoords, toCoords], { color, weight: 3, opacity: 0.7 }).addTo(map);
        line.bindTooltip(`${airportCodes[route.from]} to ${airportCodes[route.to]}: ${route.price}`, { sticky: true, className: 'price-tooltip' });
      }
    });

  }, [routes]);


  return <div className="bg-card border border-border rounded-lg overflow-hidden relative z-20">
      <div ref={mapRef} className="h-[400px] w-full"></div>
      <div className="p-4 flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-sm text-muted-foreground">Below Average</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-sm text-muted-foreground">Average</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-sm text-muted-foreground">Above Average</span></div>
      </div>
    </div>;
}