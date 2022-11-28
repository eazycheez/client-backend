const express = require('express')
const router = express.Router()

//Get the one method from the controller
const { readOrder, createOrder } = require('../controller/orderController')

//Use the one method to handle GET request
router.route( '/' ).get(readOrder).post(createOrder)

module.exports = router