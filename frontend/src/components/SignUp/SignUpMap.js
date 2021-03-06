import { GoogleMap,Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%', 
    height: '350px'
  };
  


export default function SignUpMap({handleDragEnd ,currentGeoCode}) {


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