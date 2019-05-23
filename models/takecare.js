const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post');
let User = require('./user');

router.get('/cat_:id',(req,res)=>{
    let val = req.params.id;
    let userdata, postdata;

    post.findById(val,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            User.findOne({username: data.owner},(err,data2)=>{
                if(err){
                    console.log(err);
                }else{
                    // userdata = data;
                    // console.log(data);
                    // console.log(data2);
                    res.render('takeCare',{postdata: data,userdata: data2});
                }
            });
        }
    });

    // User.findOne({username: postdata.owner},(err,data)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         userdata = data;
    //     }
    // });

    // console.log(postdata);
    // console.log(userdata);
    // res.redirect('/cat');
});

module.exports = router;