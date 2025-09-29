const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
  {
    city: { 
      type: String, 
      required: true, 
    },
    block: { 
      type: String, 
      required: true, 
    },
    road: { 
      type: String, 
      required: true, 
    },
    home: { 
      type: String, 
    },
    building: { 
      type: String, 
    },
    flat: { 
      type: String, 
    },

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  },
  { timestamps: true }
)

const Address = mongoose.model('Address', addressSchema)
module.exports = Address