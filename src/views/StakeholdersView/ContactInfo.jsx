import aviOne from '../../assets/profilePhoto.png'


const ContactInfo = () => {
    return ( 
        <>
            <div className="contact-info stakeholder-info">
                <div className='row-one'>
                    <img src={aviOne} alt="profile pic" className="contact-info__pic" />
                    <h2 className="contact-info__name">John Doe</h2>
                    
                </div>
                <div className='row-two span'>
                    <h1 className="contact-info__subheader">Profile details</h1>
                    <p className="contact-info__fullname">Full Name</p>
                    <p className="contact-info__fullname">Email Address</p>
                </div>
                <div className="row-four">
                    <h1 className="contact-info__subheader">Stakeholder request</h1>
                    <p className="contact-info__request">John doe has requested to be made a stakeholder</p>
                    <div className="contact-info__actions">
                        <button className='decline btn-one'>Decline</button>
                        <button className='approve btn-one'>Approve</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ContactInfo;