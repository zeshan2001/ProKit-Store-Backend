const mongoose = require('mongoose')
const userSchema = require('./User')
const productSchema = require('./Product')
const feedbackSchema = require('./Feedback')
const orderSchema = require('./Order')
const orderProductSchema = require('./OrderProduct')
const addressSchema = require('./Address')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Feedback = mongoose.model('Feedback', feedbackSchema)
const Order = mongoose.model('Order', orderSchema)
const OrderProduct = mongoose.model('OrderProduct', orderProductSchema)
const Address = mongoose.model('Address', addressSchema)

module.exports = {
  User,
  Product,
  Feedback,
  Order,
  OrderProduct,
  Address,
}