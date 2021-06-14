const router = require('express').Router()

const { protect } = require('../middleware/auth')
const {
  register,
  activate,
  login,
  getAccessToken,
  logout,
  getCurrentUser,
  forgotPassword,
  validateResetToken,
  resetPassword,
  googleLogin,
  facebookLogin,
  twitterLogin,
  deleteCurrentUser
} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/activate', activate)
router.post('/login', login)
router.post('/currentuser', protect, getCurrentUser)
router.get('/access_token', getAccessToken)
router.post('/forgotpassword', forgotPassword)
router.get('/validatereset_token', validateResetToken)
router.post('/resetpassword', resetPassword)
router.get('/logout', logout)
router.delete('/avatars/:public_id?', protect, deleteCurrentUser)

router.post('/google_login', googleLogin)
router.post('/facebook_login', facebookLogin)
router.post('/twitter_login', twitterLogin)

module.exports = router
