
const mongoose = require('mongoose')
require('mongoose-type-url')

//Item Schema
const itemSchema = mongoose.Schema({
    category:{
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Category"
    },
    name: { 
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },
    unit:{
        type: String,
        required : true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model( 'Item', itemSchema )