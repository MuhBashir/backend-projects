const jwt = require('jsonwebtoken')

const login = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'password or username was wrong' })
  }
  const id = new Date().toString()
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.status(201).json({ msg: 'login successful', token })
}

const dashboard = (req, res) => {
  const token = req.token
  const luckyNumber = Math.floor(Math.random() * 100)
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  res.status(200).json({
    msg: `Hello, ${payload.username}`,
    secret: `Your lucky number is ${luckyNumber}`,
  })
}
module.exports = {
  login,
  dashboard,
}
