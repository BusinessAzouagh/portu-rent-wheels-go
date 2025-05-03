
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapLocationProps {
  latitude: number;
  longitude: number;
  linkUrl: string;
}

const MapLocation = ({ latitude, longitude, linkUrl }: MapLocationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  
  useEffect(() => {
    // Using a default token for development - in production this should be replaced
    // with your own token from https://mapbox.com/
    const token = 'pk.eyJ1IjoibG92YWJsZWhxIiwiYSI6ImNsc2I4ZmdlbzA3Z28yanA3NjRxaWl0Z2oifQ.S1e9Z0vtTlSkt5-6RlC8IQ';
    setMapboxToken(token);
  }, []);
  
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Set the access token
    mapboxgl.accessToken = mapboxToken;
    
    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 15,
        attributionControl: false
      });

      // Add marker
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add attribution control
      map.addControl(new mapboxgl.AttributionControl({
        compact: true
      }));

      // Clean up on unmount
      return () => map.remove();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [latitude, longitude, mapboxToken]);

  const handleMapClick = () => {
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div 
        ref={mapContainer} 
        className="h-56 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleMapClick}
        style={{ width: '100%' }}
      />
      {!mapboxToken && (
        <div className="text-center text-gray-300 mt-2 text-sm">
          Chargement de la carte...
        </div>
      )}
    </>
  );
};

export default MapLocation;
