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
    const{ currentStakeholder,stakeholders } = useContext(StakeholdersContext)
    const history = useHistory()

    const[approvedStakeholders, setApprovedStakeholders] = useState('0')
    const[awaitingStakeholders, setAwaitingStakeholders] = useState('0')
    const[declinedStakeholders, setDeclinedStakeholders] = useState('0')

    useEffect(()=>{
        loadAdminUser()
        /*eslint-disable*/
    },[])

    const CalculateStakeholdersMetrics = () =>{
      if(stakeholders){
            let approvedArray =  stakeholders.filter(stakeholder=>{
                return stakeholder.profile.approved_at !== ''
            })
            let awaitingArray =  stakeholders.filter(stakeholder=>{
                return stakeholder.profile.approved_at === ''
            })
            let declinedArray =  stakeholders.filter(stakeholder=>{
                return stakeholder.profile.blacklisted_at === ''
            })
        setApprovedStakeholders(approvedArray.length)
        setAwaitingStakeholders(awaitingArray.length)
        setDeclinedStakeholders(declinedArray.length)
      }
     
    }

    console.log(declinedStakeholders)

    useEffect(()=>{
        CalculateStakeholdersMetrics()
    },[stakeholders])

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
                    <StakeholderModal />
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
                        <MetricCard icon={Assigned} number={approvedStakeholders} name='Approved'/>
                        <MetricCard icon={Pending} number={awaitingStakeholders} name='Awaiting approval'/>
                        <MetricCard icon={Resolved} number={declinedStakeholders} name='Declined'/>
                    </div>
                </header>
                <div className="stakeholders-contacts">
                    <ContactList />
                    <ContactInfo /> 
                    { currentStakeholder ?  <Map isMarkerShown={true}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `99%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}/>
                    : <div className='empty-map'></div>}
                </div>
            </section>
            
        </div>
        </>
     );
}
 
export default StakeholdersView;