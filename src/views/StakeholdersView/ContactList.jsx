import ContactItem from "./ContactItem";
import aviOne from '../../assets/profilePhoto.png'

const ContactList = () => {
    return ( 
        <div className='contact-list'>
            <ContactItem FullName='John Doe' Status='Approved' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Approved' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Pending' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Approved' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Approved' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Declined' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Approved' Prompts='In Progress' ProfilePic={aviOne}/>
            <ContactItem FullName='John Doe' Status='Approved' Prompts='In Progress' ProfilePic={aviOne}/>
        </div>
     );
}
 
export default ContactList;