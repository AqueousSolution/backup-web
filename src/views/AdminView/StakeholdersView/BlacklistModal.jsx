const BlacklistModal = ({unblacklist, blacklist, closeBlacklistModal, currentStakeholderState}) => {
    return (
        <div className='blacklist-modal'>
            <h4>Are you sure you want to {currentStakeholderState && currentStakeholderState.profile.blacklisted_at ? 'unblacklist' : 'blacklist'} this stakeholder?</h4>
            <div className='blacklist-modal__buttons'>
                <button className='btn-one' onClick={ currentStakeholderState && currentStakeholderState.profile.blacklisted_at ? unblacklist : blacklist}>{currentStakeholderState && currentStakeholderState.profile.blacklisted_at ? 'unblacklist' : 'blacklist'}</button>
                <button className='btn-one' onClick={closeBlacklistModal}>Cancel</button>
            </div>
        </div>
      );
}
 
export default BlacklistModal;