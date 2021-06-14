import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '../redux/actions'
import { progress, removeErrorOnChange } from '../utils/helpers/'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    email: '',
    password: ''
  })

  const clearError = () =>
    setError({
      email: '',
      password: ''
    })

  const clearForm = () => {
    setForm({
      email: '',
      password: ''
    })
  }

  const handleOnChange = e => {
    removeErrorOnChange(e, error, setError)

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // local login
  const handleOnSubmit = e => {
    e.preventDefault()
    clearError()

    if (!form.email || !form.password) {
      return setError({
        password: !form.password && 'Password is required.',
        email: !form.email && 'Email is required.'
      })
    }

    setIsLoading(true)
    progress(async () => {
      try {
        const { data } = await axios.post('/auth/login', form)

        dispatch(login(data))

        clearForm()
      } catch (error) {
        if (error.response.data.error) {
          setError({
            ...error,
            [error.response.data.error.key]: error.response.data.error.value
          })
        }

        return
      }
    })

    setIsLoading(false)
  }

  return (
    <form className='login-form' onSubmit={handleOnSubmit}>
      <label htmlFor='email'>email</label>

      <input
        id='email'
        type='text'
        name='email'
        value={form.email}
        onChange={handleOnChange}
        disabled={isLoading}
        data-is-valid={error.email ? false : true}
      />
      {error.email && <span className='invalid-msg'>{error.email}</span>}

      <label htmlFor='password'>password</label>
      <input
        id='password'
        type='password'
        name='password'
        value={form.password}
        onChange={handleOnChange}
        disabled={isLoading}
        data-is-valid={error.password ? false : true}
      />
      {error.password && <span className='invalid-msg'>{error.password}</span>}

      <Link to='/account/forgotpassword'>Forgot password?</Link>
      <button type='submit' className='login-btn dark-btn btn' disabled={isLoading}>
        log in
      </button>
    </form>
  )
}

export default LoginForm
