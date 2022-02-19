const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema=new Schema({
    name : String,
    description : String,
    quantity:Number,
    price:Number,
    _createdBy:String
}) 


module.exports =mongoose.model('Products',ProductSchema);