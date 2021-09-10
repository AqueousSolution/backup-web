import Send from '../../../assets/send.svg'

const CommentModal = ({closeCommentModal}) => {
    return ( 
        <div className='comment'>
            <header className='comment-header'>
                Comment
                <div className="close" onClick={closeCommentModal}>x</div>
            </header>
            <main>
                <div className="comment-box">
                    <input type='text'/>
                    <button><img src={Send} alt="send" /></button>
                </div>
            </main>
            
        </div>
     );
}
 
export default CommentModal;