const mongoose = require('mongoose')

const orderProductSchema = new mongoose.Schema(
  {
    quantityOrdered: { 
      type: Number, 
      required: true ,
    },

    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true },
)

const OrderProduct = mongoose.model('OrderProduct', orderProductSchema)
module.exports = OrderProduct