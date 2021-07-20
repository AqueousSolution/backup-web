

const ContactItem = ({ProfilePic,Status,FullName,Prompts}) => {
    return ( 
        <div className="contact-item">
            <img src={ProfilePic} alt="profile pic" className='contact-item__avi'/>
            <div className='contact-item__name'>
                <p>{Status}</p>
                <h4>{FullName}</h4>
            </div>
            <div className='contact-item__number'>
                <p>Prompts</p>
                <h4>{Prompts}</h4>
            </div>
        </div>
     );
}
 
export default ContactItem;