const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post_schema');
let User = require('./user_schema');

router.use(express.static(path.resolve('./public')));

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
                    // let val = path.join(__dirname, '/../public');
                    // console.log(val);
                    res.render('takeCare',{postdata: data,userdata: data2});
                }
            });
        }
    });
});

router.get('/dog_:id',(req,res)=>{
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
                    // let val = path.join(__dirname, '/../public');
                    // console.log(val);
                    res.render('takeCare',{postdata: data,userdata: data2});
                }
            });
        }
    });
});

module.exports = router;