import ContactItem from "./ContactItem";
import UsersContext from "../../../store/users/usersContext";
import { useEffect, useState, useContext } from "react";

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
                    FullName={user.fullName} 
                    PhoneNumber={user.phone} 
                    ProfilePic={user.profilePic}
                    User={user}/>
                ))
            }
        </div>
     );
}
 
export default ContactList;