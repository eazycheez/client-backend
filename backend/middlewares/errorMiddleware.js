
//Error Handler method
const errorHandler = (err, req, res, next) => {

    //Check if the status code is already been set, if not set as 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    //Return a json object consisting of message same as 'Error Message' and stack to give the developer some extra information
    //Stack will be returned if the 'NODE Environment is production'
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }