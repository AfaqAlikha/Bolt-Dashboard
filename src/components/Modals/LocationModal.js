import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Spinner from 'react-bootstrap/Spinner';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const LocationMarker = ({ lat, lng }) => (
  <div>
    <LocationOnIcon style={{ color: 'red', fontSize: '30px' }} />
  </div>
);

const LocationModal = ({ show, handleClose, latitude, longitude }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={containerStyle}>
          {latitude !== 0 && longitude !== 0 ? (
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyB8KIVPOJDov4RMGzTh2phJ0wboGrAmYCQ' }} // Replace with your actual API key
              defaultCenter={{ lat: latitude, lng: longitude }}
              defaultZoom={15}
            >
              <LocationMarker lat={latitude} lng={longitude} />
            </GoogleMapReact>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationModal;
