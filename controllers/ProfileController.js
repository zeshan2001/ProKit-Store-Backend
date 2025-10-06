const { User } = require('../models')


const profile_show_get = async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.user_id)
    if (userInfo) {
      return res.status(200).send({
        image: userInfo.image,
        name: userInfo.name,
      })
    } else {
      return res.status(401).send({ status: "Error", msg: "User not found" })
    }
  } catch (error) {
    res.status(400).send({
      status: 'Error',
      msg: 'An error has occured while fatching user info',
      error: error.message
    })
  }
}

const profile_update_put = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    if (user._id.equals(res.locals.payload.id)) {
      const { image, name } = req.body
      await User.findByIdAndUpdate(
        user._id,
        {
          image,
          name
        }
      )
      return res.status(200).send({ msg: "User profile updated successfully" })

    } else {
      return res.status(401).send({
              status: 'Error',
              msg: "you don't have access to  update",
            })
    }

  } catch (error) {
    res.status(400).send({
      status: 'Error',
      msg: 'An error has occured while fatching user info',
      error: error.message
    })
  }
}

module.exports = {
  profile_show_get,
  profile_update_put,
}