import ContactItem from "./ContactItem";
import StakeholdersContext from "../../../store/admin/stakeholders/stakeholdersContext";
import { useEffect, useState, useContext } from "react";

const ContactList = () => {

    const { stakeholders, getStakeholders }  = useContext(StakeholdersContext)
    const[stakeholdersState,setStakeholdersState] = useState([])

    
    useEffect(()=>{
        getStakeholders()
         /* eslint-disable */
    },[])

    useEffect(()=>{
        setStakeholdersState(stakeholders)
    },[stakeholders])
    

    return ( 
        <div className='contact-list'>
            <input type="text" className='contact-list__search' placeholder='Search'/>
             {
                stakeholdersState && stakeholdersState.map(user=>(
                    <ContactItem 
                    key={user.id}
                    FullName={user.firstname} 
                    PhoneNumber={user.phone} 
                    lastName={user.lastName}
                    ProfilePic={user.profilePic}
                    Stakeholder={user}/>
                ))
            } 
        </div>
     );
}
 
export default ContactList;