const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const {isLoggedIn} = require('../middleware');
const csv=require('csvtojson')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
  })
  
const upload = multer({ storage: storage })

router.get('/views',isLoggedIn, async (req,res,next) =>{
   
    const plist= await Product.find({})
    console.log(plist);
    res.send(plist);

    
 
})


router.post('/upload-csv',isLoggedIn,upload.single('fisier'), async (req , res, next) =>{
   
    const csvFile=req.file
    console.log(csvFile)
    const jsonArray=await csv().fromFile(csvFile.path);
    console.log( req.user)
    for (let product of jsonArray){
        const insertp = new Product( {name : product.name, desciptions: product.desciptions,quantity:product.quantity,price:product.price, _createdBy:req.user.username});
        await insertp.save()
    }
    res.send("Record inserted in Database Successfully")

    
})



module.exports = router;