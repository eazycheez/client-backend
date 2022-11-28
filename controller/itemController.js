//items controller to handle CRUD of items 

const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler') 
const Item = require('../model/itemModel.js');
const Joi = require('joi');
const _ = require('lodash');
const { errorHandler } = require('../middlewares/errorMiddleware.js');


const readItem = asyncHandler( async (req, res) => {
    
   try {
    
    item = await Item.findById(req.params.id);
    res.status(200).send(item);


   } catch (error) {
        res.status(404).send("Invalid ID " + error.message)    
   }
    

})


const createItem = asyncHandler( async (req, res) => {
    try{
        
        error = validate(req.body);
        if(error)  res.status(400).send(error.message);
        item = await Item.findOne({name :req.body.name})
        if(item) res.status(409).send("item already exists");
        item  = new Item(_.pick(req.body, ['category','name', 'price', 'description','unit' ]))
        await item.save()
        res.status(200).send(item)
    }
    catch(err){
        throw new Error(err.message)
    }

})

const updateItem = asyncHandler( async (req, res) => {


    try {
        item = await Item.findOne({name :req.body.name, _id: {$ne: req.params.id}})
        if(item) res.status(409).send("item with this name exists, please rename it.");    
        const updatedItem = await Item.findByIdAndUpdate({ _id: req.params.id} , _.pick(req.body, ['category','name', 'price', 'description','unit' ]),{returnOriginal: false} )
        res.send(updatedItem).status(204)
    } catch (error) {
        res.send("invalid ID: " + error.message)
    }   
},)


const deleteItem = asyncHandler( async (req, res) => {


    try {
        
        item = await Item.findById(req.params.id);
        if(!item) res.status(404).send("The item doesnt exist")
        await Item.deleteOne({_id: req.params.id})
        res.status(200).send("succesfully deleted")
    } catch (error) {
        res.status(404).send("INVALID ID : " + error.message)
        
    }
    
},)






function validate(obj){

    //Schema for the different parameters of request
    const schema = Joi.object({ 
        category : Joi.string().required(),
        name : Joi.string().required(),
        price : Joi.number().required(),
        description : Joi.string().max(1000),
        unit: Joi.string().required()
    })

    //Returns a error object if validation fails
    return  schema.validate(obj).error
}




module.exports = {
    readItem,
    createItem,
    updateItem,
    deleteItem

}