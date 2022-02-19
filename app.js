const express = require('express');
const app = express();

if (process.env.NODE_ENV!== "production"){
    require('dotenv').config({ path:'./.env' });
}

app.use(express.urlencoded({extended: true}))
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy =require('passport-local');


const User = require('./models/users')

const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')

const url = process.env.Dburl
const mongoose = require('mongoose');
mongoose.connect(url,{
   
});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'));
db.once('open',() =>{
    console.log("Database Connected");
})

const sessionConfig = {
    name: 'sessionabs',
    secret: 'notagoodwayvvvvvvvvvvvvvvvvvvvvvv',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        // secure: true,
        expires: Date.now()+ (1000*60*60*24*7 ),
        maxAge: 1000 * 60 * 60  * 24 * 7
    }
}


app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// define auth method of user 

passport.serializeUser(User.serializeUser());  
// add user detail in session
passport.deserializeUser(User.deserializeUser());
// remove user details from session
app.use((req, res,next)=>{
    res.locals.currentUser=req.user;
    next();
})

app.use('/user',userRoutes)
app.use('/product',productRoutes)

app.listen(3000,()=>{
    console.log("ON port 3000")
})