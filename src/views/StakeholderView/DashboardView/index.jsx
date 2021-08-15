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

const DashboardView = () => {

    const[loading,setLoading] = useState(false)
    const {loadStakeholderUser, stakeholderUser} = useContext(AuthContext)
    const {currentEmergency} = useContext(UsersContext)
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


    return ( 
        <>
       {
           loading ?  <CircularProgress style={{position:'absolute', top:'50%', left:'50%'}}/>
           :         
           <div className='main'>
                <SidebarView />
                <section className='dashboard'>
                    <header className="dashboard-header">
                        <h1>Dashboard</h1>
                    </header>
                    <div className="dashboard-contacts">
                        <ContactList />
                        <ContactInfo />
                     { currentEmergency ?  <Map isMarkerShown={true}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
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
 
export default DashboardView;