import React, { useState } from 'react'

import { CustomTextArea } from './custom'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

import { progress } from '../utils/helpers'
import { addComment } from '../redux/actions'

const CommentForm = ({ productId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(({ user }) => user)

  const handleOnChange = e => {
    setComment(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    if (!comment.trim()) return

    progress(async () => {
      const error = await dispatch(addComment(productId, comment))

      if (error) {
        NotificationManager.error(error, 'Commenting failed.')
      }
    })

    setComment('')
  }

  return (
    <div className='comment-form'>
      <h3>Leave a comment</h3>
      {isAuthenticated ? (
        <form onSubmit={handleOnSubmit}>
          <CustomTextArea name='comment' value={comment} onChange={handleOnChange} />
          <button className='dark-btn' type='submit'>
            Publish
          </button>
        </form>
      ) : (
        <p>
          You must <Link to='/account/login'>sign in</Link> in to comment.
        </p>
      )}
    </div>
  )
}

export default CommentForm
