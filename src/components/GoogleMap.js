import React, { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.querySelector('script[src*="maps.googleapis"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYa2Mz7YZ0DmVmBE9HrHjGQcK-IHijzeI&callback=initMap&libraries=places`;
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
        center: { lat: 40.1215, lng: -100.4503 }, // Centralize o mapa aqui
        zoom: 4,
      });

      new window.google.maps.Marker({
        position: { lat: 40.1215, lng: -100.4503 }, // Posição inicial do marcador
        map,
        title: 'My location',
      });
    };

    loadGoogleMapsScript();

    return () => {
      delete window.initMap;
    };
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default GoogleMap;

