const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

// Protect routes
exports.protect = async (req, res, next) => {
  if (!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ error: { msg: 'Not authorized to access this route' } })
  }

  // Set token from Bearer token in header
  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS)

    req.user = await User.findById(decoded.id)

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Session timed out.' })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' })
    } else {
      return res.status(400).json({ error })
    }
  }
}

exports.optionalAuthentication = (req, _res, next) => {
  if (!req.headers.authorization) return next()

  this.protect(req, _res, next)
}
