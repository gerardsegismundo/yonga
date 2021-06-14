import React from 'react'

const NewsLetterForm = () => {
  return (
    <>
      <form className='news-letter-form'>
        <h2>Newsletter</h2>
        <div className='input-group'>
          <input type='text' required />
          <label htmlFor='email'>email</label>
          <span className='line'></span>
          <button>send</button>
        </div>
      </form>
    </>
  )
}

export default NewsLetterForm
