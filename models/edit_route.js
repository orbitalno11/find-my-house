const express = require('express');
const BodyParser = require('body-parser');
const authentication = require('./authentication_module');
const router = express.Router();
const paths = require('path');

let post = require('./post_schema');
let uploadpic = require('./upload_module');

router.use(express.static(paths.resolve('./public')));

express().use(BodyParser.urlencoded({extended: true}));

router.get('/post_:id', authentication.isLoggedIn,(req,res)=>{
    let val = req.params.id;

    post.findById(val,(err,data)=>{
        if(err){
            console.log(err);
            return res.redirect('/view/user_post_'+req.session.passport.user);
        }else{
            if(data.owner === req.session.passport.user){
                res.render('editpost',{postdata: data});
            }else{
                res.redirect('/view/user_post_'+req.session.passport.user);
            }
        }
    });
});

router.post('/post/:id', authentication.isLoggedIn, uploadpic.upload.single('picture'), (req,res)=>{
    let imgfile = uploadpic.uploadIMG(req,res);
    let id = req.params.id;

    let postData = {
        // petType: req.body.petType,
        postType: req.body.postType,
        identity: req.body.identity,
        moreDetail: req.body.moreDetail,
        species: req.body.species,
        petStatus: req.body.petStatus,
        moreContact: req.body.moreContact,
        owner: req.body.owner,
    };

    if(imgfile != false){
        postData.pic = imgfile;
    }

    if(req.session.passport.user === postData.owner){
        post.findByIdAndUpdate(id,postData, (err, update)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/view/user_post_'+req.session.passport.user);
            }
        });
    }
});

module.exports = router;