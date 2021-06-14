const router = require('express').Router()

const { optionalAuthentication } = require('../middleware/auth')
const { saveOrder, deleteOrder } = require('../controllers/order.controller')

router.post('/', optionalAuthentication, saveOrder)
router.delete('/', deleteOrder)

module.exports = router
