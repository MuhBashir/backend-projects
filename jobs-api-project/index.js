const app = require('./app')
const connectDB = require('./db/connect')
const { MONGODB_URI, PORT } = require('./utils/config')

console.log('connecting to mongodb...')

const start = async () => {
  try {
    await connectDB(MONGODB_URI)
    console.log('connected to mongodb...')

    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
