const User = require('../models/user')

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((error,user)=>{
        if(error)
        {
            res.status(400).json({
                error:'User not found'
            })
        }
        req.profile = user;
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        next();
    })
}

exports.getUser = (req,res)=>{
    User.findById(req.profile._id).exec((error,user)=>{
        if(error){
            return res.status(400).json({
                error:"User not found"
            })
        }
        res.json(user)
    })
}

exports.updateHistory = (req,res)=>{
    data = {
        NGO:req.body.selectedNgo,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        donationDetails:req.body.donationDetails,
        pickUpAddress:req.body.pickUpAddress,
    }
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$push:{history:data}},
        {new:true})
        .exec((error,data)=>{
            if(error)
            {
                return res.status(400).json({
                    error:"Error updating user history"
                })
            }
            return res.json(data)
    })
}