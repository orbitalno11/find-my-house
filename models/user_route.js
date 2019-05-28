const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
const router = express.Router();

let User = require('./user_schema');
let authentication = require('./authentication_module');
let uploadpic = require('./upload_module');
let post = require('./post_schema');

router.use(express.static(path.resolve('./public')));
express().use(BodyParser.urlencoded({extended: true}));

router.get('/detail_:id',(req,res)=>{
    let id = req.params.id;
    let sessionname = req.session;

    if(authentication.checkLogIn(req,res) && sessionname.passport.user === id){
        // console.log(sessionname.passport.user);
        User.findOne({username : id}, (err,data)=>{
            if(err){
                return console.log(err);
            }
            // console.log(data);
            // res.redirect('/');
            res.render('viewprofile',{userdata : data, authen: true});
        });
    }else{
        User.findOne({username : id}, (err,data)=>{
            if(err){
                return console.log(err);
            }
            // console.log(data);
            // res.redirect('/');
            res.render('viewprofile',{userdata : data, authen: false});
        });
    }
});

router.get('/edit_:id', authentication.isLoggedIn, (req,res)=>{
    let id = req.params.id;
    let sessionname = req.session;

    if(authentication.checkLogIn(req,res) && sessionname.passport.user === id){
        // console.log(sessionname.passport.user);
        User.findOne({username : id}, (err,data)=>{
            if(err){
                return console.log(err);
            }
            // console.log(data);
            // res.redirect('/');
            res.render('editprofile',{userdata : data, authen: true});
        });
    }else{
        res.redirect('/user/edit_'+sessionname.passport.user);
        // res.render('test');
    }
});

router.post('/edit',uploadpic.upload.single('picture'), (req,res)=>{
    let sessionname = req.session;
    let imgfile = uploadpic.uploadIMG(req,res);
    
    let userData = {
        username: req.body.username,
        name: req.body.name,
        lname: req.body.lname,
        gender: req.body.gender,
        address: req.body.address,
        village: req.body.village,
        road: req.body.road,
        subdistrict: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        // pic: imgfile,
        // status: req.body.status
        // password : req.body.password
    };

    if(imgfile != false){
        userData.pic = imgfile;
    }

    // console.log(uploadpic.uploadIMG(req,res));

   
    // console.log(userData);
    

    if(authentication.checkLogIn(req,res) && sessionname.passport.user === userData.username){
        User.findOneAndUpdate({username: userData.username}, userData,(err, update)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/user/detail_'+sessionname.passport.user);
            }
        });
    }else{
        res.redirect('/user/edit_'+sessionname.passport.user);
    }
});

router.get('/:id', (req,res)=>{
    let id = req.params.id;
    let sessionname = req.session;

    // console.log(sessionname);
    // console.log(req.session.passport.user);

    if(authentication.checkLogIn(req,res) && sessionname.passport.user === id){
        // console.log(sessionname.passport.user);
        User.findOne({username : id}, (err,data)=>{
            if(err){
                return console.log(err);
            }
            post.find({owner: data.username},null,{sort: {created: -1}},(err, post)=>{
                if(err){
                    console.log(err);
                    res.redirect('/sigin');
                }else{
                    res.render('user',{userdata : data, authen: true, data :post});
                }
            });
            // console.log(data);
            // res.redirect('/');
            // res.render('user',{userdata : data, authen: true});
        });
    }else{
        User.findOne({username : id}, (err,data)=>{
            if(err){
                return console.log(err);
            }
            post.find({owner: data.username},null,{sort: {created: -1}},(err, post)=>{
                if(err){
                    console.log(err);
                    res.redirect('/sigin');
                }else{
                    res.render('user',{userdata : data, authen: false, data: post});
                }
            });
            // console.log(data);
            // res.redirect('/');
            // res.render('user',{userdata : data, authen: false});
        });
    }
});





module.exports = router;