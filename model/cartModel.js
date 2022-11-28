
const mongoose = require('mongoose')

//Cart Schema
const cartSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },

    address: {
        type: String
    },

    items: [{
        itemid: {
            type: mongoose.SchemaTypes.ObjectId,
            ref : "Item"
        },
        count: {
            type: Number
        }
    }]

}, {
    timestamps: true
})

module.exports = mongoose.model( 'Cart', cartSchema )
