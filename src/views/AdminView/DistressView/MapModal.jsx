import {  withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";
import { useEffect, useContext  } from 'react';

const Map =  withScriptjs(withGoogleMap((props) => {

  /*   const [ cordinates, setCordinates] = useState({
        longitude: 7.4679,
        latitude: 9.0221
    }) */

    const { getEmergencyDetails, emergencyDetails } = useContext(EmergenciesContext)

/*      useEffect(()=>{
        if(emergencyDetails){
            setCordinates({
                latitude: Number(emergencyDetails.emergency.locations[0].latitude) || 9.0635,
                longitude: Number(emergencyDetails.emergency.locations[0].longitude) || 8.6753
            })
        }

    },[emergencyDetails])  */

    useEffect(()=>{
        getEmergencyDetails(props.EmergencyId)
        //eslint-disable-next-line
    },[props.EmergencyId])

    // console.log(emergencyDetails.emergency.locations[0], cordinates)

    console.log(props.latitude)

    return (
        <div className="map">
            {
                emergencyDetails ?
                <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: Number(props.latitude), lng: Number(props.longitude) }}
                >
                {props.isMarkerShown && <Marker position={{ lat: Number(props.latitude), lng: Number(props.longitude) }} />}
                </GoogleMap>
                :
               <p>loading...</p> 
            }
            
        </div>
     );
}))
 
export default Map;