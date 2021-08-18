import ContactItem from "./ContactItem";
//import aviOne from '../../../assets/profilePhoto.png'
import UsersContext from "../../../store/admin/users/usersContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ArrowLeft from '../../../assets/backward-arrow.svg';
import ArrowRight from '../../../assets/forward-arrow.svg';

const ContactList = () => {

    const { users, getUsers, pageCount, totalUsers, searchResults, clearSearch, searchUser }  = useContext(UsersContext)
    const[usersState,setUsersState] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)

    const [searchQuery, setSearchQuery] = useState('')



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

    useEffect(()=>{
        getUsers(currentPage)
         /* eslint-disable */
    },[currentPage])

    useEffect(()=>{
        setUsersState(users)
        setNoOfPages(pageCount)
    },[users,pageCount])

    useEffect(()=>{
        if(searchQuery){
            searchUser(searchQuery)
        }else{
            clearSearch()
        }
    },[searchQuery])

    useEffect(()=>{
        if(searchResults){
            setUsersState(searchResults.data)
        }else{
            setUsersState(users)
        }
    },[searchResults])
    

    return ( 
        <div className='contact-list'>
            <input type="text" className='contact-list__search' placeholder='Search' value={searchQuery} onChange={handleSearch} />
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
                <span>{(currentPage-1) * 10}-{currentPage * 10} of {totalUsers}</span>
            </div>
        </div>
     );
}
 
export default ContactList;