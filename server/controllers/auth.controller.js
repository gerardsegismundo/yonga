//  AUTHENTICATION CONTROLLERS
//  Base URL: /api/auth

const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')
const { google } = require('googleapis')
const fetch = require('node-fetch')
const { OAuth2 } = google.auth

const User = require('../models/user.model')
const { sendEmail, createURL, hashPassword, capitalize } = require('../utils/')

const cookieOptions = {
  httpOnly: true,
  path: '/api/auth/access_token',
  expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000),
  secure: process.env.NODE_ENV === 'production' ? true : false
}

// @route   POST  /auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email, access_type: 'local' })

  if (userExists) {
    return res.status(403).json({
      error: {
        key: 'email',
        value: 'Account already exists.'
      }
    })
  }

  const capitalizedName = capitalize(name)

  const activationURL = createURL.activateAccount({
    name: capitalizedName,
    email,
    password: await hashPassword(password)
  })

  await sendEmail.createAccount({
    name: capitalizedName,
    sendTo: email,
    activationURL,
    cb: err => {
      if (err) return res.status(400).json({ msg: 'Register account failed.', error: err })

      res.status(200).json({ msg: 'Account confirmation link sent to email.' })
    }
  })
}

//  @route  POST  /auth/activate
exports.activate = async (req, res) => {
  const { activation_token } = req.body

  try {
    const user = jwt.verify(activation_token, process.env.JWT_SECRET_ACTIVATE)
    const userExists = await User.findOne({ email: user.email, access_type: 'local' })
    if (userExists) return res.status(400).json({ msg: 'User already exists.' })

    const newUser = new User({ ...user, access_type: 'local' })

    await newUser.save()

    res.status(201).json({ msg: 'Account has been created.' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

//  @route  POST  /auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email, access_type: 'local' })

  if (!user) {
    return res.status(400).json({
      error: { key: 'email', value: 'This email does not exist.' }
    })
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return res.status(401).json({
      error: {
        key: 'password',
        value: 'Your password is incorrect.'
      }
    })
  }

  const refresh_token = user.getRefreshToken()
  const access_token = user.getAccessToken()

  res.cookie('refreshToken', refresh_token, cookieOptions)

  res.json({
    refresh_token,
    access_token,
    expiresIn: process.env.JWT_EXPIRE_REFRESH
  })
}

// @route POST  /auth/google_login
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body

    const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

    const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

    const { email_verified, email, name, picture } = verify.payload
    if (!email_verified) return res.status(400).json({ msg: 'Email verification failed.' })

    const user = await User.findOne({ email, access_type: 'google' })

    let refresh_token
    let access_token

    if (!user) {
      const newUser = new User({
        name,
        email,
        avatar: {
          url: picture
        },
        access_type: 'google'
      })

      await newUser.save()

      refresh_token = newUser.getRefreshToken()
      access_token = newUser.getAccessToken()
    } else {
      refresh_token = user.getRefreshToken()
      access_token = user.getAccessToken()
    }

    res.cookie('refreshToken', refresh_token, cookieOptions)

    res.json({
      refresh_token,
      access_token,
      expiresIn: process.env.JWT_EXPIRE_REFRESH
    })
  } catch (error) {
    return res.status(500).json({ msg: err.message })
  }
}

//  @route   GET  /auth/access_token
exports.getAccessToken = async (req, res) => {
  const refresh_token = req.cookies.refreshToken

  if (!refresh_token) return res.status(401).json({ msg: 'User unauthorized.' })

  jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH, async (err, claims) => {
    if (err) return res.status(401).json({ msg: err.response })

    const user = await User.findById(claims.id)
    const access_token = user.getAccessToken()
    res.json({ access_token })
  })
}

//  @route   GET  /auth/currentuser
//  @access  PRIVATE
exports.getCurrentUser = async (req, res) => {
  const user = await (await User.findById(req.user.id).select('-password')).populate('orders').execPopulate()

  res.status(200).json({ user })
}

//  @route   POST   /auth/logout
exports.logout = async (req, res) => {
  res.clearCookie('refreshToken', cookieOptions)

  res.status(200).json({
    msg: 'User Logged out.'
  })
}

//  @route   POST   /auth/forgotpassword
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  }).select('name email _id')

  if (!user) {
    return res.status(404).json({ error: 'There is no user with that email.' })
  }

  const resetToken = user.getResetToken()

  const { name, email, _id } = user

  sendEmail.resetPassword({
    name,
    sentTo: email,
    resetUrl: createURL.resetPassword(_id, resetToken),
    cb: err => {
      if (err) return res.status(400).json({ msg: 'Reset password failed.', error: err })

      res.status(200).json({ msg: 'Reset link sent to email.' })
    }
  })
}

//  @route    GET   /auth/validatereset_token
exports.validateResetToken = async (req, res) => {
  if (!req.query || !req.query.reset_token) {
    return res.stauts(401).json({ msg: 'Reset token required.' })
  }

  const { reset_token } = req.query

  try {
    const decoded = jwt.verify(reset_token, process.env.JWT_SECRET_RESET)

    return res.json({ id: decoded.id })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Session timed out.' })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' })
    } else {
      return res.status(400).json({ error })
    }
  }
}

//  @route   DELETE  /auth/avatar/:public_id?
//  @access  PRIVATE
exports.deleteCurrentUser = async (req, res) => {
  const { public_id } = req.params

  if (public_id) {
    const avatarPublicId = `avatars/${public_id}`

    cloudinary.v2.uploader.destroy(avatarPublicId, error => {
      if (error) return res.status(400).json({ error })
    })
  }

  await User.findByIdAndDelete(req.user.id)

  console.log('DELETED!~')
  res.status(200).json({ msg: 'Account deleted.' })
}

//  @route    POST  /auth/resetpassword
exports.resetPassword = async (req, res) => {
  const { clientId, password } = req.body

  await User.findByIdAndUpdate(clientId, {
    password: await hashPassword(password)
  })

  res.json({ msg: 'Password updated.' })
}

//  @route  POST  /auth/facebook_login
exports.facebookLogin = async (req, res) => {
  try {
    const { accessToken, userID } = req.body

    const graphAPI = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
    const { name, email, picture } = await fetch(graphAPI).then(res => res.json())

    const user = await User.findOne({ email, access_type: 'facebook' })

    let refresh_token
    let access_token

    if (!user) {
      const newUser = new User({
        name,
        email,
        avatar: {
          url: picture.data.url
        },
        access_type: 'facebook'
      })

      await newUser.save()

      refresh_token = newUser.getRefreshToken()
      access_token = newUser.getAccessToken()
    } else {
      refresh_token = user.getRefreshToken()
      access_token = user.getAccessToken()
    }

    res.cookie('refreshToken', refresh_token, cookieOptions)

    res.json({
      refresh_token,
      access_token,
      expiresIn: process.env.JWT_EXPIRE_REFRESH
    })
  } catch (error) {
    res.status(500).json({ msg: 'Facebook graphAPI error.', error })
  }
}

//  @route  POST  /auth/twitter_login
exports.twitterLogin = async (req, res) => {}
