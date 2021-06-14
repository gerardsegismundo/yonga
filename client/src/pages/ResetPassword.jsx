import React, { useState, useEffect } from 'react'

import axios from 'axios'
import progress from '../utils/helpers/progress'
import { NotificationManager } from 'react-notifications'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ResetPassword = () => {
  const user = useSelector(({ user }) => user)
  const history = useHistory()
  const { reset_token } = useParams()

  const validateResetToken = async () => {
    try {
      const { data } = await axios.get(`/user/validatereset_token?reset_token=${reset_token}`)

      setForm({
        ...form,
        clientId: data.client_id
      })
    } catch (error) {
      if (error.response.status === 403) {
        NotificationManager.error('Session expired please try again.', 'Error.')
      } else {
        if (error.response.data.error) {
          const { message } = error.response.data.error

          NotificationManager.error(
            message.charAt(0).toUpperCase() + message.substring(1) + '. Please try again.',
            'Error.'
          )

          history.push('/account/login')
        }
      }
    }
  }

  useEffect(() => {
    if (!user.isAuthenticated && !reset_token) {
      return history.push('/account/login')
    }

    if (reset_token) {
      validateResetToken()
    }

    if (user.isAuthenticated) {
      setForm({
        ...form,
        clientId: user.data._id
      })
    }

    // eslint-disable-next-line
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    clientId: '',
    resetpassword: '',
    cresetpassword: ''
  })

  const [error, setError] = useState({
    resetpassword: '',
    cresetpassword: ''
  })

  const handleOnChange = e => {
    if (error) setError('')

    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    if (error) setError('')

    if (!form.resetpassword || !form.cresetpassword) {
      return setError({
        ...error,
        resetpassword: !form.resetpassword && 'Password is required.',
        cresetpassword: !form.cresetpassword && 'Confirm password is required.'
      })
    }

    if (form.resetpassword !== form.cresetpassword) {
      return setError({
        resetpassword: 'Password and confirm password did not match.',
        cresetpassword: 'Password and confirm password did not match.'
      })
    }

    setIsLoading(true)
    progress(async () => {
      try {
        await axios.post('/user/resetpassword', {
          clientId: form.clientId,
          password: form.resetpassword
        })

        NotificationManager.success(
          'Your password has been updated. You may now login using your new password.',
          'Success.'
        )

        history.push('/account/login')
      } catch (error) {
        console.log(error)
      }
    })
    setIsLoading(false)
  }

  return (
    <div className='reset-password'>
      <h2>reset your account password</h2>
      <h3>Please enter your new password</h3>

      <form onSubmit={handleOnSubmit}>
        <label htmlFor='resetpassword'>password</label>
        <input
          type='password'
          id='resetpassword'
          name='resetpassword'
          onChange={handleOnChange}
          value={form.resetpassword}
          data-is-valid={error.resetpassword ? false : true}
          disabled={isLoading}
        />
        {error.resetpassword && <span className='invalid-msg'>{error.resetpassword}</span>}
        <label htmlFor='cresetpassword'>confirm password</label>
        <input
          type='password'
          id='cresetpassword'
          name='cresetpassword'
          onChange={handleOnChange}
          value={form.cresetpassword}
          data-is-valid={error.cresetpassword ? false : true}
          disabled={isLoading}
        />
        {error.cresetpassword && <span className='invalid-msg'>{error.cresetpassword}</span>}

        <button type='submit' disabled={isLoading}>
          reset password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
