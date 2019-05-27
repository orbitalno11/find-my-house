const express = require('express');
const path = require('path');
const router = express.Router();

let howto = require('./howto_schema');
let authentication = require('./authentication_module');

router.use(express.static(path.resolve('./public')));

router.get('/', (req, res) => {
    howto.find({}, null, {sort : {_id: -1}}, (err,data)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('howto',{data: data});
        }
    });
});

router.get('/list', authentication.isLoggedIn, (req,res)=>{
    authentication.isAdmin(req,(state)=>{
        if(state){
            howto.find({}, null, {sort : {_id: -1}}, (err,data)=>{
                if(err){
                    console.log(err);
                    res.redirect('/signin');
                }else{
                    res.render('howtoList',{data: data});
                }
            });
        }else{
            res.redirect('/signin');
        }
    });
});

router.get('/create', authentication.isLoggedIn, (req, res) => {
    authentication.isAdmin(req, (state) => {
        if (state) {
            res.render('howtoCreate');
        } else {
            res.redirect('/signin');
        }
    });
});

router.post('/create', authentication.isLoggedIn, (req, res) => {
    let howtoData = {
        title: req.body.title,
        description: req.body.description
    };

    authentication.isAdmin(req, (state) => {
        if (state) {
            howto.create(howtoData);
            res.redirect('/signin');
        } else {
            res.redirect('/signin');
        }
    });
});

router.get('/edit_:id', authentication.isLoggedIn, (req, res) => {
    let id = req.params.id;
    authentication.isAdmin(req, (state) => {
        if (state) {
            howto.findById(id, (err, data) => {
                if (err) {
                    console.log(err);
                    res.redirect('/signin');
                } else {
                    res.render('howtoEdit', { data: data });
                }
            });
        }else{
            res.redirect('/signin');
        }
    });
});

router.post('/edit/:id', authentication.isLoggedIn, (req, res) => {
    let id = req.params.id;

    let howtoData = {
        name: req.body.title,
        description: req.body.description,
    };

    authentication.isAdmin(req, (state)=>{
        if(state){
            howto.findByIdAndUpdate(id, howtoData, (err, update)=>{
                if(err){
                    console.log(err);
                    res.redirect('/signin');
                }else{
                    res.redirect('/howto/'+id);
                }
            });
        }else{
            res.redirect('/signin');
        }
    });

});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    howto.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/howto');
        } else {
            res.render('howtoDetail', { postdata: data });
        }
    });
});

module.exports = router;