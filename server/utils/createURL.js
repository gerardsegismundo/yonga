const jwt = require('jsonwebtoken')

const createURL = {
  activateAccount: ({ name, email, password }) => {
    const activationToken = jwt.sign({ name, email, password }, process.env.JWT_SECRET_ACTIVATE, {
      expiresIn: process.env.JWT_EXPIRE_ACTIVATE
    })

    return `${process.env.CLIENT_URL}/account/login/${activationToken}`
  },

  resetPassword: (id, resetToken) => {
    return `${process.env.CLIENT_URL}/account/resetpassword/${resetToken}`
  }
}

module.exports = createURL
