import aviOne from '../../assets/profilePhoto.png'
import EmergencyContact from './EmergencyContact';

const ContactInfo = () => {
    return ( 
        <>
            <div className="contact-info">
                <div className='row-one'>
                    <img src={aviOne} alt="profile pic" className="contact-info__pic" />
                    <h2 className="contact-info__name">John Doe</h2>
                </div>
                <div className='row-two'>
                    <h1 className="contact-info__subheader">Profile details</h1>
                    <p className="contact-info__fullname">Full Name</p>
                </div>
                <div className='row-three'>
                    <h1 className="contact-info__subheader">Emergency Contacts</h1>
                   <EmergencyContact fullName='James Abayomi' ProfilePic={aviOne} status='Pending'/>
                   <EmergencyContact fullName='James Abayomi' ProfilePic={aviOne} status='Pending'/>
                </div>
                <div className="row-four">
                    <h1 className="contact-info__subheader">Backup History</h1>
                    <p className="contact-info__stakeholder">Toheeb Yusuf <span>Assign Stakeholder</span></p>
                </div>
            </div>
        </>
     );
}
 
export default ContactInfo;