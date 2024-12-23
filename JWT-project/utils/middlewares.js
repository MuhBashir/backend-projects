const logger = require('./logger')

const errorHandler = async (error, req, res, next) => {
  logger.error(error.message)
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ msg: 'Not authorized to access this route' })
  }
  next(error)
}

const requestLogger = (req, res, next) => {
  logger.info(req.method, req.url, req.body)
  next()
}

const unknownEndPoint = (req, res, next) => {
  res
    .status(401)
    .json({ message: 'The resource you were looking for was not found' })
}

const tokenExractor = (req, res, next) => {
  const { authorization } = req.headers

  const token =
    authorization && authorization.startsWith('Bearer ')
      ? authorization.substring(7)
      : null
  req.token = token

  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndPoint,
  tokenExractor,
}
