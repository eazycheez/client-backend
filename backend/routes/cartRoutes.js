const express = require('express')
const router = express.Router()

//Get the two methods from the controller
const { getCart, putItem } = require('../controller/cartController')

//Use the two methods to handle GET and PUT requests
router.route( '/:id' ).get(getCart).put(putItem)

module.exports = router