import React, { useEffect, useRef } from 'react';

const Map = ({ center, markersData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.querySelector('script[src*="maps.googleapis"]');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          window.initMap();
        };
      } else if (window.google && window.google.maps) {
        window.initMap();
      }
    };

    window.initMap = () => {
      if (!window.google || !mapRef.current) {
        return;
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 10,
      });

      // Limpa os marcadores anteriores
      if (markersData) {
        markersData.forEach(marker => {
          new window.google.maps.Marker({
            position: marker.position,
            map,
          });
        });
      }
    };

    loadGoogleMapsScript();

    return () => {
      delete window.initMap;
    };
  }, [center, markersData]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default Map;

