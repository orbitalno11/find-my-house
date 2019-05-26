const express = require('express');
const BodyParser = require('body-parser');
const authentication = require('./authentication_module');
const router = express.Router();
const paths = require('path');

let post = require('./post_schema');
let uploadpic = require('./upload_module');

router.use(express.static(paths.resolve('./public')));

express().use(BodyParser.urlencoded({extended: true}));

router.get('/cat', authentication.isLoggedIn, (req,res)=>{
    res.render('catpost',{user: req.session.passport.user});
    // console.log(req.session.passport.user);
    // console.log(req.session.)
});

router.post('/cat',authentication.isLoggedIn, uploadpic.upload.single('picture'), (req,res)=>{
   
    let imgfile = uploadpic.uploadIMG(req,res);

    let postData = {
        petType: 'cat',
        postType: req.body.postType,
        identity: req.body.identity,
        moreDetail: req.body.moreDetail,
        species: req.body.species,
        petStatus: req.body.petStatus,
        moreContact: req.body.moreContact,
        owner: req.body.owner,
        pic: imgfile,
        postStatus : req.body.postStatus
    };
    
    post.create(postData);
    res.redirect('/cat');
});

router.get('/dog', authentication.isLoggedIn, (req,res)=>{
    res.render('dogpost');
});

module.exports = router;