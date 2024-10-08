import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const Map = ({ center, markersData }) => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={center}
        zoom={10}
      >
        {markersData.map((marker, index) => (
          <Marker key={`${marker.position.lat},${marker.position.lng}`} position={marker.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

// Adicionando a validação de props
Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  markersData: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Map;


