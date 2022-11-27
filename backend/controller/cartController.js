//Cart controller to handle the GET, DELETE and PUT requests

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler') 
const Profile = require('../model/profileModel')
const Items = require('../model/itemModel')
const Cart = require('../model/cartModel')

//Method get the cart items if the id is valid using findOne() method
// GET /api/cart/:id
const getCart = asyncHandler( async (req, res) => {

    //Tries to get the cart details by ID..if successful, returns the cart array as json object
    try{
        await Profile.findOne({ _id: req.params.id })
    }

    // If id is invalid, catch block throws the new error saying "Invalid ID"

    catch(err){
        res.status(400)
        throw new Error('Invalid ID')
    }

    getItems(req, res)
})

//Method to update the cart
//PUT /api/cart/:id
const putItem = asyncHandler( async (req, res) => {
    
    //Validate the user ID..
     try{
        await Profile.findOne({ _id: req.params.id })
    }

    // If ID not found, catch block throws the new error saying "Invalid ID"
    catch(err){
        res.status(400)
        throw new Error('Invalid ID')
    }

    //Check for required parameters
    if(!req.body.itemID || !req.body.count)
        throw new Error('Provide required parameters')

    //If the count == 0 then delete that item from the cart
    if(req.body.count == 0)
        deleteItem(req, res)

    //If the count is not zero
    else{
        // Updates the Cart Item count, by the count specified in body of the request
        try{

            await Cart.updateOne( { userID: req.params.id, "items.itemID": req.body.itemID }, 
                {$set: {"items.$.count": req.body.count}})

        }

        //If Item count can't be updated, throws an error
        catch(err){
            res.status(400)
            throw new Error('Item ID is invalid')
        }
    }

    //Get the updated items in the cart
    getItems(req, res)
})

//Method to delete item from the cart if count == 0
async function deleteItem (req, res) {

   // Deletes the item from the item list of the cart
   try{
    const { itemID } = req.body
    await Cart.updateOne({ userID: req.params.id}, { $pull: {items: { itemID }}})
   }

   //Throws an Error if item ID is invalid
   catch(err){
    res.status(400)
    throw new Error('Item ID is invalid')
   }

}

// Function to get the details of the items from the database
async function getItems(req, res){

    //Get the parameters from the Cart collection
    const { address, items } = await Cart.findOne({ userID: req.params.id })

    // Fetches the details from the Items collection for every item reference stored in the cart 
    const cartItems = []
    for(let i = 0; i < items.length; i++){
        
            const { name, price } = await Items.findOne({ _id: items[i].itemID })

            const count = items[i].count
            const itemID = items[i].itemID
            cartItems.push({ itemID, name, price, count})
        
    }

    //Returns the User ID with the cartItems
    res.status(200).json({
        _id: req.params.id,
        address: address,
        cart: cartItems
    }) 
}

module.exports = {
    getCart,
    putItem
}