const User = require('./models/users');

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        console.log(req.session)
        res.send("You must be signed in First!")
      
    }
    next();
}