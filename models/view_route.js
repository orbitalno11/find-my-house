const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post_schema');
let authentication = require('./authentication_module');

router.use(express.static(path.resolve('./public')));

router.get('/cat_:id', (req, res) => {
    let val = req.params.id;

    post.findById(val, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/cat');
        } else {
            res.render('postDetail', { data: data });
            // console.log(data);
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
    }else{
        res.redirect('/view/user_post_'+req.session.passport.user);
    }
});

module.exports = router;