import SidebarView from "../SidebarView";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import Map from "./Map";
import MetricCard from '../../../components/MetricCard'
import Assigned from '../../../assets/assigned.svg'
import Pending from '../../../assets/pending.svg'
import Resolved from '../../../assets/resolved.svg'
import { useEffect, useContext } from "react";
import AuthContext from '../../../store/auth/authContext';
import { useHistory } from 'react-router-dom'


const StakeholdersView = () => {

    
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const history = useHistory()

    useEffect(()=>{
        loadAdminUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!adminUser){
            history.replace('/login')
        }
    },[adminUser, history])
    
    return ( 
        <div className='main'>
            <SidebarView />
            <section className='stakeholders'>
                <header className="stakeholders-header">
                    <div className='flex-b'>
                        <h1>Stakeholders</h1>
                        <button className='btn-two'>+ New stakeholder</button>
                    </div>
                   
                    <div className="metrics">
                        <MetricCard icon={Assigned} number='20' name='Assigned Cases'/>
                        <MetricCard icon={Pending} number='2' name='Pending Cases'/>
                        <MetricCard icon={Resolved} number='18' name='Resolved Cases'/>
                    </div>
                </header>
                <div className="stakeholders-contacts">
                    <ContactList />
                    <ContactInfo /> 
                    <Map /> 
                </div>
            </section>
            
        </div>
     );
}
 
export default StakeholdersView;