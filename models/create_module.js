const express = require('express');
const authentication = require('./authentication');
const router = express.Router();

router.get('/cat', authentication.isLoggedIn, (req,res)=>{
    res.render('catpost');
});

router.get('/dog', authentication.isLoggedIn, (req,res)=>{
    res.render('dogpost');
});

module.exports = router;