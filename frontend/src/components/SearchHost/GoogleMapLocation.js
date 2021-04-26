import React from 'react'
import { GoogleMap,Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '80%',
    height: '300px'
  };
  


export default function GoogleMapLocation({handleDragEnd ,currentGeoCode}) {


    return (
        <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentGeoCode}
        zoom={17}
      >
        <Marker position={currentGeoCode} draggable={true}  onDragEnd={(e)=>handleDragEnd(e)} />
        
      </GoogleMap>

        </div>
    )
}
