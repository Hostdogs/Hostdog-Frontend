import React from 'react'
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  


export default function GoogleMapLocation({apikey ,handleDragEnd ,currentGeoCode}) {


    return (
        <div>
            <LoadScript
      googleMapsApiKey={apikey}
      language="th"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentGeoCode}
        zoom={17}
      >
        <Marker position={currentGeoCode} draggable={true}  onDragEnd={(e)=>handleDragEnd(e)} />
        
      </GoogleMap>
    </LoadScript>
        </div>
    )
}
