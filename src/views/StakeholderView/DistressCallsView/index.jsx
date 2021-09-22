import { useEffect, useContext  } from 'react';
import AuthContext from '../../../store/stakeholder/auth/authContext';
import UsersContext from '../../../store/stakeholder/users/usersContext';
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import SidebarView from "../SidebarView";
import Map from "./Map";
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState } from 'react';

const DistressCallsView = () => {

    const[loading,setLoading] = useState(false)
    const {loadStakeholderUser, stakeholderUser} = useContext(AuthContext)
    const {currentEmergency, emergencyInfo} = useContext(UsersContext)
    const history = useHistory()

    useEffect(()=>{
        loadStakeholderUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!stakeholderUser){
            setLoading(true)
            history.replace('/stakeholder')
        }
        setLoading(false)
    },[stakeholderUser])

    let key = process.env.REACT_APP_GOOGLE_MAP
    let url = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`

    // console.log(emergencyInfo.emergency.locations[0])


    return ( 
        <>
       {
           loading ?  <CircularProgress style={{position:'absolute', top:'50%', left:'50%'}}/>
           :         
           <div className='main'>
                <SidebarView />
                <section className='dashboard'>
                    <header className="dashboard-header">
                        <h1>Distress Calls</h1>
                    </header>
                    <div className="dashboard-contacts">
                        <ContactList />
                        <ContactInfo />
                     { currentEmergency ?  
                        <Map
                        cordinates={emergencyInfo}
                        isMarkerShown={true}
                        googleMapURL= {url}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `99%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}/>
                    : <div className='empty-map'></div>}
                    </div>
                </section>
            </div>
       }
        </>
     );
}
 
export default DistressCallsView;