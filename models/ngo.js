const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema

const ngoSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    email: {
        type: String,
        trim: true,
        required:true,
        unique: true
    },
    city:{
        type:String,
        trim:true,
        required:true
    },
    state:{
        type:String,
        trim:true,
        required:true
    },
    pincode:{
        type:Number
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('Ngo',ngoSchema)