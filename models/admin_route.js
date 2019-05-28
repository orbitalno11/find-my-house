const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post_schema');
let authentication = require('./authentication_module');
let User = require('./user_schema');

router.use(express.static(path.resolve('./public')));

router.get('/report', authentication.isLoggedIn, (req, res) => {
    authentication.isAdmin(req, (val) => {
        if (val) {
            post.find({ postStatus: 'ถูกแจ้งผิดกฎ' }, (err, data) => {
                User.findOne({ username: req.session.passport.user }, (err, udata) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/signin');
                    } else {
                        res.render('reportList', { postdata: data, userdata: udata });
                    }
                });
            });
        } else {
            res.redirect('/user/' + req.session.passport.user);
        }
    });
});

router.get('/change', authentication.isLoggedIn, (req, res) => {
    authentication.isAdmin(req, (state) => {
        if (state) {
            post.find({ postStatus: 'ปิดโพสต์' }, (err, data) => {
                User.findOne({ username: req.session.passport.user }, (err, udata) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/signin');
                    } else {
                        res.render('changeState', { postdata: data, userdata: udata });
                    }
                });
            });
        } else {
            res.redirect('/signin');
        }
    });
});


module.exports = router;