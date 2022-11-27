
const mongoose = require('mongoose')

//Shop Owner Profile Schema
const profileSchema = mongoose.Schema({
    
    username: { 
        type: String,
        minLength: 3,
        maxLength: 20,
        default: null
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