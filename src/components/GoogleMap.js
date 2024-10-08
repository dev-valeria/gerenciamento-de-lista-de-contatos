import React, { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.1215, lng: -100.4503 }, 
        zoom: 4,
        mapId: 'DEMO_MAP_ID', 
      });

      new window.google.maps.Marker({
        position: { lat: 40.1215, lng: -100.4503 },
        map: map,
        title: 'My location',
      });
    };

    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default GoogleMap;
