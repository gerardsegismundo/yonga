import React, { useState, useEffect } from 'react'
import formatDate from '../utils/helpers/formatDate'
import { CustomTextArea } from './custom'

import { progress } from '../utils/helpers/'

import { useDispatch, useSelector } from 'react-redux'
import { updateComment, openConfirmModal } from '../redux/actions'

const Comment = ({ createdAt, comment, user, _id, productId }) => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [commentHandler, setCommentHandler] = useState('')

  const currentUser = useSelector(({ user }) => user)

  useEffect(() => {
    setCommentHandler(comment)
  }, [comment])

  const handleDelete = () => {
    dispatch(
      openConfirmModal({
        msg: {
          confirmation: 'Are you sure you want to delete your comment?',
          success: {
            title: 'Success!',
            body: 'Your comment has been deleted.'
          },
          error: {
            title: 'Failed!',
            body: 'Oops something went wrong. Please try again later.'
          }
        },

        onDelete: 'DELETE_COMMENT',
        args: { commentId: _id, productId }
      })
    )
  }

  const date = formatDate(createdAt)

  const handleEdit = () => setIsEditing(!isEditing)

  const handleOnChange = e => setCommentHandler(e.target.value)

  const handleUpdate = () => {
    progress(() => dispatch(updateComment(productId, _id, commentHandler)))
    setIsEditing(false)
  }

  const NoUserImageLink = 'https://res.cloudinary.com/yonga/image/upload/v1609120288/no_image_avatar_f1er2g.png'

  return (
    <div className='comment'>
      <img
        className='avatar'
        src={!user ? NoUserImageLink : user.avatar ? user.avatar.url : NoUserImageLink}
        alt='avatar'
      />
      <h4 className='label'>
        <span>{!user ? 'Deleted User' : user && user.name} &nbsp;&nbsp;|</span>
        &nbsp;&nbsp;
        <wbr />
        <span>{date}</span>
      </h4>
      <div className='container'>
        {!isEditing ? (
          <>
            <p className='msg'>{comment}</p>
            {user && currentUser.isAuthenticated && currentUser.data && currentUser.data._id === user._id && (
              <>
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleDelete}>delete</button>
              </>
            )}
          </>
        ) : (
          <>
            <CustomTextArea value={commentHandler} onChange={handleOnChange} />
            <button onClick={handleUpdate}>update</button>
            <button onClick={handleEdit}>cancel</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Comment
