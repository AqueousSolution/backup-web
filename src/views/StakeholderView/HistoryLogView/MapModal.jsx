import {  withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"
import UsersContext from '../../../store/stakeholder/users/usersContext';
import { useEffect, useContext  } from 'react';
import { useState } from "react";

const Map =  withScriptjs(withGoogleMap((props) => {

    const [ cordinates, setCordinates] = useState({
        longitude: 8.6753,
        latitude: 9.0635
    })

    const { getEmergencyDetails, emergencyInfo } = useContext(UsersContext)

    useEffect(()=>{
        if(emergencyInfo){
            setCordinates({
                latitude: Number(emergencyInfo.emergency.locations[0].latitude) || 9.0635,
                longitude: Number(emergencyInfo.emergency.locations[0].longitude) || 8.6753
            })
        }

    },[emergencyInfo])

    useEffect(()=>{
        if(props.EmergencyId){
            getEmergencyDetails(props.EmergencyId)
        }
      
        //eslint-disable-next-line
    },[props.EmergencyId])

    console.log(cordinates)

    return (
        <div className="map">
            {
             emergencyInfo ?
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