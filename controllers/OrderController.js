const { Order } = require('../models')
const { OrderProduct } = require('../models')
const { Product } = require('../models')
const { Address } = require('../models')

const order_index_get = async (req, res) => {
  try {
    const orders = await Order.find({ customer: res.locals.payload.id })
    if (orders.length) {
      return res.status(200).send({ orders: orders })
    } else {
      return res.status(404).send({ msg: "You have no orders" })
    }
    
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while fatching all orders",
      error: error.message
    })
  }
}
const order_create_post = async (req, res) => {
  try {
    const { paymentMethode, totalPrice, address_id, quantityOrdered } = req.body

    const existingAddress = await Address.findOne({ _id:address_id })
    const existingProduct = await Product.findOne({ _id:req.params.product_id })

    if (!existingAddress) {
      return res.status(404).send({ msg: "address not found!!" })
    }
    if (!existingProduct) {
      return res.status(404).send({ msg: "product not found!!" })
    }
    const order = {
      paymentMethode,
      status: "processing",
      tax: 10,
      totalPrice: parseFloat(totalPrice),
      customer: res.locals.payload.id,
      address: existingAddress._id.toString()
    }

    const newOrder = await Order.create(order)
    const orderProduct = {
      quantityOrdered: parseInt(quantityOrdered),
      order: newOrder._id.toString(),
      product:existingProduct._id.toString()
    }
    const newOrderProduct = await OrderProduct.create(orderProduct)

    return res.status(200).send({ newOrder: newOrder, newOrderProduct: newOrderProduct, msg: "New order added" })

  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while creating a new order",
      error: error.message
    })
  }
}
const order_update_put = async (req, res) => {
  try {
    const existingOrder = await Order.findById(req.params.order_id)
    if (!existingOrder) {
      return res.status(404).send({ msg: "Order not found!" });
    }
    if (!existingOrder.customer.equals(res.locals.payload.id)) {
      return res.status(403).send({ msg: "You don't have access to update this order" });
    }

    const { status } = req.body
    // Perform update
    await existingOrder.updateOne({ $set: { status } });

    return res.status(200).send({ msg: "order state is updated successfully" });

  } catch (error) {
    res.status(500).send({
      status: "Error",
      msg: "An error occurred while updating the order",
      error: error.message
    });
  }
}

const order_delete_delete = async (req, res) => {
  try {
    const existingOrder = await Order.findById(req.params.order_id)

    if (!existingOrder) {
      return res.status(404).send({ msg: "order not found!" })
    }
    if (!existingOrder.customer.equals(res.locals.payload.id)) {
      return res.status(403).send({ msg: "you don't have access to delete the order" })
    }

    const existingOrderProduct = await OrderProduct.findOne({ order: existingOrder._id })

    await existingOrderProduct.deleteOne()
    await existingOrder.deleteOne()

    return res.status(200).send({ msg: "order is deleted successfully" })

  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while deleting a order",
      error: error.message
    })
  }
}

module.exports = {
  order_index_get,
  order_create_post,
  order_update_put,
  order_delete_delete,
}