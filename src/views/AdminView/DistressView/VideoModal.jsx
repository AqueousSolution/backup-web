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

    console.log(distressVideo.cloudinary_link)

    return ( 
        <div className="video-modal">
            {
                distressVideo ? 
                
                <video controls>
                    <source src={distressVideo.cloudinary_link} type="video/mp4" />
                </video>
                : <p>No distress video recorded</p>
            }
    
        </div>
     );
}
 
export default VideoModal;