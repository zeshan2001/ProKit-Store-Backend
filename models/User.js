const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, default: "customer", enum: ['customer', 'admin'], required: true }
  },
  {
    timestamps: true,
  }
)

module.exports = userSchema