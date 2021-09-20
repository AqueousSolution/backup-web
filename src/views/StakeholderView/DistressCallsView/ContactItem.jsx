import { useContext } from "react";
import UsersContext from "../../../store/stakeholder/users/usersContext";
import ProfilePic from '../../../assets/default-avatar.svg'


const ContactItem = ({FullName,PhoneNumber,User,currentPage}) => {

    const{ currentEmergency,setCurrentEmergency, clearCurrentEmergency } = useContext(UsersContext)

    const displayProfile = () =>{
        clearCurrentEmergency()
        setCurrentEmergency(User)
    }

   

   
    return ( 
        <div className={currentEmergency && currentEmergency.id === User.id ? "contact-item selected" : "contact-item"} onClick={displayProfile}>
            <img src={ProfilePic} alt="profile pic" className='contact-item__avi'/>
            <div className='contact-item__name'>
                <p>Fullname</p>
                <h4>{FullName}</h4>
            </div>
            <div className='contact-item__number'>
                <p>Contact</p>
                <h4>{PhoneNumber}</h4>
            </div>
        </div>
     );
}
 
export default ContactItem;