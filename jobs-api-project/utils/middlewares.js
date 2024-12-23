const logger = require('./logger')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'MongoError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
  } else if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
  } else if (err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid id' })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid token' })
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something went wrong, please try again' })

  next(err)
}

const requestLogger = (req, res, next) => {
  logger.info(req.method, req.path, req.body)
  next()
}

const unknownendpoint = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('Route does not exist')
}

const authorizationMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' })
  }
  const token = authorization.substring(7)
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { userId: decodedToken.id, name: decodedToken.name }
    next()
  } catch (error) {
    next(error)
    // return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' })
  }
}

module.exports = {
  errorHandler,
  requestLogger,
  unknownendpoint,
  authorizationMiddleware,
}
