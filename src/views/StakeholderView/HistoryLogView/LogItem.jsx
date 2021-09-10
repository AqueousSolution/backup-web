import React,{useState} from 'react'
import Avi from '../../../assets/default-avatar.svg';
import Ellipse from '../../../assets/ellipse-menu.svg'
import { Modal } from '@material-ui/core';
import CommentModal from './CommentModal';

const LogItem = ({EmergencyId,FullName,Phone,Email,Location,Status,Comment}) => {


    const [popup,setPopup] = useState(false)

    
    const[commentModal,setCommentModal] = useState(false)
    
    // const[videoModal,setVideoModal] = useState(false)

    const togglePopup = () =>{
        setPopup(!popup)
    }

    const openCommentModal =() =>{
        setCommentModal(true)
    }

    const closeCommentModal =() =>{
        setCommentModal(false)
    }

    return ( 
        <>
            <Modal
            open={commentModal}
            onClose={closeCommentModal}
            aria-labelledby="comment-modal"
            aria-describedby="comment"
            >
                <div>
                 <CommentModal closeCommentModal={closeCommentModal}/>
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
                        <p>Watch media</p>
                        <p onClick={openCommentModal}>Comment</p>
                    </div>}
            </div>
        </>
     );
}
 
export default LogItem;