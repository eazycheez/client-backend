
const mongoose = require('mongoose')

//Item Schema
const orderSchema = mongoose.Schema({

    shopOwnerId:{
        type: String
    },

    uid: {
        type: String
    },

    items: [{
        itemid: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Item"
        },

        count: {
            type: Number
        },

        price: {
            type: Number
        }

    }],

    deliveryAddress: {
        type: String,
        min: 5,
        max: 250
    },

    deliveryCharges: {
        type: Number
    },

    totalPrice: {
        type: Number
    },

    status: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model( 'Orders', orderSchema )