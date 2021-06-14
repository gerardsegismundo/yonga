import React, { useState } from 'react'
import { validateRegister } from '../utils/validations'
import { removeErrorOnChange, progress } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import _ from 'lodash'

import axios from 'axios'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const clearError = () =>
    setError({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

  const clearForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleOnChange = e => {
    removeErrorOnChange(e, error, setError)

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    clearError()

    setIsLoading(true)
    progress(async () => {
      let isInValid = validateRegister(form)

      if (isInValid) {
        setError({
          name: isInValid.name && isInValid.name,
          email: isInValid.email && isInValid.email,
          password: isInValid.password && isInValid.password,
          confirmPassword: isInValid.confirmPassword && isInValid.confirmPassword
        })
      } else {
        try {
          const payload = _.omit(form, ['confirmPassword'])

          await axios.post('/auth/register', payload)

          NotificationManager.success(`Your registration confirmation has been sent to ${form.email}.`, 'Email Sent.')

          clearForm()
        } catch (error) {
          console.error(error)
          console.error(error.response)

          if (error.response.data.error) {
            setError({
              ...error,
              [error.response.data.error.key]: error.response.data.error.value
            })
          }

          // token has expired or revoked
          if (error.response.data.error.code === 'EAUTH') {
            NotificationManager.error('Oops! Sorry, something went wrong. Please try again later.')
          }
        }
      }
    })

    setIsLoading(false)
  }

  return (
    <div className='register'>
      <h2 className='register-heading'>register</h2>

      <form className='register-form' onSubmit={handleOnSubmit}>
        <label htmlFor='name'>name</label>
        <input
          id='name'
          name='name'
          type='text'
          value={form.name}
          onChange={handleOnChange}
          data-is-valid={error.name ? false : true}
          disabled={isLoading}
        />
        {error.name && <span className='invalid-msg'>{error.name}</span>}
        <label htmlFor='email'>email</label>
        <input
          id='email'
          name='email'
          type='text'
          value={form.email}
          onChange={handleOnChange}
          data-is-valid={error.email ? false : true}
          disabled={isLoading}
        />
        {error.email && <span className='invalid-msg'>{error.email}</span>}
        <label htmlFor='password'>password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={form.password}
          onChange={handleOnChange}
          data-is-valid={error.password ? false : true}
          disabled={isLoading}
        />
        {error.password && <span className='invalid-msg'>{error.password}</span>}
        <label htmlFor='confirm-password'>confirm password</label>
        <input
          id='confirm-password'
          name='confirmPassword'
          type='password'
          value={form.confirmPassword}
          onChange={handleOnChange}
          data-is-valid={error.confirmPassword ? false : true}
          disabled={isLoading}
        />
        {error.confirmPassword && <span className='invalid-msg'>{error.confirmPassword}</span>}
        <button className='register-btn dark-btn' disabled={isLoading}>
          create account
        </button>

        <Link to='/account/login' className='return-btn light-btn btn'>
          Return to Login
        </Link>
      </form>
    </div>
  )
}

export default Register
