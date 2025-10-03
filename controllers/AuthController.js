const { User } = require('../models')
const middleware = require('../middleware/index')

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body
    let hashedPassword = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })
    let userInfo = {
      email,
      hashedPassword,
      name: "",
      image: "",
    }

    if (existingUser) {
      res.status(400).send("A user with that email has already been registered!")
    } else {
      const user = await User.create(userInfo)
      res.status(200).send({ user })
    }

  } catch (error) {
    throw error
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(password, user.hashedPassword)

    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      }
      let token = middleware.createToken(payload)
      return res.status(200).send({ payload, token })
    }
    res.status(401).send({ status: 'Error', msg: "email or password doesn't match" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

module.exports = {
  signUp,
  signIn,
}