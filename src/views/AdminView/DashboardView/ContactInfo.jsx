import ThreeDots from '../../../assets/eclipse-menu.svg';
import ProfilePic from '../../../assets/default-avatar.svg'
//import EmergencyContact from './EmergencyContact';
import ProfileModal from './ProfileModal';
import { useState, useEffect  } from 'react';
import { Modal } from '@material-ui/core';
import { useContext } from 'react';
import UsersContext from '../../../store/admin/users/usersContext';

const ContactInfo = () => {

    const[popup,setPopup] = useState(false)
    const[profileModal,setProfileModal] = useState(false)
    const[currentUserState,setCurrentUser] = useState(null)

    const{ currentUser, users } = useContext(UsersContext)

    useEffect(()=>{
        setCurrentUser(currentUser)
          /* eslint-disable */
    },[currentUser])

    console.log(currentUserState)

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
                { currentUserState && users ?
                     <>
                     <div className='row-one'>
                         <img src={ProfilePic} alt="profile pic" className="contact-info__pic" />
                         <h2 className="contact-info__name">{currentUserState.firstname}</h2>
                         <img src={ThreeDots} alt="menu" className="contact-info__edit" onClick={toggleModal}/>
                             
                         {  popup && 
                             <ul className="popup-menu">
                                 <li onClick={openProfileModal}>Edit account</li>
                                 <li>Generate password</li>
                                 <li>Delete account</li>
                             </ul>
                         }
                     </div>
                     <div className='row-two'>
                         <h1 className="contact-info__subheader">Profile details</h1>
                         <p className="contact-info__fullname">{currentUserState.firstname + ' ' + currentUserState.lastname || ''}</p>
                     </div>
                     <div className='row-three'>
                         <h1 className="contact-info__subheader">Emergency Contacts</h1>
                      {/*    {currentUserState.emergencyContacts.map(e=>(
                             <EmergencyContact key={e.id} fullName={e.fullName} ProfilePic={e.profilePic} status={e.status}/>
                         ))} */}
                     </div>
                     <div className="row-four">
                         <h1 className="contact-info__subheader">Backup History</h1>
                        {/*  <p className="contact-info__stakeholder">Toheeb Yusuf <span>Assign Stakeholder</span></p> */}
                     </div>
                     </>
                     :(Object.keys(users).length === 0 ?
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