import React from "react";
import GoogleMapReact from 'google-map-react';
import SearchAutocomplete from "../SearchAutocomplete/SearchAutocomplete";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({ center }) {
  const defaultProps = {
    center: {
      lat: 33.4255,
      lng: -111.9400,
    },
    zoom: 2,
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <SearchAutocomplete />
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }} 
        center={center || defaultProps.center} 
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={center ? center.lat : defaultProps.center.lat} 
          lng={center ? center.lng : defaultProps.center.lng} 
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
