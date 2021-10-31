import ContactItem from "./ContactItem";
//import aviOne from '../../../assets/profilePhoto.png'
import UsersContext from "../../../store/stakeholder/users/usersContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ArrowLeft from '../../../assets/backward-arrow.svg';
import ArrowRight from '../../../assets/forward-arrow.svg';

const ContactList = () => {


    const { allEmergencies, getEmergencies, totalEmergencies, distressPageCount, searchResults, clearSearch }  = useContext(UsersContext)
    const[emergenciesState,setEmergenciesState] = useState([])


    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)

    const [searchQuery, setSearchQuery] = useState('')

    const setPagination = (e) =>{
        setCurrentPage(Number(e.target.id))
        
    }


    const nextPage = () =>{
        if(currentPage < noOfPages){
        setCurrentPage(Number(currentPage) + 1)
       } 
   }

   const previousPage = () =>{
       if(currentPage > 1){
        setCurrentPage(Number(currentPage) - 1)
       }
    }

    const handleSearch = (e) =>{
        setSearchQuery(e.target.value)
    }


    useEffect(()=>{
        getEmergencies(currentPage)
         /* eslint-disable */
    },[currentPage])

    useEffect(()=>{
        setEmergenciesState(allEmergencies)
    },[allEmergencies,distressPageCount])

    useEffect(()=>{
        if(distressPageCount > 10){
            setNoOfPages(10)
        }else{
            setNoOfPages(distressPageCount)
        }
       
    },[])

    console.log(noOfPages)

    useEffect(()=>{
        if(searchQuery){
            searchUser(searchQuery)
        }else{
            clearSearch()
        }
    },[searchQuery])

    useEffect(()=>{
        if(searchResults){
            setEmergenciesState(searchResults.data)
        }else{
            setEmergenciesState(allEmergencies)
        }
    },[searchResults])

    

    return ( 
        <div className='contact-list'>
            <input type="text" className='contact-list__search' placeholder='Search'  value={searchQuery} onChange={handleSearch}/>
             {
                emergenciesState && emergenciesState.map((user,index)=>(
                    <ContactItem 
                    key={index}
                    FullName={user.user.firstname.slice(0,10) || ''} 
                    lastName={user.user.lastName}
                    PhoneNumber={user.user.phone} 
                    //ProfilePic={user.profilePic}
                    User={user}
                    currentPage={currentPage}/>
                ))
            } 
                <div className='pagination'>
                <div className="pagination-center">
                    <img src={ArrowLeft} alt="left" onClick={previousPage}/>
                    <ul>
                        {/* <li>1</li>
                        <li>2</li>
                        <li>3</li> */}
                        {Array.from(Array(noOfPages).keys()).map((arr,index)=><li id={arr + 1} onClick={setPagination} key={index}>{arr + 1 === currentPage ? <span >{arr + 1}</span> : arr + 1}</li>)}
                    </ul>
                    <img src={ArrowRight} alt="right" onClick={nextPage}/>
                </div>
                <span>{(currentPage-1) * 10}-{currentPage * 10} of {totalEmergencies}</span>
            </div>
        </div>
     );
}
 
export default ContactList;