import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginTop : '8px',
  borderRadius: '6px'
  
};
// --------------------------------------------------------------------------------------------- /
// params of  to center map
const center = {
  lat: 32.36441712785833,
  lng: 15.16091104212196
};
// --------------------------------------------------------------------------------------------- /
interface Props{
    currentLat  : number;
    currentLng  : number;
    onDragPin : Function;
    currentZoom : number;
    currentKey : string
}
function Map({currentLat, currentLng, onDragPin,currentZoom , currentKey} : Props) {
    
// --------------------------------------------------------------------------------------------- /
// check if map is loaded or not
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBQsISGizyptRcOYIsgn6Dd3_4_lxgbGBY'
  })
  // --------------------------------------------------------------------------------------------- //
  const [map, setMap] = React.useState(null)

  // set center param to map when loaded
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({ lat : currentLat, lng: currentLng});
    map.fitBounds(bounds);
    setMap(map)
  }, []);
  // --------------------------------------------------------------------------------------------- //
  // when map not needs set unmount
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  // --------------------------------------------------------------------------------------------- //
  // if is loaded retrun map else retrun any other component
  return isLoaded ? (
      <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
            lat : currentLat,
            lng : currentLng
        }}
        options={{
            zoom: currentZoom,
            zoomControl: true,
            // mapTypeId : google.maps.MapTypeId.SATELLITE
        }}
        onLoad={onLoad}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        <Marker
            key={(Math.random() * 100).toString()}
            position={{
                lat: currentLat,
                lng : currentLng    
            }}
            draggable={true}
            onDragEnd={(e) => onDragPin(e.latLng) }
        />
        
      </GoogleMap>
      </>
  ) : <><div>map not loaded </div></>
}

export default Map;