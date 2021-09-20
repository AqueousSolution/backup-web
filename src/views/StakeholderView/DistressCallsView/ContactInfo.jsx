import FolderIcon from '../../../assets/Folder.svg';
import ProfilePic from '../../../assets/default-avatar.svg'
import info from '../../../assets/Info.svg'
import infoGreen from '../../../assets/info-green.svg'
import infoRed from '../../../assets/info-red.svg'
import play from '../../../assets/play-video.svg'
import tooltip from '../../../assets/tooltip.svg'
//import EmergencyContact from './EmergencyContact';
import ProfileModal from './ProfileModal';
import { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { useContext } from 'react';
import UsersContext from '../../../store/stakeholder/users/usersContext';
import CircularProgress from '@material-ui/core/CircularProgress'
import VideoModal from './VideoModal'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const ContactInfo = () => {

    const[loading,setLoading] = useState(false)
    const[declineLoading,setDeclineLoading] = useState(false)

    const[isAccepted, setIsAccepted] = useState(false)
    const[isRejected, setIsRejected] = useState(false)

    const[popup,setPopup] = useState(false)
    const[profileModal,setProfileModal] = useState(false)
    const[currentEmergencyState,setCurrentEmergencyState] = useState(null)

    const[videoModal,setVideoModal] = useState(false)

    const[successAlert, setOpenAlert] = useState(false)

    const[alertMessage, setAlertMessage] = useState('')

    const{ currentEmergency, getEmergencies, allEmergencies, myEmergencies, getMyRejectedEmergencies, rejectedEmergencies, getMyEmergencies,  getEmergencyTimeline , respondToEmergency, getEmergencyDetails, emergencyInfo, clearCurrentEmergency, clearError } = useContext(UsersContext)

    const[filteredEmergencies, setFilteredEmergencies] = useState([])
    const[filteredRejects, setFilteredRejects] = useState([])

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

    const emergenciesRejected = () => {
        let intersection =[]
        allEmergencies.map(emergency => (
            rejectedEmergencies.map(myRejects =>{
                if (emergency.id === myRejects.id){
                    intersection.push(emergency)
                }
                return intersection
            })
        ))
        setFilteredRejects(intersection)
    }
    useEffect(()=>{
        clearError()
        //eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(allEmergencies && myEmergencies){
            acceptedEmergencies()
        }
        //eslint-disable-next-line
    },[allEmergencies,myEmergencies])

    
    useEffect(()=>{
        if(allEmergencies && rejectedEmergencies){
            emergenciesRejected()
        }
        //eslint-disable-next-line
    },[allEmergencies,rejectedEmergencies])

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
        if(currentEmergency && filteredRejects){
   
            if(filteredRejects.includes(currentEmergency)){
                setIsRejected(true)
            }else{
                setIsRejected(false)
            }
        }

    },[filteredRejects,currentEmergency ])


    useEffect(()=>{
        getMyEmergencies(1)
        getMyRejectedEmergencies()
         /* eslint-disable */
    },[])

    console.log(rejectedEmergencies)
/* 
    useEffect(()=>{
        if(success && success.success){
            setOpenAlert(true)
            setAlertMessage('This Emergency has now been accepted')
        }else{
            setOpenAlert(true)
            setAlertMessage('This Emergency has already been accepted')
        }
    },[success,loading]) */

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };
    
    const accept = ()=>{
        setLoading(true)
        respondToEmergency(currentEmergencyState.id,'accepted')
        setTimeout(() => setLoading(false), 5000);
        setTimeout(() =>  setOpenAlert(true), 5000);
        setTimeout(() =>  clearCurrentEmergency(), 5000);
        setAlertMessage('This Emergency has now been accepted')
        getEmergencies(1)
        getMyEmergencies(1)
        

    }

    const reject = ()=>{
        setDeclineLoading(true)
        respondToEmergency(currentEmergencyState.id,'rejected')
        setTimeout(() => setDeclineLoading(false), 5000);
        setTimeout(() =>  setOpenAlert(true), 5000);
        setTimeout(() =>  clearCurrentEmergency(), 5000);
        setAlertMessage('This Emergency has now been declined')
        getEmergencies(1)
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

  
    console.log(filteredRejects)


    return ( 
        <>
            <Snackbar open={successAlert}  onClose={handleCloseAlert} >
                <Alert onClose={handleCloseAlert} severity="success">
                        {alertMessage}
                </Alert>
            </Snackbar>

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
                         <div className={ isAccepted ? 'notification green' : (isRejected ? 'notification red' : 'notification')}>
                             <img src={isAccepted ? infoGreen :(isRejected ? infoRed : info)} alt="info" /> <p> {isAccepted ? 'You have already accepted this emergency' : (isRejected ? 'You have already rejected this emergency' : "Accept Request to unlock user's full details")} </p>
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
                     <p className="contact-info__request">{isAccepted ? `you have agreed to provide pro bono service to help ${currentEmergencyState.user.firstname} ${currentEmergencyState.user.lastname}` : `${currentEmergencyState.user.firstname} ${currentEmergencyState.user.lastname} is being harassed by the law enforcement agency. Provide a Pro bono service to help ${currentEmergencyState.user.firstname}`}</p>
                        
                         {/* <p className="contact-info__request">{currentEmergencyState.user.firstname + ' ' + currentEmergencyState.user.lastname} is being harassed by the law enforcement agency. Provide a Pro bono service to help {currentEmergencyState.user.firstname}</p> */}
                     </div>
                     <div className='row-three'>
                        { isAccepted || isRejected ? <p></p> : <div className="contact-info__actions">
                             <button className=" btn-one decline" 
                             onClick={reject}>
                                 {declineLoading && <CircularProgress style={{color:'red'}} size={14} />}
                                {!declineLoading && 'Decline'}
                             </button>

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