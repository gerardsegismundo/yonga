const products = require('./_data/products')
const Product = require('./models/product.model')
const User = require('./models/user.model')
const Order = require('./models/order.model')
const connectDB = require('./config/db')

require('dotenv').config()
require('colors')

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()

    await Product.insertMany(products)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Order.deleteMany()
    await Product.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
