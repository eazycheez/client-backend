const express = require('express')
const router = express.Router()

//Get the two methods from the controller
const { getretailProfile, updateretailProfile } = require('../controller/retailProfileController')

//Use the two methods to handle GET and PUT requests
router.route( '/:id' ).get(getretailProfile).put(updateretailProfile)

module.exports = router