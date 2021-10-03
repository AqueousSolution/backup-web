import React,{useState, useContext } from 'react';
import { Modal, Popover } from '@material-ui/core';
import Avi from '../../../assets/default-avatar.svg';
import Ellipse from '../../../assets/ellipse-menu.svg';
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";
import VideoModal from './VideoModal';
import MapModal from './MapModal';
import CommentModal from './CommentModal';
import { useEffect } from 'react';

const LogItem = ({ProfilePic,EmergencyId,FullName,Phone,Email,Location,Status,Comment}) => {

    const { emergencyDetails, getEmergencyDetails, clearEmergencyDetails } = useContext(EmergenciesContext)

    const [anchorEl, setAnchorEl] = useState(null);

    /* const [popup,setPopup] = useState(false) */

    const[mapModal,setMapModal] = useState(false)
    
    const[videoModal,setVideoModal] = useState(false)

    const[commentModal,setCommentModal] = useState(false)

  /*   const togglePopup = () =>{
        setPopup(!popup)
    } */

    //console.log(emergencyDetails)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const getEmergencyVideo = () =>{
        getEmergencyDetails(EmergencyId)
    }

    const openVideoModal =() =>{
        getEmergencyVideo()
        setVideoModal(true)
    }

    const closeVideoModal =() =>{
        setVideoModal(false)
    }

    const openCommentModal =() =>{
        setCommentModal(true)
    }

    const closeCommentModal =() =>{
        setCommentModal(false)
    }

    const openMapModal =() =>{
        setMapModal(true)
    }

    const closeMapModal =() =>{
        setMapModal(false)
        clearEmergencyDetails()
    }

    useEffect(()=>{
        getEmergencyDetails(EmergencyId)
        //eslint-disable-next-line
    },[EmergencyId])

    
    let key = process.env.REACT_APP_GOOGLE_MAP
    let url = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`



    return ( 
        <>
            <Modal 
             open={videoModal}
             onClose={closeVideoModal}
             aria-labelledby="video-modal"
             aria-describedby="displays-distress-video">
                 <div>
                    <VideoModal closeVideoModal={closeVideoModal} emergencyInfo={emergencyDetails}/>
                 </div>
                
            </Modal>

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
             open={mapModal}
             onClose={closeMapModal}
             aria-labelledby="map-modal"
             aria-describedby="displays-map">
                 <div>
                    <MapModal 
                    closeMapModal={closeMapModal}
                    latitude={emergencyDetails ? emergencyDetails.emergency.locations[0].latitude : 1.1010}
                    longitude={emergencyDetails ? emergencyDetails.emergency.locations[0].longitude : 1.1010}
                    EmergencyId={EmergencyId}
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
         <div className='media-popup popupHeight' >
             <p onClick={openMapModal}> View Map</p>
            <p onClick={openVideoModal}>Watch media</p>
            <p onClick={openCommentModal}>View Comment</p>
        </div>
      </Popover>
            <div className="log-item" >
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
       {/*          <div>
                    <p className='log-item__title'>Comment</p>
                    <p className='log-item__comments'>{Comment}</p> 
                </div> */}
                <img src={Ellipse} alt="menu" className="ellipse" onClick={handleClick}/>
          {/*       {popup && 
                <div className='media-popup popupHeight' >
                    <p onClick={openVideoModal}>Watch media</p>
                    <p onClick={openCommentModal}>View Timeline</p>
                </div>} */}
            </div>
        </>
     );
}
 
export default LogItem;