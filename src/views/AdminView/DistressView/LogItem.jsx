import React,{useState, useContext } from 'react';
import { Modal, Popover } from '@material-ui/core';
import Avi from '../../../assets/default-avatar.svg';
import Ellipse from '../../../assets/ellipse-menu.svg';
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";
import VideoModal from './VideoModal';
import CommentModal from './CommentModal';
import { useEffect } from 'react';

const LogItem = ({ProfilePic,EmergencyId,FullName,Phone,Email,Location,Status,Comment}) => {

    const { emergencyDetails, getEmergencyDetails } = useContext(EmergenciesContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const [popup,setPopup] = useState(false)
    
    const[videoModal,setVideoModal] = useState(false)

    const[commentModal,setCommentModal] = useState(false)

    const togglePopup = () =>{
        setPopup(!popup)
    }

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

    useEffect(()=>{
        getEmergencyDetails(EmergencyId)
        //eslint-disable-next-line
    },[EmergencyId])



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
            <p onClick={openVideoModal}>Watch media</p>
            <p onClick={openCommentModal}>View Timeline</p>
        </div>
      </Popover>
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
       {/*          <div>
                    <p className='log-item__title'>Comment</p>
                    <p className='log-item__comments'>{Comment}</p> 
                </div> */}
                <img src={Ellipse} alt="menu" className="ellipse" onClick={handleClick}/>
                {popup && 
                <div className='media-popup popupHeight' >
                    <p onClick={openVideoModal}>Watch media</p>
                    <p onClick={openCommentModal}>View Timeline</p>
                </div>}
            </div>
        </>
     );
}
 
export default LogItem;