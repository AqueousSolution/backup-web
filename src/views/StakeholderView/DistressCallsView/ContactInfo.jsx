import FolderIcon from '../../../assets/Folder.svg';
import ProfilePic from '../../../assets/default-avatar.svg'
import info from '../../../assets/Info.svg'
import infoGreen from '../../../assets/info-green.svg'
import play from '../../../assets/play-video.svg'
import tooltip from '../../../assets/tooltip.svg'
//import EmergencyContact from './EmergencyContact';
import ProfileModal from './ProfileModal';
import { useState, useEffect  } from 'react';
import { Modal } from '@material-ui/core';
import { useContext } from 'react';
import UsersContext from '../../../store/stakeholder/users/usersContext';
import CircularProgress from '@material-ui/core/CircularProgress'
import VideoModal from './VideoModal'

const ContactInfo = () => {

    const[loading,setLoading] = useState(false)

    const[isAccepted, setIsAccepted] = useState(false)

    const[popup,setPopup] = useState(false)
    const[profileModal,setProfileModal] = useState(false)
    const[currentEmergencyState,setCurrentEmergencyState] = useState(null)

    const[videoModal,setVideoModal] = useState(false)

    const{ currentEmergency, getEmergencies, allEmergencies, myEmergencies,getMyEmergencies,  getEmergencyTimeline , respondToEmergency, getEmergencyDetails, emergencyInfo } = useContext(UsersContext)

    const[filteredEmergencies, setFilteredEmergencies] = useState([])

    const acceptedEmergencies = () => {
        let intersection =[]
        allEmergencies.map(emergency => (
            myEmergencies.map(myEmergency =>{
                if (emergency.id === myEmergency.id){
                    intersection.push(emergency)
                }
                return intersection
            })
        ))
        setFilteredEmergencies(intersection)
    }

    useEffect(()=>{
        if(allEmergencies && myEmergencies){
            acceptedEmergencies()
        }
        //eslint-disable-next-line
    },[allEmergencies,myEmergencies])

    useEffect(()=>{
        setCurrentEmergencyState(currentEmergency)
        if(currentEmergency){
            getEmergencyTimeline(currentEmergency.id)
            getEmergencyDetails(currentEmergency.id)
        }
          /* eslint-disable */
    },[currentEmergency])

    useEffect(()=>{
        if(currentEmergency && filteredEmergencies){
        /*     filteredEmergencies.map(emergency =>{
                if(emergency.id===currentEmergency.id){
                    setIsAccepted(true)
                }else{
                    setIsAccepted(false)
                }
            }) */

            if(filteredEmergencies.includes(currentEmergency)){
                setIsAccepted(true)
            }else{
                setIsAccepted(false)
            }
        }

    },[filteredEmergencies,currentEmergency ])


    useEffect(()=>{
        getMyEmergencies()
         /* eslint-disable */
    },[])
    
    const accept = ()=>{
        setLoading(true)
        respondToEmergency(currentEmergencyState.id,'accepted')
        setTimeout(() => setLoading(false), 5000);
        getEmergencies()
        getMyEmergencies()
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

    const openVideoModal =() =>{
        setVideoModal(true)
    }

    const closeVideoModal =() =>{
        setVideoModal(false)
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

            <Modal 
             open={videoModal}
             onClose={closeVideoModal}
             aria-labelledby="video-modal"
             aria-describedby="displays-distress-video">
                 <div>
                    <VideoModal closeVideoModal={closeVideoModal} emergencyInfo={emergencyInfo}/>
                 </div>
                
            </Modal>
            <div className="contact-info">
                { currentEmergencyState && allEmergencies ?
                     <>
                     <div className='row-one'>
                         <div className={ isAccepted ? 'notification green' : 'notification'}>
                             <img src={isAccepted ? infoGreen : info} alt="info" /> <p> {isAccepted ? 'You have already accepted this emergency' : "Accept Request to unlock user's full details"} </p>
                         </div>
                         <>
                         <img src={ProfilePic} alt="profile pic" className="contact-info__picSmall" />
                         <img src={tooltip} alt="tooltip" className='tooltip'/>
                         <img src={play} alt="play" className='play-video' onClick={openVideoModal}/>
                         </>
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
                         <p className="contact-info__request">{currentEmergencyState.user.firstname + ' ' + currentEmergencyState.user.lastname} is being harassed by the law enforcement agency. Provide a Pro bono service to help {currentEmergencyState.user.firstname}</p>
                     </div>
                     <div className='row-three'>
                        { isAccepted ? <p></p> : <div className="contact-info__actions">
                             <button className=" btn-one decline" onClick={reject}>Decline</button>
                             <button variant="contained"
                                className="btn-one approve"
                                onClick={accept} 
                                disabled={loading}>
                                {loading && <CircularProgress style={{color:'white'}} size={14} />}
                                {!loading && 'Accept'}
                            </button>
                         </div>}
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