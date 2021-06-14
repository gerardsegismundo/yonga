import React, { useMemo } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentSection = ({ productId, comments }) =>
  useMemo(() => {
    return (
      <section className='comment-section'>
        {comments && comments.length > 0 && (
          <div className='comment-heading'>
            <h3>Comment{comments.length > 1 && 's'}</h3>
            <span>
              {comments.length} comment{comments.length > 1 && 's'}
            </span>
          </div>
        )}

        {comments && comments.map(comment => <Comment {...comment} key={comment._id} productId={productId} />)}

        <CommentForm productId={productId} />
      </section>
    )
    // eslint-disable-next-line
  }, [comments])

export default CommentSection
