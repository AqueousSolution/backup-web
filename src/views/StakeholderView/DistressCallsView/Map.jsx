import {  withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"
import UsersContext from '../../../store/stakeholder/users/usersContext';
import { useEffect, useContext  } from 'react';
import { useState } from "react";

const Map =  withScriptjs(withGoogleMap((props) => {

    const [ cordinates, setCordinates] = useState({
        longitude: 8.6753,
        latitude: 9.0635
    })

    const { emergencyInfo } = useContext(UsersContext)

    useEffect(()=>{
        if(emergencyInfo){
            setCordinates({
                latitude: Number(emergencyInfo.emergency.locations[0].latitude) || 9.0635,
                longitude: Number(emergencyInfo.emergency.locations[0].longitude) || 8.6753
            })
        }

    },[emergencyInfo])

    console.log(cordinates)

    return (
        <div className="map">
            <GoogleMap
                defaultZoom={9}
                defaultCenter={{ lat: cordinates.longitude, lng: cordinates.latitude }}
                >
                {props.isMarkerShown && <Marker position={{ lat: cordinates.latitude, lng: cordinates.longitude }} />}
            </GoogleMap>
        </div>
     );
}))
 
export default Map;