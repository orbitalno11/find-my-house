const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post_schema');
let authentication = require('./authentication_module');

router.use(express.static(path.resolve('./public')));

router.get('/post_:id', (req, res) => {
    let val = req.params.id;

    post.find({ petType: 'cat' }, (err, moredata) => {
        if (err) {
            console.log(err);
            res.redirect('/cat');
        } else {
            if (authentication.checkLogIn(req, res)) {
                post.findById(val, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.redirect('/cat');
                    } else {
                        res.render('postDetail', { data: data, authen: true, user: req.session.passport.user, moredata: moredata });
                        // console.log(data);
                    }
                });
            } else {
                post.findById(val, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.redirect('/cat');
                    } else {
                        res.render('postDetail', { data: data, authen: false, user: null, moredata: moredata });
                        // console.log(data);
                    }
                });
            }
        }

    });


    // res.send(val);
});

router.get('/user_post_:username', authentication.isLoggedIn, (req, res) => {
    let val = req.params.username;

    if (req.session.passport.user === val) {
        post.find({ owner: val }, (err, data) => {
            if (err) {
                console.log(err);
                return res.redirect('/user/' + val);
            } else {
                // console.log(data);
                res.render('postHistory', { postdata: data });
            }
        });
    } else {
        res.redirect('/view/user_post_' + req.session.passport.user);
    }
});

router.get('/report_:id', authentication.isLoggedIn, (req, res) => {
    let id = req.params.id;

    authentication.isAdmin(req, (val) => {
        if (val) {
            post.findById(id, (err, data) => {
                res.render('reported', { postdata: data });
            });
        } else {
            res.redirect('/signin');
        }
    });
});


module.exports = router;