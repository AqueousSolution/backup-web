import React,{useState, useContext } from 'react';
import { Modal } from '@material-ui/core';
import Avi from '../../../assets/default-avatar.svg';
import Ellipse from '../../../assets/ellipse-menu.svg';
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";
import VideoModal from './VideoModal';

const LogItem = ({ProfilePic,EmergencyId,FullName,Phone,Email,Location,Status,Comment}) => {

    const { emergencyDetails, getEmergencyDetails } = useContext(EmergenciesContext)

    const [popup,setPopup] = useState(false)
    
    const[videoModal,setVideoModal] = useState(false)

    const togglePopup = () =>{
        setPopup(!popup)
    }

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

    //console.log(emergencyDetails.emergency.videos[0])

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
            <div className="log-item">
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
                    <p className='log-item__title'>Comment</p>
                    <p className='log-item__comments'>{Comment}</p> 
                </div>
                <img src={Ellipse} alt="menu" className="ellipse" onClick={togglePopup}/>
                {popup && 
                <div className='media-popup'>
                    <p>Export media</p>
                    <p onClick={openVideoModal}>Watch media</p>
                </div>}
            </div>
        </>
     );
}
 
export default LogItem;