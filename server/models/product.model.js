const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: Array,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },

    comments: [
      {
        comment: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    ratings: [
      {
        rating: { type: Number, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        }
      }
    ],

    totalRating: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', ProductSchema)
// const CommentSchema = mongoose.Schema({
//   comment: { type: String, required: true },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// })

// module.exports = mongoose.model('Comment', ProductSchema)
