//Order controller to handle the CREATE request

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler') 
const Profile = require('../model/profileModel')
const Items = require('../model/itemModel')
const Orders = require('../model/orderModel')

//Method get the cart items if the id is valid using findOne() method
// GET /api/cart/placeorder/:id
const readOrder = asyncHandler( async (req, res) => {

    //Tries to get the cart details by ID..if successful, returns the item list with quantity and price as json object
    try{
        const { transcID, userID, items, address, deliveryCharges, totalPrice, status } = await Orders.findOne({ userID: req.params.id })
        res.status(200).json({ transcID, userID, items, address, deliveryCharges, totalPrice, status })
    }

    // If id is invalid, catch block throws the new error saying "Invalid ID"

    catch(err){
        res.status(400)
        throw new Error('Invalid User ID')
    }

})

//Method to store the transaction details
//POST /api/cart/placeorder/:id
const createOrder = asyncHandler( async (req, res) => {
    
    try{
       await Profile.findOne({ _id: req.params.id })
    }

    catch(err){
        throw new Error('Invalid ID')
    }

    try{
        const order = await Orders.create(req.body)
        res.status(200).send(order)
    }
    catch(err){
        throw new Error(err.message)
    }

})


module.exports = {
    readOrder,
    createOrder
}