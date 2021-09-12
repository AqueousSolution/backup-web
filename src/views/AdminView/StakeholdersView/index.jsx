import SidebarView from "../SidebarView";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import Map from "./Map";
import MetricCard from '../../../components/MetricCard'
import Assigned from '../../../assets/assigned.svg'
import Pending from '../../../assets/pending.svg'
import Resolved from '../../../assets/resolved.svg'
import { useEffect, useContext } from "react";
import AuthContext from '../../../store/admin/auth/authContext';
import { useHistory } from 'react-router-dom'
import { useState } from "react";
import { Modal } from '@material-ui/core';
import StakeholderModal from "./StakeholderModal";
import StakeholdersContext from '../../../store/admin/stakeholders/stakeholdersContext';

const StakeholdersView = () => {

    const[stakeholderModal,setStakeholderModal] = useState(false)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const{ currentStakeholder, getStakeholdersStats, stats } = useContext(StakeholdersContext)
    const history = useHistory()

    const [statsState, setStatsState] = useState(null)


    useEffect(()=>{
        loadAdminUser()
        getStakeholdersStats()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
       setStatsState(stats)
    },[stats])

    

    useEffect(()=>{
        if(!adminUser){
            history.replace('/admin')
        }
    },[adminUser, history])

    const openStakeholderModal =() =>{
        setStakeholderModal(true)
    }

    const closeStakeholderModal =() =>{
        setStakeholderModal(false)
    }
    
    return ( 
        <>
        <Modal 
             open={stakeholderModal}
             onClose={closeStakeholderModal}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description">
                 <div>
                    <StakeholderModal closeStakeholderModal={closeStakeholderModal}/>
                 </div>
                
        </Modal>
        <div className='main'>
            <SidebarView />
            <section className='stakeholders'>
                <header className="stakeholders-header">
                    <div className='flex-b'>
                        <h1>Stakeholders</h1>
                        <button className='btn-two' onClick={openStakeholderModal}>+ New stakeholder</button>
                    </div>
                   
                    <div className="metrics">
                        <MetricCard icon={Assigned} number={statsState ? stats.approved : '-'} name='Approved'/>
                        <MetricCard icon={Pending} number={statsState ? stats.pending : '-'} name='Awaiting approval'/>
                        <MetricCard icon={Resolved} number={statsState ? stats.suspended : '-'} name='Declined'/>
                    </div>
                </header>
                <div className="stakeholders-contacts">
                    <ContactList />
                    <ContactInfo /> 
            {/*         { currentStakeholder ?  <Map isMarkerShown={true}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `99%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}/>
                    : <div className='empty-map'></div>} */}
                </div>
            </section>
            
        </div>
        </>
     );
}
 
export default StakeholdersView;