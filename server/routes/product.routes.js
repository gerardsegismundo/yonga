const router = require('express').Router()

const {
  getProducts,
  addComment,
  rateProduct,
  getProduct,
  updateComment,
  deleteComment
} = require('../controllers/product.controller')

const { protect } = require('../middleware/auth')

router.get('/', getProducts)
router.get('/:name', getProduct)
router.post('/:product_id/comment', protect, addComment)
router.post('/rating', protect, rateProduct)
router.patch('/:product_id/comment/:comment_id', protect, updateComment)
router.delete('/:product_id/comment/:comment_id', protect, deleteComment)

module.exports = router
