const { Feedback } = require('../models')
const { Product } = require('../models')

const feedbacks_index_get = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ product: req.params.product_id })
    if (feedbacks.length) {
      return res.status(200).send({ feedbacks: feedbacks })
    } else {
      return res.status(200).send({ msg: "No feedbacks" })
    }
    
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while fatching all feedback",
      error: error.message
    })
  }
}

const feedbacks_create_post = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.product_id)
    if (existingProduct) {
      const { comment, rate } = req.body
      const feedback = {
        customer: res.locals.payload.id,
        product: req.params.product_id,
        comment,
        rate: parseInt(rate)
      }
      const newFeedback = await Feedback.create(feedback)
      return res.status(400).send({ newFeedback: newFeedback, msg: "feedback is added" })
      
    } else {
      return res.status(400).send({ msg: "you can't add a feedback to a product that not exist!!" })
    }
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while creating a feedback",
      error: error.message
    })
  }
}

const feedbacks_delete_delete = async (req, res) => {
  try {
    const existingFeedback = await Feedback.findById(req.params.feedback_id)

    if (!existingFeedback) {
      return res.status(401).send({ msg: "feedback not found!" })
    }
    if (!existingFeedback.customer.equals(res.locals.payload.id)) {
      return res.status(401).send({ msg: "you don't have access to delete the feedback" })
    }
    await existingFeedback.deleteOne()
    return res.status(200).send({ msg: "feedback is deleted siccessfully" })

  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while deleting a feedback",
      error: error.message
    })
  }
}

module.exports = {
  feedbacks_index_get,
  feedbacks_create_post,
  feedbacks_delete_delete,
}