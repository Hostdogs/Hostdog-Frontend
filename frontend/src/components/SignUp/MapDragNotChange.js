import { GoogleMap,Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '600px',
    height: '400px'
  };
  


export default function MapDragNotChange({handleDragEnd ,currentGeoCode}) {


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