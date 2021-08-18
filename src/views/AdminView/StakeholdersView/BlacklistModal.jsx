const BlacklistModal = ({blacklist, closeBlacklistModal}) => {
    return (
        <div className='blacklist-modal'>
            <h4>Are you sure you want to blacklist this stakeholder?</h4>
            <div className='blacklist-modal__buttons'>
                <button className='btn-one' onClick={blacklist}>Blaclist</button>
                <button className='btn-one' onClick={closeBlacklistModal}>Cancel</button>
            </div>
        </div>
      );
}
 
export default BlacklistModal;