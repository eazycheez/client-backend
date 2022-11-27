//Order controller to handle the CREATE request

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler') 
const Category = require('../model/categoryModel.js')

//Method get the cart items if the id is valid using findOne() method
// GET /api/cart/placeorder/:id
const readCategory = asyncHandler( async (req, res) => {

        const categories = await Category.find()
        res.status(200).send(categories)
})


const createCategory = asyncHandler( async (req, res) => {
    try{
        const category = await Category.create(req.body)
        res.status(200).send(category)
    }
    catch(err){
        throw new Error(err.message)
    }

})

const updateCategory = asyncHandler( async (req, res) => {
    
    const category = await Category.findByIdAndUpdate({ _id: req.params.id} , {name: req.body.name,   description: req.body.description, image: req.body.image},{returnOriginal: false} )
    res.send(category)
},)





module.exports = {
    readCategory,
    createCategory,
    updateCategory,
}