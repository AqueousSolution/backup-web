import ThreeDots from '../../../assets/eclipse-menu.svg';
import FolderIcon from '../../../assets/Folder.svg';
import ProfilePic from '../../../assets/default-avatar.svg'
//import EmergencyContact from './EmergencyContact';
import ProfileModal from './ProfileModal';
import { useState, useEffect  } from 'react';
import { Modal } from '@material-ui/core';
import { useContext } from 'react';
import UsersContext from '../../../store/stakeholder/users/usersContext';

const ContactInfo = () => {

    const[popup,setPopup] = useState(false)
    const[profileModal,setProfileModal] = useState(false)
    const[currentEmergencyState,setCurrentEmergencyState] = useState(null)

    const{ currentEmergency, allEmergencies, getEmergencyTimeline ,timeline, respondToEmergency } = useContext(UsersContext)

    useEffect(()=>{
        setCurrentEmergencyState(currentEmergency)
        if(currentEmergency){
            getEmergencyTimeline(currentEmergency.id)
        }
          /* eslint-disable */
    },[currentEmergency])

    
    console.log(timeline)

    
    const accept = ()=>{
        respondToEmergency(currentEmergencyState.id,'accepted')
    }

    const reject = ()=>{
        respondToEmergency(currentEmergencyState.id,'rejected')
    }

    const openProfileModal =() =>{
        setProfileModal(true)
    }

    const closeProfileModal =() =>{
        setProfileModal(false)
    }

    const toggleModal = () =>{
        setPopup(!popup)
    }

    return ( 
        <>
            <Modal
            open={profileModal}
            onClose={closeProfileModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <div>
                 <ProfileModal closeProfileModal={closeProfileModal}/>
                </div>
           
            </Modal>
            <div className="contact-info">
                { currentEmergencyState && allEmergencies ?
                     <>
                     <div className='row-one'>
                         <img src={ProfilePic} alt="profile pic" className="contact-info__pic" />
                         <h2 className="contact-info__name">{currentEmergencyState.user.firstname}</h2>
                         {/* <img src={ThreeDots} alt="menu" className="contact-info__edit" onClick={toggleModal}/>
                             
                         {  popup && 
                             <ul className="popup-menu">
                                 <li onClick={openProfileModal}>Edit account</li>
                                 <li>Generate password</li>
                                 <li>Delete account</li>
                             </ul>
                         } */}
                     </div>
                     <div className='row-two'>
                     <h3 className="contact-info__subheader text-c">Backup Request</h3>
                         <p className="contact-info__request">{currentEmergencyState.user.firstname + ' ' + currentEmergencyState.user.lastname} is being harassed by the law enforcement agency. Provide a Pro bono service to help John</p>
                     </div>
                     <div className='row-three'>
                         <div className="contact-info__actions">
                             <button className=" btn-one decline" onClick={reject}>Decline</button>
                             <button className="btn-one approve" onClick ={accept}>Accept</button>
                         </div>
                     </div>
                     </>
                     :(Object.keys(allEmergencies).length === 0 ?
                     <div className="no-data">
                         <img src={FolderIcon} alt="no-records" />
                         <p>No Cases</p>
                         <p>You will see cases when anybody in the country makes a distress call</p>
                     </div> 
                     :
                     <div className="no-clicked-data">
                        <h3> Select an emergency to view more info</h3>
                        <p>Click an emergency to either accept or decline</p>
                    </div> )
                     
                }
               
            </div>
        </>
     );
}
 
export default ContactInfo;