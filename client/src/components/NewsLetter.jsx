import { useState } from 'react'

const NewsLetter = () => {
  const [email, setEmail] = useState('')
  const inputClass = email.length > 0 ? 'is-active' : ''

  const handleOnChange = e => setEmail(e.target.value)

  const handleOnSubmit = e => {
    e.preventDefault()

    console.log(email)
    setEmail('')
  }

  return (
    <div className='news-letter'>
      <div className='wrapper'>
        <section>
          <h3>Newsletter</h3>
          <p>Subscribe to our weekly newsletter.</p>
        </section>

        <form onSubmit={handleOnSubmit}>
          <div className='input-group'>
            <input
              type='email'
              className={inputClass}
              id='newsletter-email'
              value={email}
              onChange={handleOnChange}
              placeholder='Type your email..'
              required
            />
            <label htmlFor='newsletter-email'>Email</label>
            <span className='underline' />
          </div>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default NewsLetter
