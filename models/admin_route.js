const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post_schema');
let authentication = require('./authentication_module');

router.use(express.static(path.resolve('./public')));

router.get('/report',authentication.isLoggedIn,(req,res)=>{
    authentication.isAdmin(req, (val)=>{
        if(val){
            post.find({postStatus: 'ถูกแจ้งผิดกฎ'},(err, data)=>{
                res.render('reportList',{postdata: data});
            });
        }else{
            res.redirect('/user/'+req.session.passport.user);
        }
    });
});

router.get('/change',authentication.isLoggedIn,(req,res)=>{
    authentication.isAdmin(req, (state)=>{
        if(state){
            post.find({postStatus: 'ปิดโพสต์'},(err,data)=>{
                res.render('changeState',{postdata: data});
            });
        }else{
            res.redirect('/signin');
        }
    });
});


module.exports = router;