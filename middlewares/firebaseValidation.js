
const admin = require("firebase-admin")
const asyncHanlder = require('express-async-handler')

//Authorization function
const checkAuth = asyncHanlder (async (req, res, next) => {
  if (req.headers.authtoken) {
    
    //req.uid = req.headers.authtoken;next()

    
    await admin.auth().verifyIdToken(req.headers.authtoken)
      .then((decodedToken) => {
        req.uid = decodedToken.uid
        next()
      }).catch((err) => {
        res.status(403).send(err.message)
    })

  } else {
    res.status(403).send('Unauthorized')
  }
})

module.exports = checkAuth