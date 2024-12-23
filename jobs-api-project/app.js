require('express-async-errors')
const express = require('express')
const app = express()
const {
  requestLogger,
  errorHandler,
  unknownendpoint,
  authorizationMiddleware,
} = require('./utils/middlewares')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

app.use(express.json())
// extra packages

app.use(requestLogger)
// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authorizationMiddleware, jobsRouter)

app.use(errorHandler)
app.use(unknownendpoint)

module.exports = app
