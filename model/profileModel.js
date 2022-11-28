
const mongoose = require('mongoose')

//Profile Schema
const profileSchema = mongoose.Schema({
    uid: {
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

module.exports = mongoose.model( 'Profile', profileSchema )