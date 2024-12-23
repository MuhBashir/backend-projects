const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

//register user
const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJwt()
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'user created successfully', user, token })
}

// login user
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide email and password' })
  }
  // get user from db
  const user = await User.findOne({ email })
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Invalid credentials' })
  }
  const isPasswordCorrect = await user.comparePassword(password)

  // check password

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Invalid credentials' })
  }
  // create token
  const token = user.createJwt()
  res
    .status(StatusCodes.OK)
    .json({ msg: 'User logged in successfully', user, token })
}

module.exports = {
  register,
  login,
}
