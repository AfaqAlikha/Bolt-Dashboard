
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Spinner from 'react-bootstrap/Spinner';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const LocationMarker = ({ lat, lng }) => (
   
  <div>
    <LocationOnIcon style={{ color: 'red', fontSize: '30px' }} />
  </div>
);

const Index = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const latitude = parseFloat(params.get('latitude')) || 0;
  const longitude = parseFloat(params.get('longitude')) || 0;
  const mapRef = useRef(null); // Use ref instead of findDOMNode

  return (
    <div style={{ height: '400px', width: '100%' }} ref={mapRef}>
      {latitude !== 0 && longitude !== 0 ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB8KIVPOJDov4RMGzTh2phJ0wboGrAmYCQ' }} // Replace with your actual API key
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={15}
        >
          <LocationMarker
            lat={latitude}
            lng={longitude}
          />
        </GoogleMapReact>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export default Index;
