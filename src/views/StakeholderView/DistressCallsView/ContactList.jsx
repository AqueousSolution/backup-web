import ContactItem from "./ContactItem";
//import aviOne from '../../../assets/profilePhoto.png'
import UsersContext from "../../../store/stakeholder/users/usersContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const ContactList = () => {


    const { allEmergencies, getEmergencies }  = useContext(UsersContext)
    const[emergenciesState,setEmergenciesState] = useState([])



    useEffect(()=>{
        getEmergencies()
         /* eslint-disable */
    },[])

    useEffect(()=>{
        setEmergenciesState(allEmergencies)
        
    },[allEmergencies])

    

    return ( 
        <div className='contact-list'>
            <input type="text" className='contact-list__search' placeholder='Search'/>
             {
                emergenciesState && emergenciesState.map((user,index)=>(
                    <ContactItem 
                    key={index}
                    FullName={user.user.firstname.slice(0,10) || ''} 
                    lastName={user.user.lastName}
                    PhoneNumber={user.user.phone} 
                    //ProfilePic={user.profilePic}
                    User={user}/>
                ))
            } 
        </div>
     );
}
 
export default ContactList;