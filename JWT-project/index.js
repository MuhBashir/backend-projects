const app = require('./app')
const PORT = process.env.PORT || 3001

const strat = () => {
  app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
  })
  try {
  } catch (error) {
    console.log(error.message)
  }
}

strat()
