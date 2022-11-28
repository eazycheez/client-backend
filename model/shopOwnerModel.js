
const mongoose = require('mongoose')

//Shop Owner Profile Schema
const profileSchema = mongoose.Schema({
    shopOwnerId: {
        type: String,
        unique: true
    },
    
    username: { 
        type: String,
        minLength: 3,
        maxLength: 20
    },

    phone: {
        type: String,
        minLength : 10,
        maxLength : 10
    }

}, {
    timestamps: true
})

module.exports = mongoose.model( 'ShopOwnerProfile', profileSchema )