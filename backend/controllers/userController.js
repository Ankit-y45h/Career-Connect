const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email,name: user.name, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password,name} = req.body

  try {
    const user = await User.signup(email, password,name)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email,name, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }