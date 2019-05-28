const express = require('express');
const path = require('path');
const router = express.Router();

let foundation = require('./foundation_schema');
let authentication = require('./authentication_module');
let upload = require('./upload_module');

router.use(express.static(path.resolve('./public')));

router.get('/', (req, res) => {
    foundation.find({}, null, {sort : {_id: -1}},(err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.render('foundation', { data: data });
        }
    });
});

router.get('/list', authentication.isLoggedIn, (req,res)=>{
    authentication.isAdmin(req,(state)=>{
        if(state){
            foundation.find({}, null, {sort : {_id: -1}}, (err,data)=>{
                if(err){
                    console.log(err);
                    res.redirect('/signin');
                }else{
                    res.render('foundationList',{data: data});
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
            res.render('foundationCreate');
        } else {
            res.redirect('/signin');
        }
    });
});

router.post('/create', authentication.isLoggedIn, upload.upload.single('picture'), (req, res) => {
    let imgfile = upload.uploadIMG(req, res);
    let foundationData = {
        name: req.body.name,
        description: req.body.description,
        contact: {
            phone: req.body.phone,
            address: req.body.address,
        },
        pic: imgfile
    }
    authentication.isAdmin(req, (state) => {
        if (state) {
            foundation.create(foundationData);
            res.redirect('/foundation/list');
        } else {
            res.redirect('/signin');
        }
    })
});

router.get('/edit_:id', authentication.isLoggedIn, (req, res) => {
    let id = req.params.id;
    authentication.isAdmin(req, (state) => {
        if (state) {
            foundation.findById(id, (err, data) => {
                if (err) {
                    console.log(err);
                    res.redirect('/signin');
                } else {
                    res.render('foundationEdit', { data: data });
                }
            });
        }else{
            res.redirect('/signin');
        }
    });
});

router.post('/edit/:id', authentication.isLoggedIn, upload.upload.single('picture'), (req, res) => {
    let id = req.params.id;
    let imgfile = upload.uploadIMG(req, res);

    let foundationData = {
        name: req.body.name,
        description: req.body.description,
        contact: {
            phone: req.body.phone,
            address: req.body.address,
        }
    };

    if(imgfile != false){
        foundationData.pic = imgfile;
    }

    authentication.isAdmin(req, (state)=>{
        if(state){
            foundation.findByIdAndUpdate(id, foundationData, (err, update)=>{
                if(err){
                    console.log(err);
                    res.redirect('/signin');
                }else{
                    res.redirect('/foundation/'+id);
                }
            });
        }else{
            res.redirect('/signin');
        }
    });

});

router.get('/delete/:id', authentication.isLoggedIn,(req,res)=>{
    let id = req.params.id;

    authentication.isAdmin(req, (state)=>{
        if(state){
            foundation.findByIdAndDelete(id,(err,del)=>{
                if(err){
                    console.log(err);
                }
                res.redirect('/foundation/list');
            });
        }else{
            res.redirect('/sigin');
        }
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    foundation.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/foundation');
        } else {
            res.render('foundationDetail', { postdata: data });
        }
    })
});



module.exports = router;