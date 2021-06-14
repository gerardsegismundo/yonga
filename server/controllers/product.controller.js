/**
 *    PRODUCTS CONTROLLER
 *    Base URL: /api/product
 */

const Product = require('../models/product.model')

//  * GET  ->  /
exports.getProducts = async (req, res) => {
  const products = await Product.find()

  res.status(200).json({ products })
}

//  * GET  ->  /:name
exports.getProduct = async (req, res) => {
  const product = await Product.findOne({ name: req.params.name }).populate({
    path: 'comments',
    populate: { path: 'user', select: 'name avatar.url' }
  })

  if (!product) res.status(404).json({ msg: 'Product not found.' })

  res.status(200).send(product)
}

//  * POST  ->  /rating
//  * Private
exports.rateProduct = async (req, res) => {
  const { rating, productId } = req.body

  const product = await Product.findById(productId)

  if (!product) return res.status(404).json({ msg: 'Product not found.' })

  const ratingIndex = product.ratings.findIndex(r => r.user.toString() === req.user._id.toString())

  const newRating = {
    rating,
    user: req.user._id
  }

  // If already rated
  if (ratingIndex !== -1) {
    product.ratings = [...product.ratings.slice(0, ratingIndex), newRating, ...product.ratings.slice(ratingIndex + 1)]
  } else {
    product.ratings.push(newRating)
  }

  product.totalRating = product.ratings.reduce((acc, p) => p.rating + acc, 0) / product.ratings.length

  await product.save()

  res.status(201).json({
    msg: 'Resource updated successfully.',
    numberOfRatings: product.ratings.length,
    ratings: product.ratings,
    totalRating: product.totalRating
  })
}

//  * POST  ->  /:product_id/comment
//  * Private
exports.addComment = async (req, res) => {
  const product = await Product.findById(req.params.product_id)

  if (!product) return res.status(404).json({ message: 'Product not found' })

  const alreadyCommented = product.comments.find(r => r.user.toString() === req.user._id.toString())

  if (alreadyCommented) {
    return res.status(400).json({ message: 'You have already commented on this product.' })
  }

  product.comments.push({
    comment: req.body.comment,
    user: req.user._id
  })

  const result = await product.save()

  const { _id, comment, user, createdAt } = result.comments[result.comments.length - 1]

  const newComment = {
    _id,
    comment,
    user: {
      _id: user,
      avatar: req.user.avatar,
      name: req.user.name
    },
    createdAt
  }

  res.status(201).json({ newComment })
}
//  * PATCH ->  /:product_id/comment/:comment_id
//  * Private
exports.updateComment = async (req, res) => {
  const { product_id, comment_id } = req.params

  const { comments } = await Product.findById(product_id).select('comments')

  const commentIndex = comments.findIndex(c => c._id.toString() === comment_id)

  if (commentIndex < 0) {
    return res.status(404).json({ msg: `No comment with the id of ${req.user._id}` })
  }

  if (!comments[commentIndex].user._id === req.user._id) {
    return res.status(401).json({ msg: 'Not authorized to update comment.' })
  }

  const updatedComment = comments[commentIndex]
  updatedComment.comment = req.body.comment

  const result = await Product.findByIdAndUpdate(
    product_id,
    { comments: [...comments.slice(0, commentIndex), updatedComment, ...comments.slice(commentIndex + 1)] },
    { new: true }
  )

  res.json({
    comment: result.comments[commentIndex].comment,
    commentIndex
  })
}

//  * DELETE ->  :product_id/comment/:comment_id
//  * Private
exports.deleteComment = async (req, res) => {
  const { product_id, comment_id } = req.params

  const { comments } = await Product.findById(product_id).select('comments')

  const deletedComment = comments.filter(c => c._id.toString() === comment_id)

  if (!deletedComment) {
    return res.status(404).json({ msg: 'Comment not found.' })
  }

  if (deletedComment.user && deletedComment.user.toString() !== req.user._id) {
    return res.status(401).json({ msg: 'Unauthorized to remove comment.' })
  }

  await Product.findByIdAndUpdate(product_id, {
    comments: [...comments.filter(c => c._id.toString() !== comment_id)]
  })

  res.json({ comment_id })
}
