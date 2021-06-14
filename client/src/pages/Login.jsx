import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

import LoginForm from '../components/LoginForm'
import { NotificationManager } from 'react-notifications'
import { useSelector } from 'react-redux'

import { login } from '../redux/actions'
import { activateAccount, progress } from '../utils/helpers'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const { activation_token } = useParams()
  const isAuthenticated = useSelector(({ user }) => user.isAuthenticated)

  const handleOnFailure = response => {
    NotificationManager.error('Something went wrong.', response, 3000)
  }

  const handleGoogleLogin = async ({ tokenId }) => {
    progress(async () => {
      try {
        const { data } = await axios.post('/auth/google_login', { tokenId })

        dispatch(login(data))
      } catch (err) {
        if (err.response.data.msg) {
          NotificationManager.error(err.response.data.msg, 'Error', 3000)
        }
      }
    })
  }

  const handleFacebookLogin = async ({ accessToken, userID }) => {
    progress(async () => {
      try {
        const { data } = await axios.post('/auth/facebook_login', { accessToken, userID })

        dispatch(login(data))
      } catch (err) {
        if (err.response.data.msg) {
          NotificationManager.error(err.response.data.msg, 'Error', 3000)
        }
      }
    })
  }

  const handleTwitterLogin = () => {
    NotificationManager.warning('Feature not available yet.', 'Sorry', 3000)
  }

  useEffect(() => {
    if (activation_token) activateAccount(activation_token)
  }, [activation_token])

  useEffect(() => {
    if (isAuthenticated) history.push('/account/dashboard')
  }, [history, isAuthenticated])

  return (
    <div className='login'>
      <h2 className='login-heading'>log in</h2>

      <LoginForm />

      <div className='container'>
        <p className='register-msg'>If you have not created an account yet, please register here.</p>
        <Link to='/account/register' className='register-btn light-btn btn'>
          Create an account
        </Link>

        <p className='social-login-msg'>Or log In using</p>
        <div className='social-login-icons'>
          <FacebookLogin
            appId={process.env.REACT_APP_FB_APP_ID}
            fields='name,email,picture'
            callback={handleFacebookLogin}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button onClick={renderProps.onClick}>
                <i className='fa fa-facebook' />
              </button>
            )}
          />

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick}>
                <i className='fa fa-google' />
              </button>
            )}
            onSuccess={handleGoogleLogin}
            onFailure={handleOnFailure}
            cookiePolicy={'single_host_origin'}
          />
          <button onClick={handleTwitterLogin}>
            <i className='fa fa-twitter' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
