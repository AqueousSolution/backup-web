import TextField from "material-ui/TextField";

const ProfileModal = ({closeProfileModal}) => {
    return ( 
        <form className="profile-modal">
            <h1 className="profile-modal__heading">Edit Profile</h1>
            <input type="text" className="profile-modal__field" placeholder='First Name' />
            <input type="text" className="profile-modal__field" placeholder='Last Name' />
            <input type="text" className="profile-modal__field" placeholder='Phone Number' />
            <input type="text" className="profile-modal__field" placeholder='Profession'/>
            <div className="profile-modal__actions">
                <button className="btn-one cancel" onClick={closeProfileModal}>Cancel</button>
                <button className="btn-one save">Save</button>
            </div>
        </form>
     );
}
 
export default ProfileModal;