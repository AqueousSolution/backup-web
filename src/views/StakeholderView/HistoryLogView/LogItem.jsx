import React,{useState, useContext, useEffect} from 'react'
import Avi from '../../../assets/default-avatar.svg';
import Ellipse from '../../../assets/ellipse-menu.svg'
import { Modal,Popover } from '@material-ui/core';
import CommentModal from './CommentModal';
import UsersContext from "../../../store/stakeholder/users/usersContext";
import VideoModal from './VideoModal'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const LogItem = ({EmergencyId,FullName,Phone,Email,Location,Status,Comment}) => {


    const [anchorEl, setAnchorEl] = useState(null);

    const [popup,setPopup] = useState(false)

    const { getEmergencyDetails, emergencyInfo, respondToEmergency }  = useContext(UsersContext)

    
    const[commentModal,setCommentModal] = useState(false)
    
    const[videoModal,setVideoModal] = useState(false)

    const[successAlert, setOpenAlert] = useState(false)

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
       setOpenAlert(true)
       setPopup(false)
    }

    const openCommentModal =() =>{
        setCommentModal(true)``
    }

    const closeCommentModal =() =>{
        setCommentModal(false)
    }

    
    const openVideoModal =() =>{
        setVideoModal(true)
    }

    const closeVideoModal =() =>{
        setVideoModal(false)
    }


    useEffect(()=>{
        getEmergencyDetails(EmergencyId)
        //eslint-disable-next-line
    },[])

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
                        <p onClick={openVideoModal}>Watch media</p>
                        <p onClick={openCommentModal}>Comment</p>
                        <p className='resolved' onClick={markResolved}>Mark Resolved</p>
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
         {/*        <div>
                    <p className='log-item__title'>Comment</p>
                    <p className='log-item__comments'>{Comment}</p> 
                </div> */}
                <img src={Ellipse} alt="menu" className="ellipse" onClick={handleClick}/>

                {popup && 
                    <div className='media-popup'>
                        <p>Export media</p>
                        <p onClick={openVideoModal}>Watch media</p>
                        <p onClick={openCommentModal}>Comment</p>
                        <p className='resolved' onClick={markResolved}>Mark Resolved</p>
                    </div>}
            </div>
        </>
     );
}
 
export default LogItem;