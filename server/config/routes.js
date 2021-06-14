const express = require('express')
// const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const cors = require('cors')
// const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

require('express-async-errors')

// Cloudinary env config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// Routes
const userRoute = require('../routes/user.routes')
const productRoute = require('../routes/product.routes')
const authRoute = require('../routes/auth.routes')
const orderRoute = require('../routes/order.routes')

// Initialization
module.exports = app => {
  // app.use(mongoSanitize())
  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  )
  app.use(cors())
  // app.use(xss())
  app.use(cookieParser())
  app.use(express.json({ extended: false }))
  app.use(
    fileUpload({
      useTempFiles: true
    })
  )

  app.use('/api/user', userRoute)
  app.use('/api/auth', authRoute)
  app.use('/api/product', productRoute)
  app.use('/api/order', orderRoute)
}
