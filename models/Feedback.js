const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    comment: { type: String },
    rate: {type: Number, enum: [1, 2, 3, 4, 5]},
  },
  { timestamps: true }
  )

  module.exports = feedbackSchema