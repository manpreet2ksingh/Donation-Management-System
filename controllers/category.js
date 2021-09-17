const Category = require('../models/category')
const formidable = require('formidable')
const _ = require('lodash');
const fs = require('fs');

exports.categoryById = (req,res,next,id)=>{
    Category.findById(id).exec((error,category)=>{
        if(error || !category)
        {
            return res.status(400).json({
                error:"Category not found"
            })
        }
        req.category = category
        next()
    })
}

exports.create = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(error,fields,files)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Error uploading image"
            })
        }
        const {name,description} = fields
        if(!name || !description)
        {
            return res.status(400).json({
                error:"All fields are required"
            })
        }

        let category = new Category(fields);
        if(category.image)
        {
            if(category.image.size > 1000000)
            {
                return res.status(400).json({
                    err:'Image size should be less than 1mb'
                })
            }
            category.image.data = fs.readFileSync(files.image.path)
            category.contentType = files.image.type
        }
        category.save((err,category)=>{
            if(err)
            {
                return res.status(400).json({
                    err:errorHandler(err)
                })
            }
            res.json({
                category
            })
        })
    })
}

exports.image = (req,res,next)=>{
    if(req.category.image.data)
    {
        res.set('Content-Type',req.category.image.contentType);
        return res.send(req.category.image.data)
    }
    next();
}

exports.getCategories = (req,res)=>{
    Category.find()
        .select('-image')
        .exec((err,categories)=>{
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            categories
        })
    })
}

exports.getCategory = (req,res)=>{
    Category.findById(req.category._id).exec((error,data)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Category not found"
            })
        }
        return res.json(data)
    })
}