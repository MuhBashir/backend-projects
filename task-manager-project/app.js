const express = require('express')
const app = express()
require('express-async-errors')
const tasksRouter = require('./routes/tasks')
const {
  errorHandler,
  unknownEndPoints,
  requestLogger,
} = require('./utils/middleware')

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(requestLogger)

app.use('/api/v1/tasks', tasksRouter)

app.use(errorHandler)
app.use('*', unknownEndPoints)

module.exports = app
