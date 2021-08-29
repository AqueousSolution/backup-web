import {  withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"

const Map =  withScriptjs(withGoogleMap((props) => {
    return (
        <div className="map">
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 9.0820, lng: 8.6753 }}
                >
                {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            </GoogleMap>
        </div>
     );
}))
 
export default Map;