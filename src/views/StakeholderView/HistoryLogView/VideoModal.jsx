import React,{useEffect, useState} from 'react';

const VideoModal = ({emergencyInfo}) => {



    const[distressVideo, setDistressVideo ]= useState('')

    useEffect(()=>{
        if(emergencyInfo){
            if(emergencyInfo.emergency.hasOwnProperty('videos')){
                setDistressVideo(emergencyInfo.emergency.videos[0])
                console.log(emergencyInfo)
            }       
        }
           
          return ()=>{
              setDistressVideo('')
           
          }
          //eslint-disable-next-line
    },[emergencyInfo])


    return ( 
        <div className="video-modal">
            {
                distressVideo ? 
                
                <video controls>
                    <source src={distressVideo.cloudinary_link} type="video/mp4" />
                </video>
                : 
                <p>No distress media recorded</p>
            }
    
        </div>
     );
}
 
export default VideoModal;