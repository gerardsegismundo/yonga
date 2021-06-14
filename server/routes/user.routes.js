const router = require('express').Router()

const { updateUser, uploadAvatar } = require('../controllers/user.controller')

const { protect } = require('../middleware/auth')
const validateImage = require('../middleware/validateImage')

// User details
router.post('/update', protect, updateUser)
router.post('/upload_avatar', protect, validateImage, uploadAvatar)

module.exports = router
