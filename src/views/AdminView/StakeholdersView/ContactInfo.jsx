import ThreeDots from '../../../assets/eclipse-menu.svg';
import ProfilePic from '../../../assets/default-avatar.svg'
//import EmergencyContact from './EmergencyContact';
import { useState, useEffect  } from 'react';
import { useContext } from 'react';
import StakeholdersContext from '../../../store/admin/stakeholders/stakeholdersContext';
import { Modal } from '@material-ui/core';
import BlacklistModal from './BlacklistModal'
import {CircularProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const ContactInfo = () => {

    const[popup,setPopup] = useState(false)
    const[profileModal,setProfileModal] = useState(false)
    const[blacklistModal,setBlacklistModal] = useState(false)
 
    const[loading,setLoading] = useState(false)


    const[openAlert, setOpenAlert] = useState(false)

    const[currentStakeholderState,setCurrentStakeholder] = useState(null)

    const{ currentStakeholder, stakeholders, approveStakeholder, blacklistStakeholder,approvalSuccess,clearApproval, getStakeholders } = useContext(StakeholdersContext)

  
    useEffect(()=>{
        setCurrentStakeholder(currentStakeholder)
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
    }

    useEffect(()=>{
        if(approvalSuccess){
            setOpenAlert(true)
            setTimeout(()=>setOpenAlert(false),3500)
        } 
        clearApproval()
        getStakeholders(1)
    },[approvalSuccess])

    return ( 
        <>
            <Modal 
             open={blacklistModal}
             onClose={closeBlacklistModal}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description">
                 <div>
                    <BlacklistModal closeBlacklistModal={closeBlacklistModal} blacklist={blacklist}/>
                 </div>
                
            </Modal>
            <div className="contact-info stakeholder-info">
                <Snackbar open={openAlert}  onClose={handleCloseAlert} style={{position:"absolute"}} className='alert'>
                    <Alert onClose={handleCloseAlert} severity="success">
                        Stakeholder approved Successfully!
                    </Alert>
                </Snackbar>

                { currentStakeholderState && stakeholders ?
                     <>
                     <div className='row-one'>
                         <img src={ProfilePic} alt="profile pic" className="contact-info__pic" />
                         <h2 className="contact-info__name">{ currentStakeholderState.firstname}</h2>
                         <img src={ThreeDots} alt="menu" className="contact-info__edit" onClick={toggleModal}/>
                             
                         {  popup && 
                             <ul className="popup-menu">
                                 <li onClick={openProfileModal}>Edit account</li>
                                 <li onClick={openBlacklistModal}>Blacklist Stakeholder</li>
                             </ul>
                         }
                     </div>
                     <div className='row-two span'>
                         <h1 className="contact-info__subheader">Profile details</h1>
                         <p className="contact-info__fullname">{currentStakeholderState.firstname + ' ' + currentStakeholderState.lastname || ''}</p> 
                         <p className="contact-info__fullname">{currentStakeholderState.email || ''}</p> 
                     </div>
                     <div className='row-three'>
                       {  
                       currentStakeholder && (!currentStakeholder.profile.approved_at) ?
                        <>
                            <h1 className="contact-info__subheader">Stakeholder request</h1>
                            <p>{currentStakeholderState.firstname + ' ' + currentStakeholderState.lastname || ''} has requested to be made a stakeholder</p>
                            <div className="contact-info__actions">
                                <button className="btn-one decline">Decline</button>
                            
                                <button variant="contained"
                                    className='btn-one approve' 
                                    onClick={approve} 
                                    disabled={loading}>
                                    {loading && <CircularProgress style={{color:'white'}} size={14} />}
                                    {!loading && 'Approve'}
                                </button>
                            </div>
                        </>
                        :
                        <h1 className="contact-info__subheader">All Cases</h1>
                        }
                     </div>
                    
                     </>
                     :(Object.keys(stakeholders).length === 0 ?
                     <div className="no-data">
                         <h3> There are no registered users</h3>
                         <p>No users on the platform yet</p>
                     </div> 
                     :
                     <div className="no-data">
                        <h3> Select a contact to view more info</h3>
                        <p>Click a contact to view all his details</p>
                    </div> )
                     
                }
               
            </div>
        </>
     );
}
 
export default ContactInfo;