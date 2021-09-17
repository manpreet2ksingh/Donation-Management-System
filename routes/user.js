const express = require('express')
const router = express.Router();

const {userById,getUser,updateHistory} = require('../controllers/user')
const {requireSignIn,isAuth} = require('../controllers/auth')

router.get('/secret/:userId',requireSignIn,isAuth,(req,res)=>{
    res.json({
        profile:req.profile,
        auth:req.auth
    })
})

router.get("/user/:userId",getUser)
router.post("/user/:userId/donation",updateHistory)
router.param("userId",userById);

module.exports = router