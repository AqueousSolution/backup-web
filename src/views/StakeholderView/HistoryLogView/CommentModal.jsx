import React, { useState,useEffect,useContext } from 'react';
import Send from '../../../assets/send.svg'
import UsersContext from "../../../store/stakeholder/users/usersContext";

const CommentModal = ({closeCommentModal, EmergencyId}) => {

    
    const {  timeline, getEmergencyTimeline, addToTimeline, success, clearError }  = useContext(UsersContext)

    const [commentData, setCommentData] = useState({
        status: 'in-progress',
        comment:'',
        date: new Date().toISOString().slice(0,10)
    })

    const handleChange = (e) =>{
        setCommentData({...commentData, comment:e.target.value})
    }

    console.log(commentData.date)

    const submitComment = () =>{
        addToTimeline(EmergencyId, commentData)
        setCommentData({
            status: 'in-progress',
            comment:'',
            date: new Date().toISOString().slice(0,10)
        })
    }

    useEffect(()=>{
        getEmergencyTimeline(EmergencyId)
         //eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(success){
            getEmergencyTimeline(EmergencyId)
            setTimeout(()=>clearError,1000)
        }
        //eslint-disable-next-line
    },[success])


    return ( 
        <div className='comment'>
            <header className='comment-header'>
                Comment
                <div className="close" onClick={closeCommentModal}>x</div>
            </header>
            <main>
               {timeline && timeline.map(comments=>{
                   return <p className='comment-message' key={comments.id}>{comments.comment} <span>{comments.date}</span></p>
               }) } 
                <div className="comment-box">
                    <input type='text' placeholder='Add Comment' value={commentData.comment} onChange={handleChange}/>
                    <button onClick={submitComment}><img src={Send} alt="send" /></button>
                </div>
            </main>
            
        </div>
     );
}
 
export default CommentModal;