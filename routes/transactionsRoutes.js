const express = require('express')
const router = express.Router()

//Get the one method from the controller
const { readTransactions } = require('../controller/transactionsController')

//Use the one method to handle GET request
router.route( '/' ).get(readTransactions)

module.exports = router