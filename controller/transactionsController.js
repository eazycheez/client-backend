//Transactions controller to handle the GET request

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Orders = require('../model/orderModel')
const Item = require('../model/itemModel')

//Method get the transactions if the id is valid using find() method
// GET /api/transactions
const readTransactions = asyncHandler( async (req, res) => {

    //Tries to get the cart details by ID..if successful, returns the item list with transactions as json object
    try{
        const transactions = await Orders.find({ uid: req.uid },
            { uid: 1, status: 1, totalPrice: 1, items: 1, _id: 1 }, {lean: true})
            .sort( {createdAt: -1} )
            .skip(req.body.skip)
            .limit(req.body.limit)

        //Loop to access each order
        for(let j = 0; j < transactions.length; j++){

            transactions[j].orderid = transactions[j]._id
            delete transactions[j]._id
            delete transactions[j].uid
            transactions[j].itemNames = []

            //Loop to access each item in the order
            for(let i = 0; i < transactions[j].items.length; i++){

                const name = await Item.findById({_id: transactions[j].items[i].itemid})
                if(!name) throw new Error('Invalid itemid')
                transactions[j].itemNames.push(name.name)
            
            }
            
            //Delete the items field of jth order
            delete transactions[j].items
        }
        res.status(200).json(transactions)
    }

    // If id is invalid, catch block throws the new error saying "Invalid User ID"

    catch(err){
        res.status(400)
        throw new Error(err.message)
    }

})

module.exports = {
    readTransactions
}