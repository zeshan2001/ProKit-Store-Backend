const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], required: true }
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User