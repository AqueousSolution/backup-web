import ContactItem from "./ContactItem";
import StakeholdersContext from "../../../store/admin/stakeholders/stakeholdersContext";
import { useEffect, useState, useContext } from "react";

const ContactList = () => {

    const { stakeholders, getStakeholders, searchResults, searchStakeholders, clearSearch }  = useContext(StakeholdersContext)
    const[stakeholdersState,setStakeholdersState] = useState([])

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) =>{
        setSearchQuery(e.target.value)
    }

    useEffect(()=>{
        getStakeholders()
         /* eslint-disable */
    },[])

    useEffect(()=>{
        setStakeholdersState(stakeholders)
    },[stakeholders])

    useEffect(()=>{
        if(searchQuery){
            searchStakeholders(searchQuery)
        }else{
            clearSearch()
        }
    },[searchQuery])

    useEffect(()=>{
        if(searchResults){
            setStakeholdersState(searchResults.data)
        }else{
            setStakeholdersState(stakeholders)
        }
    },[searchResults])
    

    return ( 
        <div className='contact-list'>
            <input type="text" className='contact-list__search' placeholder='Search' value={searchQuery} onChange={handleSearch}/>
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