const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post');

router.get('/cat_:id',(req,res)=>{
    let val = req.params.id;

    post.findById(val,(err,data)=>{
        if(err){
            console.log(err);
            return res.redirect('/cat');
        }else{
            res.render('postDetail',{data: data});
            // console.log(data);
        }
    });
    // res.send(val);
});

module.exports = router;