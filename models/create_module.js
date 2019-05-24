const express = require('express');
const BodyParser = require('body-parser');
const authentication = require('./authentication');
const router = express.Router();
const path = require('path');

let post = require('./post');

router.use(express.static(path.resolve('./public')));

express().use(BodyParser.urlencoded({extended: true}));

router.get('/cat', authentication.isLoggedIn, (req,res)=>{
    res.render('catpost',{user: req.session.passport.user});
    // console.log(req.session.passport.user);
    // console.log(req.session.)
});

router.post('/cat', authentication.isLoggedIn, (req,res)=>{
    let postData = {
        petType: 'cat',
        postType: req.body.postType,
        identity: req.body.identity,
        moreDetail: req.body.moreDetail,
        species: req.body.species,
        petStatus: req.body.petStatus,
        moreContact: req.body.moreContact,
        owner: req.body.owner
    };
    
    post.create(postData);
    res.redirect('/cat');
});

router.get('/dog', authentication.isLoggedIn, (req,res)=>{
    res.render('dogpost');
});

module.exports = router;