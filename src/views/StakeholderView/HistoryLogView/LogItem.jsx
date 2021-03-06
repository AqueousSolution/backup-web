import React,{useState, useContext, useEffect} from 'react'
import Avi from '../../../assets/default-avatar.svg';
import Ellipse from '../../../assets/ellipse-menu.svg'
import { Modal,Popover } from '@material-ui/core';
import CommentModal from './CommentModal';
import UsersContext from "../../../store/stakeholder/users/usersContext";
import VideoModal from './VideoModal'
import MapModal from './MapModal'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const LogItem = ({EmergencyId,FullName,Phone,Email,Location,Status,Emergency}) => {


    const [anchorEl, setAnchorEl] = useState(null);

    /* const [popup,setPopup] = useState(false) */

    const { getEmergencyDetails, emergencyInfo, respondToEmergency, getMyEmergencies, clearCurrentEmergency }  = useContext(UsersContext)

    const[mapModal,setMapModal] = useState(false)

    const[commentModal,setCommentModal] = useState(false)
    
    const[videoModal,setVideoModal] = useState(false)

    const[successAlert, setOpenAlert] = useState(false)

 /*    const togglePopup = () =>{
        setPopup(!popup)
    } */

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
        clearCurrentEmergency()
      };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };

    const markResolved = () =>{
        respondToEmergency(
            EmergencyId,
            'resolved'
       )
       getMyEmergencies(1)
       handleClose()
       setOpenAlert(true)
    }

    const openCommentModal =() =>{
        setCommentModal(true)
    }

    const closeCommentModal =() =>{
        setCommentModal(false)
    }

    const openMapModal =() =>{
        getEmergencyDetails(EmergencyId)
        setMapModal(true)
    }

    const closeMapModal =() =>{
        setMapModal(false)
        clearCurrentEmergency()
    }

    
    const openVideoModal =() =>{
        setVideoModal(true)
        getEmergencyDetails(EmergencyId)
    }

    const closeVideoModal =() =>{
        setVideoModal(false)
    }


    useEffect(()=>{
        if(open){
            getEmergencyDetails(EmergencyId)
        }
      
       
        //eslint-disable-next-line
    },[EmergencyId])


    let key = process.env.REACT_APP_GOOGLE_MAP
    let url = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`

    console.log(Status)

    return ( 
        <>
            <Snackbar open={successAlert}  onClose={handleCloseAlert} >
                <Alert onClose={handleCloseAlert} severity="success">
                        This Emergency has now been resolved
                </Alert>
            </Snackbar>

            <Modal
            open={commentModal}
            onClose={closeCommentModal}
            aria-labelledby="comment-modal"
            aria-describedby="comment"
            >
                <div>
                 <CommentModal closeCommentModal={closeCommentModal} EmergencyId={EmergencyId}/>
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

            <Modal 
             open={mapModal}
             onClose={closeMapModal}
             aria-labelledby="map-modal"
             aria-describedby="displays-map">
                 <div>
                    <MapModal 
                    closeMapModal={closeMapModal} emergencyInfo={emergencyInfo}
                    cordinates={emergencyInfo}
                    latitude={emergencyInfo ? emergencyInfo.emergency.locations[0].latitude : 1.1010}
                    longitude={emergencyInfo ? emergencyInfo.emergency.locations[0].longitude : 1.1010}
                    isMarkerShown={true}
                    googleMapURL= {url}
                    loadingElement={<div style={{ height: `10rem` }} />}
                    containerElement={<div style={{ height: `45rem`, width: '35rem', position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)`, border:`11px solid white` }} />}
                    mapElement={<div style={{ height: `100%` }} />}/>
                    
                 </div>
                
            </Modal>

            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{boxShadow:'none'}}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
             >
                <div className='media-popup' >
                        <p onClick={openMapModal}> View map</p>
                        <p onClick={openVideoModal}>Watch media</p>
                        <p onClick={openCommentModal}>Comment</p>
                        {Status !== 'resolved' && <p className='resolved' onClick={markResolved}>Mark Resolved</p>}
                </div>
            </Popover>
            <div className="log-item-stake">
                <img src={Avi} alt="profile pic" className='log-item__pic'/>
                <div>
                    <p className='log-item__title'>Fullname</p>
                    <p className='log-item__value'>{FullName}</p>
                </div>
                <div>
                    <p className='log-item__title'>Phone</p>
                    <p className='log-item__value'>{Phone}</p> 
                </div>
                <div>
                    <p className='log-item__title'>Email</p>
                    <p className='log-item__value'>{Email}</p> 
                </div>
                <div>
                    <p className='log-item__title'>Location</p>
                    <p className='log-item__value'>{Location}</p> 
                </div>
                <div>
                    <p className='log-item__title'>Status</p>
                    <p className='log-item__value'>{Status}</p> 
                </div>
                <div>
                    <p className='log-item__title'>Date Assigned</p>
                    <p className='log-item__value'>{Emergency.resolutions[0] ? Emergency.resolutions[0].created_at : '----'}</p>
                </div>
         {/*        <div>
                    <p className='log-item__title'>Comment</p>
                    <p className='log-item__comments'>{Comment}</p> 
                </div> */}
                <img src={Ellipse} alt="menu" className="ellipse" onClick={handleClick}/>

             {/*    {popup && 
                    <div className='media-popup'>
                        <p>Export media</p>
                        <p onClick={openVideoModal}>Watch media</p>
                        <p onClick={openCommentModal}>Comment</p>
                        <p className='resolved' onClick={markResolved}>Mark Resolved</p>
                    </div>} */}
            </div>
        </>
     );
}
 
export default LogItem;