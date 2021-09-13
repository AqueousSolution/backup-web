const PopupMenu = ({markResolved,openVideoModal,openCommentModal}) => {
    return ( 
        <div className='media-popup'>
            <p>Export media</p>
            <p onClick={openVideoModal}>Watch media</p>
            <p onClick={openCommentModal}>Comment</p>
            <p className='resolved' onClick={markResolved}>Mark Resolved</p>
        </div>
     );
}
 
export default PopupMenu;