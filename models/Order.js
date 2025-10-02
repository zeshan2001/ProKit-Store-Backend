const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    paymentMethode: { 
      type: String, 
      required: true, 
      enum: ['creditCard', 'debitCard'], 
    },
    status: { 
      type: String, 
      required: true, 
      enum: ['processing', 'delivered'], 
    },
    tax: { 
      type: Number, 
      required: true, 
    },
    totalPrice: { 
      type: Number, 
      required: true, 
    },

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true, },
  },
  { timestamps: true },
)

module.exports = orderSchema