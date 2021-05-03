import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import HostAPI from '../API/HostAPI'
const containerStyle = {
  // width: '80%',
  height: '250px'
};

const loadScript = {
  googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
  language: "th",
}
export default function GoogleMapService({ host }) {
  const [customerGeocode, setCustomerGeocode] = useState({})
  const [hostGeocode, setHostGeocode] = useState({})
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  const success = (position) => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    setCustomerGeocode(currentPosition);


  };






  useEffect(() => {
    if (host) {
      getUserLocation();
      setHostGeocode({
        lat: parseFloat(host.latitude),
        lng: parseFloat(host.longitude),
      });
    }

  }, [host])

  return (
    <div >
      <LoadScript
        googleMapsApiKey={loadScript.googleAPIKey}
        language={loadScript.language}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={customerGeocode}
          zoom={12}
        >
          <Marker position={hostGeocode} draggable={false} />
          <Marker position={customerGeocode} draggable={false} />

        </GoogleMap>
      </LoadScript>
    </div>
  )
}