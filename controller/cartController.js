//Cart controller to handle the GET, DELETE and PUT requests

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler') 
const Profile = require('../model/profileModel')
const Items = require('../model/itemModel')
const Cart = require('../model/cartModel')
const Joi = require('joi')

//Method get the cart items if the id is valid using findOne() method
// GET /api/cart
const getCart = asyncHandler( async (req, res) => {

    //Tries to get the cart details by ID..if successful, returns the cart array as json object
    try{
        const profile = await Profile.findOne({ uid: req.uid })
        if(!profile) throw new Error('Invalid ID')
    }

    // If id is invalid or profile is not present, catch block throws the new error saying "Invalid ID"

    catch(err){
        res.status(400)
        throw new Error(err.message)
    }

    getItems(req, res)
})

//Method to update the cart
//PUT /api/cart
const putItem = asyncHandler( async (req, res) => {

    const result = validate(req.body)

    if(result){
        res.status(400)
        throw new Error(result.details[0].message)
    }
    
    //Validate the user ID..
     try{
        const profile = await Profile.findOne({ uid: req.uid })
        if(!profile) throw new Error('Invalid ID')
    }

    // If ID not found, catch block throws the new error saying "Invalid ID"
    catch(err){
        res.status(400)
        throw new Error(err.message)
    }

    //If the count == 0 then delete that item from the cart
    if(req.body.count == 0)
        deleteItem(req, res)

    //If the count is not zero
    else{
        // Updates the Cart Item count, by the count specified in body of the request
        try{

            await Cart.updateOne( { uid: req.uid, "items.itemid": req.body.itemid }, 
                {$set: {"items.$.count": req.body.count}})

            //Get the updated items in the cart
            getItems(req, res)

        }

        //If Item count can't be updated, throws an error
        catch(err){
            res.status(400)
            throw new Error('Item ID is invalid')
        }
    }

})

//Method to delete item from the cart if count == 0
async function deleteItem (req, res) {

   // Deletes the item from the item list of the cart
   try{
        const { itemid } = req.body
        await Cart.updateOne({ uid: req.uid}, { $pull: {items: { itemid }}})
        
        //Get the updated items in the cart
        getItems(req, res)
   }

   //Throws an Error if item ID is invalid
   catch(err){
        res.status(400)
        throw new Error('Item ID is invalid')
    }

}

// Function to get the details of the items from the database
async function getItems(req, res){

    let cart
    try{
        //Get the parameters from the Cart collection
        cart = await Cart.findOne({ uid: req.uid }, {address: 1, items: 1, _id: 0}, {lean: true})
        if(!cart)
            throw new Error('Cart not found')
    }

    catch(err){
        res.status(400)
        throw new Error(err.message)
    }

    // Fetches the details from the Items collection for every item reference stored in the cart
    for(let i = 0; i < cart.items.length; i++){
        try{
            const { name, price } = await Items.findOne({ _id: cart.items[i].itemid }, {name: 1, price: 1, _id: 0})
            cart.items[i].name = name
            cart.items[i].price = price
            delete cart.items[i]._id
        }
        catch(err){
            res.status(400)
            throw new Error(err.message)
        }
    }

    //Returns the User ID with the cartItems
    res.status(200).json({
        uid: req.uid,
        address: cart.address,
        cart: cart.items
    }) 
}

//Function to validate the req.body using Joi
function validate(obj){

    //Schema for the different parameters of request
    const schema = Joi.object({ 
        itemid: Joi.string()
        .required(),

        count: Joi.string()
        .pattern(/^[0-9]+$/)
        .required()
    })

    //Returns a error object if validation fails
    return schema.validate(obj).error
}


module.exports = {
    getCart,
    putItem
}