const Order = require('../models/order.model')

exports.saveOrder = async (req, res) => {
  const { checkOutDetails, nonRegisteredUserDetails } = req.body
  const { cartProducts, paymentMethod, totalPrice, addInfo } = checkOutDetails

  const newOrder = new Order({
    user: req.user ? req.user._id : null,
    nonRegisteredUserDetails,
    cartProducts,
    paymentMethod,
    totalPrice,
    addInfo
  })

  const result = await newOrder.save()

  console.log(result)

  res.json(result)
}

exports.deleteOrder = async (req, res) => {}
