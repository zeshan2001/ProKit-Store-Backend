const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL'],
      required: true,
    },
    kit: {
      type: String,
      enum: ['home', 'away'],
      required: true,
    },
    category: {
      type: String,
      enum: ['national', 'club'],
      required: true,
    },
  },
  { timestamps: true }
  )

  const Product = mongoose.model('Product', productSchema)
  module.exports = Product