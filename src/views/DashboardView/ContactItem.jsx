

const ContactItem = ({ProfilePic,FullName,PhoneNumber}) => {
    return ( 
        <div className="contact-item">
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