import { useContext } from "react";
import ProfilePic from '../../../assets/default-avatar.svg'
import StakeholdersContext from '../../../store/admin/stakeholders/stakeholdersContext';


const ContactItem = ({FullName,PhoneNumber,Stakeholder,Status}) => {

    //const[currentStakeholderState, setCurrentHolderState] = useState([])
    const{ currentStakeholder, setCurrentStakeholder, clearCurrentStakeholder} = useContext(StakeholdersContext)

    const displayProfile = () =>{
        clearCurrentStakeholder()
        setCurrentStakeholder(Stakeholder)
    }

    return ( 
        <div className={currentStakeholder && currentStakeholder.id === Stakeholder.id ? "contact-item selected" : "contact-item"} onClick={displayProfile}>
            <img src={ProfilePic} alt="profile pic" className='contact-item__avi'/>
            <div className='contact-item__name'>
                <p>Fullname</p>
                <h4>{FullName}</h4>
            </div>
            <div className='contact-item__number'>
                <p>Status</p>
                <h5 className={Status==='approved' ? 'approved' : (Status === 'pending' ? 'pending' : 'declined') }>{Status}</h5>
            </div>
        </div>
     );
}
 
export default ContactItem;