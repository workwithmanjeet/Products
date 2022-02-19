const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const passportlocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({

    firstName :{
        type: String,
        required: true,
        
    },
    lastName:{
        type: String,
        required: true,
       
    }

})


UserSchema.plugin(passportlocalMongoose);

module.exports =mongoose.model('User',UserSchema)