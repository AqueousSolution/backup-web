import ThumbsUp from '../../../assets/ThumbsUp.svg'

const SuccessRegModal = () => {
    return ( 
        <div className='success-modal'>
            <h1>Account Created</h1>
            <img src={ThumbsUp} alt="thumbs up" />
            <p>Dear user your account has been created successfully. Please hold on while your account is vetted and approved by the admin</p>
        </div>
     );
}
 
export default SuccessRegModal;