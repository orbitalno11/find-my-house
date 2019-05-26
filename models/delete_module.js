const express = require('express');
const BodyParser = require('body-parser');
const authentication = require('./authentication_module');
const router = express.Router();
const paths = require('path');

let post = require('./post_schema');
let user = require('./user_schema');
router.use(express.static(paths.resolve('./public')));

express().use(BodyParser.urlencoded({extended: true}));

router.get('/post/:id',authentication.isLoggedIn, (req,res)=>{
    let id = req.params.id;
    let ss = req.session.passport.user;

    post.findById(id,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(ss === data.owner){
                post.findByIdAndDelete(id,(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/view/user_post_'+ss);
                    }
                });
            }else{
                res.redirect('/signin');
            }
        }
    });
});

router.get('/post/admin/:id', authentication.isLoggedIn, (req,res)=>{
    let id = req.params.id;

    authentication.isAdmin(req, (admin)=>{
        if(admin){
            post.findByIdAndDelete(id,(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/admin/report');
                }
            });
        }else{
            res.redirect('/signin');
        }
    });
});

module.exports = router;