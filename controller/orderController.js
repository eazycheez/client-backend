//Order controller to handle the CREATE request

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler') 
const Profile = require('../model/profileModel')
const Orders = require('../model/orderModel')
const Cart = require('../model/cartModel')
const Items = require('../model/itemModel')
const Joi = require('joi')

//Method get the cart items if the id is valid using findOne() method
// GET /api/placeorder
const readOrder = asyncHandler( async (req, res) => {

    const result = validateForGET(req.body)

    if(result){
        res.status(400)
        throw new Error(result.details[0].message)
    }

    //Tries to get the cart details by ID..if successful, returns the item list with quantity and price as json object
    let order
    try{
        order = await Orders.findById({ _id: req.body.orderid },
            { shopOwnerId: 1, uid: 1, items: 1, deliveryAddress: 1, deliveryCharges: 1, totalPrice: 1, status: 1, _id: 0},
            {lean: true})
        
        if(!order) throw new Error('Invalid Order ID')
        
        order.orderid = req.body.orderid
    }
    // If id is invalid, catch block throws the new error saying "Invalid ID"

    catch(err){
        res.status(400)
        throw new Error(err.message)
    }

    // Fetches the name from the Items collection for every item reference stored in the order
    for(let i = 0; i < order.items.length; i++){
        try{
            const { name } = await Items.findOne({ _id: order.items[i].itemid }, {name: 1, _id: 0})
              
            order.items[i].name = name
            delete order.items[i]._id
        }
        catch(err){
            res.status(400)
            throw new Error(err.message)
        }
    }

    res.status(200).send(order)

})

//Method to store the transaction details
//POST /api/placeorder
const createOrder = asyncHandler( async (req, res) => {
    
    //Joi validation of req.body
    const result = validateForPOST(req.body)

    if(result){
        res.status(400)
        throw new Error(result.details[0].message)
    }

    try{
       const profile = await Profile.findOne({ uid: req.uid })
       if(!profile) throw new Error('Invalid uid')
    }

    catch(err){
        throw new Error(err.message)
    }

    try{
        //Create the order
        const order = req.body
        order.uid = req.uid
        order.shopOwnerId = null

        await Orders.create(order)

        //Clear the Cart
        await Cart.updateOne( {uid: req.uid} , {$set: {items: []}})

        res.status(200).send()
    }
    catch(err){
        throw new Error(err.message)
    }

})

//Function to validate the req.body using Joi of Order ID
function validateForGET(obj){

     const schema = Joi.object({ 
        orderid: Joi.string()
        .required(),
    })

    //Returns a error object if validation fails
    return schema.validate(obj).error
}

//Function to validate the req.body using Joi for POST
function validateForPOST(obj){
    
    //Schema for the different parameters of request
    const schema = Joi.object({ 
        items: Joi.array().items({
            itemid: Joi.string().pattern(/^[a-z0-9]*$/).required(),
            price: Joi.number().required(),
            count: Joi.number().required(),
        }).required(),
        deliveryCharges: Joi.number().required(),

        deliveryAddress: Joi.string().min(5).max(250).required(),

        totalPrice: Joi.number().required(),

        status: Joi.string().pattern(/^[a-zA-Z ]*$/).required()
    })

    //Returns a error object if validation fails
    return schema.validate(obj).error
}

module.exports = {
    readOrder,
    createOrder
}