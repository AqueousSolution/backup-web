import ContactItem from "./ContactItem";
import aviOne from '../../assets/profilePhoto.png'

const ContactList = () => {
    return ( 
        <div className='contact-list'>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' PhoneNumber='08167222136' ProfilePic={aviOne}/>
        </div>
     );
}
 
export default ContactList;