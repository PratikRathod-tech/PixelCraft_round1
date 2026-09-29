import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

export interface MapMarker {
  lat: number;
  lng: number;
  title?: string;
  popup?: string;
}

export interface PixelMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  theme?: 'dark' | 'light';
}

/**
 * PixelMap — Interactive OpenStreetMap / Leaflet Map Adapter Component
 * Zero API keys required. Includes dark mode tile provider & custom popups.
 */
export const PixelMap: React.FC<PixelMapProps> = ({
  center = [37.7749, -122.4194], // Default San Francisco
  zoom = 13,
  markers = [{ lat: 37.7749, lng: -122.4194, title: 'Competition HQ', popup: 'Pixelcraft Armory Main Stage' }],
  className = 'h-[350px] w-full',
  theme = 'dark',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (leafletMap.current) {
      leafletMap.current.remove();
    }

    try {
      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: true,
      });

      // Dark mode tile layer (CartoDB Dark Matter / OpenStreetMap)
      const tileUrl =
        theme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add Markers
      markers.forEach((m) => {
        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="background-color: #06b6d4; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #0f172a; box-shadow: 0 0 12px #06b6d4;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(map);
        if (m.popup || m.title) {
          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; color: #0f172a;">
              <strong>${m.title || 'Marker'}</strong>
              ${m.popup ? `<p style="margin-top: 4px; color: #475569;">${m.popup}</p>` : ''}
            </div>
          `);
        }
      });

      leafletMap.current = map;
    } catch (err) {
      console.warn('Leaflet map initialization fallback:', err);
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [center, zoom, markers, theme]);

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 ${className}`}>
      <div ref={mapRef} className="w-full h-full z-0" />
      <div className="absolute bottom-3 left-3 z-10 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg p-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
        <Navigation className="w-3.5 h-3.5" />
        <span>OSM OpenStreetMap Engine Active</span>
      </div>
    </div>
  );
};
