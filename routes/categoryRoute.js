const express = require('express')
const router = express.Router()

const { readCategory, createCategory , updateCategory} = require('../controller/categoryController.js')

//Use the Three methods to handle GET and PUT & PATCH requests
router.route( '/' ).get(readCategory)
router.route('/:id').patch(updateCategory)
router.route("/").post(createCategory)

module.exports = router