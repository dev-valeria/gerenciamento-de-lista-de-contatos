import React, { useEffect, useRef } from 'react';

const Map = ({ center, markersData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Função para carregar o script do Google Maps
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
        // Se o script já foi carregado, inicializa o mapa
        window.initMap();
      }
    };

    // Inicializa o mapa e os marcadores
    window.initMap = () => {
      if (!window.google || !mapRef.current) {
        return;
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 10,
      });

      // Adiciona os marcadores no mapa
      markersData.forEach(marker => {
        new window.google.maps.Marker({
          position: marker.position,
          map,
        });
      });
    };

    // Chama a função para carregar o script da API
    loadGoogleMapsScript();

    // Limpeza ao desmontar o componente
    return () => {
      delete window.initMap;
    };
  }, [center, markersData]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default Map;
