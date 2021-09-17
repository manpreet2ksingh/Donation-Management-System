const express = require('express');
const router = express.Router();

const {send} = require('../controllers/mail')

router.post("/notification",send);

module.exports = router;