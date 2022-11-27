const express = require('express')
const router = express.Router()

//Get the two methods from the controller
const { getProfile, updateProfile } = require('../controller/profileController')

//Use the two methods to handle GET and PUT requests
router.route( '/:id' ).get(getProfile).put(updateProfile)

module.exports = router