import React, { useState,useEffect,useContext } from 'react';
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";


const CommentModal = ({closeCommentModal, EmergencyId}) => {

    const { emergencyDetails, getEmergencyDetails } = useContext(EmergenciesContext)

    const [timelineData, setTimelineData] = useState([])



    useEffect(()=>{
        getEmergencyDetails(EmergencyId)
        //eslint-disable-next-line
    },[])

    useEffect(()=>{
       setTimelineData(emergencyDetails.emergency.resolutions)
    },[emergencyDetails])

/*     useEffect(()=>{
        getEmergencyTimeline(EmergencyId)
    },[])

    useEffect(()=>{
        if(success){
            getEmergencyTimeline(EmergencyId)
            setTimeout(()=>clearError,1000)
        }
    },[success]) */


    console.log(timelineData)

    return ( 
        <div className='comment'>
            <header className='comment-header'>
                Comment
                <div className="close" onClick={closeCommentModal}>x</div>
            </header>
            <main>
               {timelineData && timelineData.map(timeline=>{
                   return <p className='comment-message-admin' key={timeline.id}>{timeline.timelines.map(comments=><span className='comment-item'><span className='comment-text'>{comments.comment}</span>{comments.date}</span>)} <span className='commenter-name'>{timeline.stakeholder.firstname + ' ' + timeline.stakeholder.lastname}</span></p>
               }) } 
         {/*        <div className="comment-box">
                    <input type='text' placeholder='Add Comment' value={commentData.comment} onChange={handleChange}/>
                    <button onClick={submitComment}><img src={Send} alt="send" /></button>
                </div> */}
            </main>
            
        </div>
     );
}
 
export default CommentModal;