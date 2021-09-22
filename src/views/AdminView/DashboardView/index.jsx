import { useEffect, useContext  } from 'react';
import AuthContext from '../../../store/admin/auth/authContext';
import UsersContext from '../../../store/admin/users/usersContext';
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import SidebarView from "../SidebarView";
import Map from "./Map";
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState } from 'react';

const DashboardView = () => {

    const[loading,setLoading] = useState(false)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const {currentUser } = useContext(UsersContext)


    useEffect(()=>{
        loadAdminUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!adminUser){
            setLoading(true)
            //history.replace('/login')
        }
        setLoading(false)
    },[adminUser])

    
    let key = process.env.REACT_APP_GOOGLE_MAP
    let url = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`

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
                     { currentUser ?  <Map isMarkerShown={true}
                        googleMapURL={url}
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