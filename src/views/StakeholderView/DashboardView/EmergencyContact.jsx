

const EmergencyContact = ({fullName, ProfilePic, status}) => {
    return ( 
        <div className='e-contact'>
            <div className='e-contact__profile'>
                <img src={ProfilePic} alt="profile pic" />
                <p>{fullName}</p>
            </div>
            <span className={status==='confirmed' ? 'confirmed' : 'pending'}>{status}</span>
        </div>
     );
}
 
export default EmergencyContact;