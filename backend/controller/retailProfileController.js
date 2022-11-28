//Profile controller to handle the GET and PUT requests

const asyncHandler = require('express-async-handler')
const retailProfile = require('../model/retailProfileModel')
const Joi = require('joi')

//Method get the profile if the id is valid using findOne() method
// GET /api/profile/:id
const getretailProfile = asyncHandler( async (req, res) => {
    
    //Tries to get the profile by ID..if successful, returns the profile as json object 

    try{
        const {_id, username, phone ,storeaddress, storecategory} = await retailProfile.findOne({ _id: req.params.id})
        res.status(200).json({
            _id: _id,
            username: username,
            phone: phone,
            storeaddress: storeaddress,
            storecategory: storecategory

        })
    }

    // If Profile is not found, catch block throws the new error saying "Profile Not Found"

    catch(err){
        res.status(400)
        throw new Error('Profile Not Found')
    }

})

//Method to update the profile
//PUT /api/profile/:id
const updateretailProfile = asyncHandler( async (req, res) => {

     //Validate the profile ID..
     try{
        await retailProfile.findOne({ _id: req.params.id})
    }

    // If Profile is not found, catch block throws the new error saying "Profile Not Found"

    catch(err){
        res.status(400)
        throw new Error('Profile Not Found, Try Again...')
    }

    //validate function used to validate the body of the request, using Joi class
    //returns the error object if validation fails
    const result = validate(req.body)

    //Handle the error object, i.e, throws a new error with the message same as the error object
    if(result){
        res.status(400)
        throw new Error(result.details[0].message)
    }

    // Updates the Profile parameters, by the parameters specified in body of the request
    const {_id, username, phone,storeaddress, storecategory} = await retailProfile.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    res.status(200).json({
        _id: _id,
        username: username,
        phone: phone,
        storeaddress: storeaddress,
        storecategory: storecategory
    })

})



//Function to validate the req.body using Joi
function validate(obj){

    //Schema for the different parameters of request
    const schema = Joi.object({ 
        username: Joi.string()
        .min(3)
        .max(20)
        .required(),

        phone: Joi.number()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),

        storeaddress: Joi.string()
        .min(5)
        .max(250)
        .required(),

        storecategory: Joi.string()
        .min(0)
        .max(20)
        .required(),
    })

    //Returns a error object if validation fails
    return schema.validate(obj).error
}




module.exports = {
    getretailProfile,
    updateretailProfile
}