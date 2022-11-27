const express = require('express')
const { auth } = require('firebase-admin')
const app = express()
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middlewares/errorMiddleware')
const checkAuth = require('./middlewares/firebaseValidation')

//Firebase connection
var admin = require("firebase-admin");

var serviceAccount = require("../phone-firebase-e6ae0-firebase-adminsdk-uk24t-3eba5f0258.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phone-firebase-e6ae0-default-rtdb.firebaseio.com"
})

//Set the connection to the database
connectDB()

//Used to wrap the req.body to json object
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )


//Route the  /api/profile/:id requests to routes
app.use('/api/profile', checkAuth, require('./routes/profileRoutes'))

//Route the  /api/cart/:id requests to routes
app.use('/api/cart', checkAuth, require('./routes/cartRoutes'))

//Route the  /api/cart/placeorder/:id requests to routes
app.use('/api/placeorder', checkAuth, require('./routes/orderRoutes'))

//Overwrites the default Express Error Handler
app.use(errorHandler)

//Set the Port from .env file
const port = process.env.PORT || 5000

//Listens to the port
app.listen( port, () => console.log(`Server started at port ${port}`) )
