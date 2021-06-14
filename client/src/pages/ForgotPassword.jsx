import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import progress from '../utils/helpers/progress'
import NotificationManager from 'react-notifications/lib/NotificationManager'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = e => {
    if (error) setError('')
    setEmail(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    if (error) setError('')

    setIsLoading(true)
    progress(async () => {
      try {
        await axios.post('/user/forgotpassword', { email })

        NotificationManager.success(
          'Reset link has been sent to your email. Please open your email before the session expires in 30 minutes.',
          'Success'
        )
      } catch (error) {
        if (error.response.data.error) {
          setError(error.response.data.error)
        }
      }
    })
    setIsLoading(false)
    setEmail('')
  }

  return (
    <div className='forgot-password'>
      <h2>Forgot password</h2>
      <p>We will send you an email to reset your password.</p>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor='forgotemail'>Email</label>
        <input
          type='email'
          id='forgotemail'
          name='forgotemail'
          onChange={handleOnChange}
          value={email}
          data-is-valid={error ? false : true}
          disabled={isLoading}
        />
        {error && <span className='invalid-msg'>{error}</span>}

        <button type='submit' disabled={isLoading}>
          Send
        </button>
        <Link to='/account/login'>Cancel</Link>
      </form>
    </div>
  )
}

export default ForgotPassword
