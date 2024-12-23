const app = require('./app')
const connectDB = require('./db/connect')
const mongoose = require('mongoose')
const { PORT, MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')

// connection to the database
mongoose.set('strictQuery', false)

logger.info('connecting to the database...')

connectDB(MONGODB_URI).then(() => {
  logger.info('connected to the database')
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
})
