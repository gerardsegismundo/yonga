const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    nonRegisteredUserDetails: {
      name: { type: String },
      companyName: { type: String },
      country: { type: String },
      houseNumAndStrtName: { type: String },
      apartment: { type: String },
      town: { type: String },
      postcode: { type: String },
      phone: { type: String },
      email: {
        type: String
      }
    },
    cartProducts: [
      {
        name: { type: String, required: true },
        imageURL: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    paymentMethod: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    addInfo: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
