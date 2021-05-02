import { GoogleMap,LoadScript, Marker} from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import HostAPI from '../API/HostAPI'
const containerStyle = {
    // width: '80%',
    height: '300px'
  };
  
  const loadScript ={
    googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
    language: "th",
  }
export default function GoogleMapService({mytoken,host_id}) {
    const [customerGeocode,setCustomerGeocode]=useState({})
    const [hostGeocode,setHostGeocode]=useState({})
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
const getHostLocation=async()=>{
const response=await HostAPI.getHostDetails(mytoken,host_id)
const hostDetail=response.data    
setHostGeocode({
    lat: parseFloat(hostDetail.latitude),
    lng: parseFloat(hostDetail.longitude),
  });

}


useEffect(() => {
    getUserLocation();
    getHostLocation();
}, [])
    return (
        <div>
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
        <Marker position={customerGeocode} draggable={false}/>
        
      </GoogleMap>
      </LoadScript>
        </div>
    )
}