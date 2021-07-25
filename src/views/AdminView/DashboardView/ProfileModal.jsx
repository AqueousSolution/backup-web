const ProfileModal = ({closeProfileModal}) => {
    return ( 
        <form className="profile-modal">
            <h1 className="profile-modal__heading">Edit Profile</h1>
            <input type="text" className="profile-modal__field" />
            <input type="text" className="profile-modal__field"/>
            <input type="text" className="profile-modal__field" />
            <input type="text" className="profile-modal__field" />
            <input type="text" className="profile-modal__field" />
            <div className="profile-modal__actions">
                <button className="btn-one cancel" onClick={closeProfileModal}>Cancel</button>
                <button className="btn-one save">Save</button>
            </div>
        </form>
     );
}
 
export default ProfileModal;