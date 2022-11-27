
const mongoose = require('mongoose')
const Item = require('./itemModel')

//Item Schema
const cartSchema = mongoose.Schema({
    userID: {
        Type: String
    },

    address: {
        Type: String
    },

    items: [{
        itemID: {
            type : mongoose.Schema.Types.ObjectId,
            ref : Item
        },
        count: {
            type: Number
        }
    }]

}, {
    timestamps: true
})

module.exports = mongoose.model( 'Cart', cartSchema )
