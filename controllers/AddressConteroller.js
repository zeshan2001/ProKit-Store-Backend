const { Address } = require('../models')

const address_index_get = async (req, res) => {
  try {
    const addresses = await Address.find({ customer: res.locals.payload.id })
    if (addresses.length) {
      return res.status(200).send({ addresses: addresses })
    } else {
      return res.status(200).send({ msg: "You have no addresses" })
    }
    
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while fatching all addresses",
      error: error.message
    })
  }
}
const address_create_post = async (req, res) => {
  try {
    const { city, block, road, home, building, flat } = req.body
    const address = {
      city,
      block,
      road,
      home,
      building,
      flat,
      customer: res.locals.payload.id
    }
    const newAddress = await Address.create(address)
    return res.status(200).send({ newAddress: newAddress, msg: "New address added" })

  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while creating a new address",
      error: error.message
    })
  }
}
const address_update_put = async (req, res) => {
  try {
    const existingAddress = await Address.findById(req.params.address_id);
    if (!existingAddress) {
      return res.status(404).send({ msg: "Address not found!" });
    }
    if (!existingAddress.customer.equals(res.locals.payload.id)) {
      return res.status(403).send({ msg: "You don't have access to update this address" });
    }
    const { city, block, road, home, building, flat } = req.body
    const newAddress = {
      city,
      block,
      road,
      home,
      building,
      flat,
      customer: res.locals.payload.id
    }

    // Perform update
    await existingAddress.updateOne({ $set: newAddress });

    return res.status(200).send({ msg: "Address updated successfully" });

  } catch (error) {
    res.status(500).send({
      status: "Error",
      msg: "An error occurred while updating the address",
      error: error.message
    });
  }
};

const address_delete_delete = async (req, res) => {
  try {
    const existingAddress = await Address.findById(req.params.address_id)

    if (!existingAddress) {
      return res.status(401).send({ msg: "address not found!" })
    }
    if (!existingAddress.customer.equals(res.locals.payload.id)) {
      return res.status(401).send({ msg: "you don't have access to delete the address" })
    }
    await existingAddress.deleteOne()
    return res.status(200).send({ msg: "address is deleted successfully" })

  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "An error has occured while deleting a address",
      error: error.message
    })
  }
}

module.exports = {
  address_index_get,
  address_create_post,
  address_update_put,
  address_delete_delete,
}