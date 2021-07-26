import ContactItem from "./ContactItem";
//import aviOne from '../../../assets/profilePhoto.png'
import UsersContext from "../../../store/users/usersContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const ContactList = () => {

    const { users, getUsers }  = useContext(UsersContext)
    const[usersState,setUsersState] = useState([])


    useEffect(()=>{
        getUsers()
       
         /* eslint-disable */
    },[])

    useEffect(()=>{
        setUsersState(users)
    },[users])
    

    return ( 
        <div className='contact-list'>
            <input type="text" className='contact-list__search' placeholder='Search'/>
            {
                usersState && usersState.map(user=>(
                    <ContactItem 
                    key={user.id}
                    FullName={user.firstname.slice(0,10) || ''} 
                    lastName={user.lastName}
                    PhoneNumber={user.phone} 
                    ProfilePic={user.profilePic}
                    User={user}/>
                ))
            }
        </div>
     );
}
 
export default ContactList;