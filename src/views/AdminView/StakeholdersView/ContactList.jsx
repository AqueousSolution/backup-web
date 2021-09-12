import ContactItem from "./ContactItem";
import StakeholdersContext from "../../../store/admin/stakeholders/stakeholdersContext";
import { useEffect, useState, useContext } from "react";
import ArrowLeft from '../../../assets/backward-arrow.svg';
import ArrowRight from '../../../assets/forward-arrow.svg';

const ContactList = () => {

    const { stakeholders, getStakeholders, searchResults, searchStakeholders, clearSearch, pageCount, totalStakeholders }  = useContext(StakeholdersContext)
    const[stakeholdersState,setStakeholdersState] = useState([])


    const [searchQuery, setSearchQuery] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)

    
    const nextPage = () =>{
        if(currentPage < noOfPages){
        setCurrentPage(currentPage + 1)
       } 
   }

   const previousPage = () =>{
       if(currentPage > 1){
        setCurrentPage(currentPage - 1)
       }
    }

    const handleSearch = (e) =>{
        setSearchQuery(e.target.value)
    }

    const findStakeholderStatus = (user) =>{
            if(user.profile.approved_at === null && user.profile.suspended_at === null){
                return 'pending'
            }else if(user.profile.blacklisted_at){
                return 'blacklisted'
            }else if(user.profile.suspended_at){
                return 'declined'
            }else{
                return 'approved'
            }
     
    }

    useEffect(()=>{
        getStakeholders(currentPage)
         /* eslint-disable */
    },[currentPage])

    useEffect(()=>{
        setStakeholdersState(stakeholders)
        setNoOfPages(pageCount)
    },[stakeholders,pageCount])

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
                    StakeholderId = {user.id}
                    FullName={user.firstname} 
                    PhoneNumber={user.phone} 
                    lastName={user.lastName}
                    ProfilePic={user.profilePic}
                    Stakeholder={user}
                    Status={findStakeholderStatus(user)}/>
                ))
            } 

            <div className='pagination'>
                <div className="pagination-center">
                    <img src={ArrowLeft} alt="left" onClick={previousPage}/>
                    <ul>
                        {/* <li>1</li>
                        <li>2</li>
                        <li>3</li> */}
                        {Array.from(Array(pageCount).keys()).map((arr,index)=><li key={index}>{arr + 1 === currentPage ? <span>{arr + 1}</span> : arr + 1}</li>)}
                    </ul>
                    <img src={ArrowRight} alt="right" onClick={nextPage}/>
                </div>
                <span>{(currentPage-1) * 10}-{currentPage * 10} of {totalStakeholders}</span>
            </div>
        </div>
     );
}
 
export default ContactList;