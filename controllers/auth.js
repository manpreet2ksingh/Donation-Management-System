const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req,res)=>{
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json({
            user
        })
    })   
}

exports.signin = (req,res)=>{
    const {email,password} = req.body;
    User.findOne({email},(error,user)=>{
        if(!user || error)
        {
            return res.status(400).json({
                error:"Email not found.Signup first"
            })
        }

        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error:"Email and Password dont match "
            })
        }

            // generate a signed token with user._id and secret
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie('t',token,{expire:new Date() + 9999 })
        //return response with user and token to frontend client
        const {_id,name,email,role} = user;
        return res.json({
            token,
            user :{_id,name,email,role}
        });
        
    })
}

exports.signout = (req,res) =>{
    res.clearCookie('t');
    res.json({
        message:'Signout Success'
    })
}

exports.requireSignIn = expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty:'auth'
})

exports.isAuth = (req,res,next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user)
    {
        return res.status(403).json({
            error:'Access Denied'
        })
    }
    next();
}