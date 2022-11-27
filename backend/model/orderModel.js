
const mongoose = require('mongoose')
const Profile = require('./profileModel')
const Items = require('./itemModel')
const ShopOwnerProfile = require('./shopOwnerModel')


//Item Schema
const orderSchema = mongoose.Schema({

    shopOwnerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: ShopOwnerProfile
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Profile
    },

    items: [{
        itemID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Items
        },

        name: {
            type: String
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