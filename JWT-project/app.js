require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const router = require('./routes/main')
const {
  errorHandler,
  requestLogger,
  unknownEndPoint,
} = require('./utils/middlewares')

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(requestLogger)

// routes
app.use('/api/v1', router)

app.use(unknownEndPoint)
app.use(errorHandler)
module.exports = app
