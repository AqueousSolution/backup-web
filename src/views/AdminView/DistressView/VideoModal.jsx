import React,{useEffect, useState} from 'react';

const VideoModal = ({emergencyInfo}) => {

    const[distressVideo, setDistressVideo ]= useState('')

    useEffect(()=>{
        if(emergencyInfo){
            if(emergencyInfo.emergency){
                setDistressVideo(emergencyInfo.emergency.videos[0])
            }       
        }
    },[emergencyInfo])

    return ( 
        <div className="video-modal">
            {
                distressVideo ? 
                
                 <video width="640" height="264" controls>
                    <source src={distressVideo.cloudinary_link} type="video/mp4" />
                   
                </video> 
                : <p>No distress media recorded</p>
            }
    
        </div>
     );
}
 
export default VideoModal;