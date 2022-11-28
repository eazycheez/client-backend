
const mongoose = require('mongoose')
require('mongoose-type-url')

//Item Schema
const categoryScheme = mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },

    description: {
        type: String,
        required: true,
        maxLength : 400,
    },


    image: {
        type: String,
    }

})

module.exports = mongoose.model( 'Category', categoryScheme )