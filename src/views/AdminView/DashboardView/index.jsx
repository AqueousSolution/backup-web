import { useEffect, useContext  } from 'react';
import AuthContext from '../../../store/auth/authContext';
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import SidebarView from "../SidebarView";
import Map from "./Map";
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState } from 'react';

const DashboardView = () => {

    const[loading,setLoading] = useState(false)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const history = useHistory()

    useEffect(()=>{
        loadAdminUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!adminUser){
            setLoading(true)
            history.replace('/login')
        }
        setLoading(false)
    },[adminUser])


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
                        <Map />
                    </div>
                </section>
            </div>
       }
        </>
     );
}
 
export default DashboardView;