const express = require('express')
const router = express.Router()
const {getCategories,create,categoryById,image,getCategory} = require('../controllers/category')

router.post('/category/create',create)
router.get('/categories',getCategories)
router.get('/category/image/:categoryId',image)
router.get('/category/:categoryId',getCategory)


router.param("categoryId",categoryById)

module.exports = router