const mongoose = require('mongoose')
const app = require('./app')
const logger = require('./utils/logger')
const { PORT } = require('./utils/config')
const { MONGODB_URI } = require('./utils/config')

mongoose.set('strictQuery', false)

logger.info('connecting to the database')
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info('connected to the database')
    app.listen(PORT, () => logger.info(`server is listening on port ${PORT}`))
  })
  .catch((error) => {
    logger.error('error connecting to the database:', error.message)
  })
