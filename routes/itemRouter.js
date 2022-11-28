const express = require('express')
const router = express.Router()

const { readItem,createItem,updateItem,deleteItem} = require('../controller/itemController.js')

router.route( '/:id' ).get(readItem)
router.route('/').post(createItem)
router.route('/:id').patch(updateItem)
router.route('/:id').delete(deleteItem)

module.exports = router