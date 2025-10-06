const { Product } = require('../models')

const products_index_get = async (req, res) => {
  try {
    const products = await Product.find()
    if (products.length) {
      return res.status(200).send({ products: products })
    } else {
      return res.status(200).send({ msg: "You have empty products" })
    }
    
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while fatching all product",
      error: error.message
    })
  }
}

const products_create_post = async (req, res) => {
  try {
    if (res.locals.payload.role === "admin") {
      const { image, name, description, price, quantity, size, kit, category } = req.body
      const product = {
        image,
        name,
        description,
        price : parseFloat(price),
        quantity : parseInt(quantity),
        size,
        kit,
        category
      }
      const newProduct = await Product.create(product)
      return res.status(200).send({ newProduct: newProduct, msg: "New product added" })
      
    } else {
      return res.status(401).send({
        msg: "You don't have access to add a product"
      })
    }

  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while creating a new product",
      error: error.message
    })
  }
}

const products_show_get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id)
    res.status(200).send({ product: product })
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while fatching a product",
      error: error.message
    })
  }
}

const products_update_put = async (req, res) => {
  try {
    if (res.locals.payload.role === "admin") {
      const { image, name, description, price, quantity, size, kit, category } = req.body
      const product = {
        image,
        name,
        description,
        price : parseFloat(price),
        quantity : parseInt(quantity),
        size,
        kit,
        category
      }
      const newProduct = await Product.findByIdAndUpdate(
        req.params.product_id,
        product,
        { new: true }
      )
      return res.status(200).send({ newProduct: newProduct, msg: "The product is updated!" })
      
    } else {
      return res.status(401).send({
        msg: "You don't have access to add a product"
      })
    }
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while fatching a product",
      error: error.message
    })
  }
}

const products_delete_delete = async (req, res) => {
  try {
    if (res.locals.payload.role === "admin") {
      const deletedProduct = await Product.findByIdAndDelete(req.params.product_id)
      if (deletedProduct) {
        return res.status(200).send({ msg: "Product is deleted siccessfully" })
      } else {
        return res.status(200).send({ msg: "The product you're deleting is not exist" })
      }
    } else {
      return res.status(401).send({ msg: "You don't have access to delete a product" })
    }
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while deleting a product",
      error: error.message
    })
  }
}


module.exports = {
  products_index_get,
  products_create_post,
  products_show_get,
  products_update_put,
  products_delete_delete,
}