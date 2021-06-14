const express = require('express')
const app = express()
const connectDB = require('./config/db')
const path = require('path')
require('colors')

//  ENV variables
require('dotenv').config()

//  Database connection
connectDB()

//  Routes
require('./config/routes')(app)

// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (_req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))

//   app.use(express.static(path.join(__dirname, 'client/build')))
// }

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening to port ${PORT}`.yellow.bold))
