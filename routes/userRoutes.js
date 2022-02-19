const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const {isLoggedIn} = require('../middleware');



router.post('/register',  async (req , res, next) =>{
    try{
        const { firstName,lastName,username,password}= req.body;
        console.log(req.body)
        const user = new User({firstName : firstName , lastName : lastName,username:username});
        const regUser = await User.register(user,password)
        console.log(regUser)
        req.login(regUser , err =>{
            if(err) return next(err);
            req.flash('success','SignIn successfully !!')
            res.send(regUser )
        })
        
    }catch(e){
        console.log(e.message)
        res.send("error")
    }

    
})
router.get('/logout',(req, res)=>{
    req.logout();
    res.send("User logout Succesfully")
})
router.get('/:id',isLoggedIn, async (req,res,next) =>{
    const {id}=req.params
    const user= await User.findById(id)
    console.log(user);
    res.send(user);

    
 
})

router.get('/', isLoggedIn,async (req,res,next) =>{
   
    const user= await User.find({})
    console.log(user);
    res.send(user);

    
 
})


router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    console.log(req.user)
    res.send(`Username : ${req.user.username } Login Successfully `)
})




module.exports = router;