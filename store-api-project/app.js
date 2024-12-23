require('express-async-errors')
const express = require('express')
const app = express()
const productsRouter = require('./routes/products')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middlewares')

// middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(requestLogger)

// routes
app.get('/', (req, res) => {
  res.send('Hi Muhammad you are doing good')
})

// products routes
app.use('/api/v1/products', productsRouter)

app.use('*', unknownEndpoint)
app.use(errorHandler)
module.exports = app
