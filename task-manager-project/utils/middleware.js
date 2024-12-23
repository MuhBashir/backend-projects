const logger = require('../utils/logger')
const requestLogger = (req, res, next) => {
  logger.info(req.method, req.url, req.body)
  next()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    logger.error(error.message)
    return res.status(401).json({
      error: error.message,
    })
  } else if (error.name === 'SyntaxError') {
    logger.error(error.message)
    return res.status(400).json({
      error: error.message,
    })
  } else if (error.name === 'CastError') {
    return res.status(400).json({
      error: 'malformatted id',
    })
  }
  next(error)
}

const unknownEndPoints = (req, res) => {
  res.status(404).json({
    message: 'unknown end point',
  })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndPoints,
}
