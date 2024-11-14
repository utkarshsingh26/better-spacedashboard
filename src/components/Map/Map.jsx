import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchAutocomplete from "../SearchAutocomplete/SearchAutocomplete";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ center }) {
  const defaultProps = {
    center: {
      lat: 33.4255,
      lng: -111.9400,
    },
    zoom: 3,
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <SearchAutocomplete />
      <MapContainer
        center={center || defaultProps.center}
        zoom={defaultProps.zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center || defaultProps.center}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
