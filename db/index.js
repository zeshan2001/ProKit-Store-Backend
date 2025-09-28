const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Successfully connected to MongoDB . . .")
}).catch((error) => {
  console.log("Connection error", error.message)
})

const db = mongoose.connection
module.exports = db