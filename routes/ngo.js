const express = require('express')
const router = express.Router()
const {requireSignIn,isAuth} = require('../controllers/auth')
const {create,list,filterList} = require('../controllers/ngo')
const {userById} = require('../controllers/user')
const {getNgoByID,getNgo} = require('../controllers/ngo')

router.post("/add/ngo/:userId",requireSignIn,isAuth,create);
router.get("/ngos",list)
router.post("/ngos/filtered",filterList)
router.get('/ngo/:ngoId',getNgo)

router.param("ngoId",getNgoByID);
router.param("userId",userById);

module.exports = router;