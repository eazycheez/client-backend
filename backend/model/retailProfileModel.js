const { number, any } = require('joi')
const mongoose = require('mongoose')

//Profile Schema
const retailProfileSchema = mongoose.Schema({
    
    username: { 
        type: String,
        minLength: 3,
        maxLength: 20,
        default: null
    },

    phone: {
        type: Number,
        minLength : 10,
        maxLength : 10
    },

    storeaddress:{
        type: String,
        minLength: 5,
        maxLength: 250
    },

    storecategory:{
        type: String,
        minLength: 0,
        maxLength: 20
    }

}, {
    timestamps: true
})

module.exports = mongoose.model( 'retailProfile', retailProfileSchema )