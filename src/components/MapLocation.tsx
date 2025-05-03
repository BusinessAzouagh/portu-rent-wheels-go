
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapLocationProps {
  latitude: number;
  longitude: number;
  linkUrl: string;
}

const MapLocation = ({ latitude, longitude, linkUrl }: MapLocationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;

    // You should replace this with your Mapbox token in a production environment
    mapboxgl.accessToken = 'pk.eyJ1IjoicHVibGljLXRva2VuIiwiYSI6ImNsbW1wOXlwZzA4NGozanM3cDYwenZxMDAifQ.x4U0HUxaD1YEZOc9yyN3Kg';
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 15
    });

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, [latitude, longitude]);

  const handleMapClick = () => {
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      ref={mapContainer} 
      className="h-40 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleMapClick}
    />
  );
};

export default MapLocation;
