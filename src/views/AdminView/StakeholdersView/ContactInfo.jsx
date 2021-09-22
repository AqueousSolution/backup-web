import ThreeDots from '../../../assets/eclipse-menu.svg';
import ProfilePic from '../../../assets/default-avatar.svg'
//import EmergencyContact from './EmergencyContact';
import { useState, useEffect  } from 'react';
import { useContext } from 'react';
import StakeholdersContext from '../../../store/admin/stakeholders/stakeholdersContext';
import { Modal } from '@material-ui/core';
import BlacklistModal from './BlacklistModal'
import ProfileModal from './ProfileModal';
import {CircularProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ChangePasswordModal from './ChangePasswordModal';

const ContactInfo = () => {

    const[popup,setPopup] = useState(false)
    const[profileModal,setProfileModal] = useState(false)
    const[blacklistModal,setBlacklistModal] = useState(false)
    const[passwordModal,setPasswordModal] = useState(false)
 
    const[loading,setLoading] = useState(false)
    const[declineLoading,setDeclineLoading] = useState(false)

/*     const [approvedStakeholder, setApprovedStakeholder] = useState(false)

    const [blacklistedStakeholder, setBlacklistedStakeholder] = useState(false)

    const [suspendedStakeholder, setSuspendedStakeholder] = useState(false)

    const [awaitingStakeholder, setAwaitingStakeholder] = useState(false) */


    const[openAlert, setOpenAlert] = useState(false)

    const[currentStakeholderState,setCurrentStakeholderState] = useState(null)

    const{ currentStakeholder, currentStakeholderDetails ,clearCurrentStakeholder, getStakeholderDetails, getStakeholdersStats, stakeholders, approveStakeholder, blacklistStakeholder,unBlacklistStakeholder, approvalSuccess,clearApproval, getStakeholders, resetStakeholdersPassword, successfulPasswordChange, clearSuccessPassword, suspendStakeholder, unSuspendStakeholder } = useContext(StakeholdersContext)

  
    useEffect(()=>{
        setCurrentStakeholderState(currentStakeholder)
          /* eslint-disable */
    },[currentStakeholder])

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };

    const openProfileModal =() =>{
        if(!profileModal){
            setProfileModal(true)
        }
    }

    const closeProfileModal =() =>{
        setProfileModal(false)
    }

    const toggleModal = () =>{
        setPopup(!popup)
    }

    const approve = () =>{
        setLoading(true)
        approveStakeholder(currentStakeholder.id)
        setTimeout(()=>setLoading(false),3000)
        setTimeout(()=>getStakeholdersStats(),3000)
        setTimeout(()=>clearCurrentStakeholder(),3500)
        setTimeout(()=>getStakeholders(1),1500)
    }

    const decline = () => {
        setDeclineLoading(true)
        suspendStakeholder(currentStakeholder.id)
        setTimeout(()=>setDeclineLoading(false),3000)
        setTimeout(()=>getStakeholders(1),1500)
        setTimeout(()=>getStakeholdersStats(),3000)
        setTimeout(()=>clearCurrentStakeholder(),3500)
    }

    const undecline = () => {
        setLoading(true)
        unSuspendStakeholder(currentStakeholder.id)
        setTimeout(()=>getStakeholders(1),1500)
        setTimeout(()=>setLoading(false),3000)
        setTimeout(()=>getStakeholdersStats(),3000)
        setTimeout(()=>clearCurrentStakeholder(),3500)
    }

    const openBlacklistModal =() =>{
        setBlacklistModal(true)
    }

    const closeBlacklistModal =() =>{
        setBlacklistModal(false)
    }

    const blacklist = () =>{
        blacklistStakeholder(currentStakeholder.id)
        closeBlacklistModal()
        setTimeout(()=>getStakeholders(1),1500)
        setTimeout(()=>clearCurrentStakeholder(),1000)
    }

    const unblacklist = () =>{
        unBlacklistStakeholder(currentStakeholder.id)
        closeBlacklistModal()
        setTimeout(()=>getStakeholders(1),1500)
        setTimeout(()=>clearCurrentStakeholder(),1000)
    }

    const openPasswordModal =() =>{
        setPasswordModal(true)
    }

    const closePasswordModal =() =>{
        setPasswordModal(false)
    }

    const changePassword = () =>{
        resetStakeholdersPassword(currentStakeholder.id)
        closePasswordModal()
    }

/*     const findStakeholderStatus = () =>{

        if(currentStakeholder){
            if(currentStakeholder.profile.approved_at === null && currentStakeholder.blacklisted_at === null && currentStakeholder.suspended_at === null){
                setAwaitingStakeholder(true)
            }else if(currentStakeholder.profile.blacklisted_at){
                setBlacklistedStakeholder(true)
            }else if(currentStakeholder.profile.suspended_at){
                setSuspendedStakeholder(true)
            }else{
                setApprovedStakeholder(true)
            }
        }
       
    } */

    useEffect(()=>{
        if(approvalSuccess){
            setOpenAlert(true)
            setTimeout(()=>setOpenAlert(false),3500)
        } 
        clearApproval()
        getStakeholders(1)
    },[approvalSuccess])

    useEffect(()=>{
     
            if( currentStakeholder){
                getStakeholderDetails(currentStakeholder.id)
            }
        
     
    },[])

    console.log(currentStakeholderDetails.resolutions)

    return ( 
        <>
            <Modal 
             open={blacklistModal}
             onClose={closeBlacklistModal}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description">
                 <div>
                    <BlacklistModal closeBlacklistModal={closeBlacklistModal} blacklist={blacklist} unblacklist={unblacklist} currentStakeholderState={currentStakeholderState}/>
                 </div>
                
            </Modal>

            <Modal 
             open={profileModal}
             onClose={closeProfileModal}
             aria-labelledby="profile-modal"
             aria-describedby="edit-stakeholder-profile">
                 <div>
                    <ProfileModal closeProfileModal={closeProfileModal} currentStakeholderState={currentStakeholderState}/>
                 </div>
                
            </Modal>

            <Modal 
             open={passwordModal}
             onClose={closePasswordModal}
             aria-labelledby="change-password"
             aria-describedby="change-a-stakeholders-password">
                 <div>
                    <ChangePasswordModal closePasswordModal={closePasswordModal} stakeholderId={currentStakeholder ? currentStakeholder.id : ''} resetStakeholdersPassword={resetStakeholdersPassword} successfulPasswordChange={successfulPasswordChange} clearSuccessPassword={clearSuccessPassword}/>
                 </div>
                
            </Modal>

            <div className="contact-info stakeholder-info">
                <Snackbar open={openAlert}  onClose={handleCloseAlert} style={{position:"absolute"}} className='alert'>
                    <Alert onClose={handleCloseAlert} severity="success">
                        Stakeholder approved Successfully!
                    </Alert>
                </Snackbar>
              {/*   <div className="contact-info__status">
                    <p>{blacklistedStakeholder ? 'This stakeholder is currently blacklisted' : (suspendedStakeholder ? 'This stakeholder is currently declined' : '')}</p>
                </div> */}

                { currentStakeholderState && stakeholders ?
                     <>
                     <div className='row-one'>
                         <img src={ProfilePic} alt="profile pic" className="contact-info__pic" />
                         <h2 className="contact-info__name">{ currentStakeholderState.firstname + ' ' + currentStakeholderState.lastname || ''}</h2>
                         <img src={ThreeDots} alt="menu" className="contact-info__edit" onClick={toggleModal}/>
                             
                         {  popup && 
                             <ul className="popup-menu">
                                 {/* <li onClick={openProfileModal}>Edit account</li> */}
                                 <li onClick={openPasswordModal}>Reset Password</li>
                                 <li onClick={openBlacklistModal}>{currentStakeholderState.profile.blacklisted_at ? 'Unblacklist Stakeholder' : 'Blacklist Stakeholder'}</li>
                             </ul>
                         }
                     </div>
                     <div className='row-two span'>
                         <h1 className="contact-info__subheader">Profile details</h1>
                         <p className="contact-info__fullname">{currentStakeholderState.phone|| ''}</p> 
                         <p className="contact-info__fullname">{currentStakeholderState.email || ''}</p> 
                         <p className="contact-info__fullname">{currentStakeholderState.profile ? currentStakeholderState.profile.state.name : ''}</p> 
                         <p className="contact-info__fullname">{currentStakeholderState.profile ? currentStakeholderState.profile.lga.name : ''}</p>
                     </div>
                     <div className='row-three'>
                       {  
                       currentStakeholder && (!currentStakeholder.profile.approved_at && !currentStakeholder.profile.suspended_at) ?
                        <>
                            <h1 className="contact-info__subheader">Stakeholder request</h1>
                            <p>{currentStakeholderState.firstname + ' ' + currentStakeholderState.lastname || ''} has requested to be made a stakeholder</p>
                            <div className="contact-info__actions">
                            <button variant="contained"
                                    className='btn-one decline' 
                                    onClick={decline} 
                                    disabled={declineLoading}>
                                    {declineLoading && <CircularProgress style={{color:'red'}} size={14} />}
                                    {!declineLoading && 'Decline'}
                                </button>
                            
                                <button variant="contained"
                                    className='btn-one approve' 
                                    onClick={approve} 
                                    disabled={loading}>
                                    {loading && <CircularProgress style={{color:'white'}} size={14} />}
                                    {!loading && 'Approve'}
                                </button>
                            </div>
                        </>
                        :(
                            currentStakeholder && (currentStakeholder.profile.suspended_at)
                             ?
                             <>
                                <h1 className="contact-info__subheader">Declined Stakeholder</h1>
                                <p>This stakeholder has been declined</p>
                                <button variant="contained"
                                    className='btn-one approved-btn' 
                                    onClick={undecline} 
                                    disabled={loading}>
                                    {loading && <CircularProgress style={{color:'white'}} size={14} />}
                                    {!loading && 'Undecline'}
                                </button>
                            </>
                            : 
                            <>
                            <h1 className="contact-info__subheader">All Cases</h1>
                            {currentStakeholderDetails.resolutions ?
                            currentStakeholderDetails.resolutions.map(caseItem=>{
                               return (
                                <div className='case' key={caseItem.id}>
                                    <div>
                                        <p className='case-header'>Date Accepted</p>
                                        <p className='case-content'>{caseItem.emergency.date.slice(0,10)}</p>
                                    </div>
                                    <div>
                                        <p className='case-header'>Status</p>
                                        <p className={caseItem.emergency.status === 'resolved' ? 'case-content resolved' : (caseItem.emergency.status === 'stopped' ? 'case-content stopped' : 'case-content in-progress')}>{caseItem.emergency.status}</p>
                                    </div>
                                </div>
                               )
                            })
                            : <p>No cases accepted</p>
                            }
                            </>
                        )
                       
                        }
                     </div>
                    
                     </>
                     :(Object.keys(stakeholders).length === 0 ?
                     <div className="no-data adj">
                         <h3> There are no registered users</h3>
                         <p>No users on the platform yet</p>
                     </div> 
                     :
                     <div className="no-clicked-data adj">
                        <h5> Select a stakeholder to view more info</h5>
                        <p>Click a stakeholder to view all his/her details</p>
                    </div> )
                     
                }
               
            </div>
        </>
     );
}
 
export default ContactInfo;