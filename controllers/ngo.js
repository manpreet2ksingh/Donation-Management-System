const Ngo = require('../models/ngo')
const {errorHandler} = require('../helpers/dbErrorHandler');
const mongoose = require('mongoose')

exports.create = (req,res)=>{
    const ngo = new Ngo(req.body);

    ngo.save((error,ngo)=>{
        if(error)
        {
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json({ngo})
    })
}

exports.getNgoByID = (req,res,next,id)=>{
    Ngo.findById(id).exec((error,ngo)=>{
        if(error)
        {
            return res.status(400).json({
                error:"NGO not found"
            })
        }
        req.ngo = ngo
        next()
    })
}

exports.list = (req,res)=>{
    Ngo.find().exec((err,ngos)=>{
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            ngos
        })
    })
}

exports.filterList = (req,res)=>{
    Ngo.find(req.body,{})
    .populate('category','_id name description')
    .exec((error,data)=>{
        if(error)
        {
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json({
            data
        })
    })
}

exports.getNgo = (req,res)=>{
    Ngo.findById(req.ngo._id).exec((error,data)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Ngo not found"
            })
        }
        return res.json(data)
    })
}