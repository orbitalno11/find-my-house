const express = require('express');
const path = require('path');
const router = express.Router();

let howto = require('./howto_schema');
let authentication = require('./authentication_module');
let uploadpic = require('./upload_module');
let User = require('./user_schema');

router.use(express.static(path.resolve('./public')));

router.get('/', (req, res) => {
    howto.find({}, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            if (authentication.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('howto', { data: data, authen: true, user: user });
                    }
                });

            } else {
                res.render('howto', { data: data, authen: false, user: null });
            }
        }
    });
});

router.get('/list', authentication.isLoggedIn, (req, res) => {
    authentication.isAdmin(req, (state) => {
        if (state) {
            howto.find({}, null, { sort: { created: -1 } }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.redirect('/signin');
                } else {
                    res.render('howtoList', { data: data });
                }
            });
        } else {
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

router.post('/create', authentication.isLoggedIn, uploadpic.upload.single('picture'), (req, res) => {
    let imgfile = uploadpic.uploadIMG(req, res);
    let howtoData = {
        title: req.body.title,
        description: req.body.description,
        pic: imgfile
    };

    authentication.isAdmin(req, (state) => {
        if (state) {
            howto.create(howtoData);
            res.redirect('/howto/list');
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
        } else {
            res.redirect('/signin');
        }
    });
});

router.post('/edit/:id', authentication.isLoggedIn, uploadpic.upload.single('picture'), (req, res) => {
    let id = req.params.id;
    let imgfile = uploadpic.uploadIMG(req, res);

    let howtoData = {
        name: req.body.title,
        description: req.body.description,
    };

    if (imgfile != false) {
        howtoData.pic = imgfile;
    }

    authentication.isAdmin(req, (state) => {
        if (state) {
            howto.findByIdAndUpdate(id, howtoData, (err, update) => {
                if (err) {
                    console.log(err);
                    res.redirect('/signin');
                } else {
                    res.redirect('/howto/' + id);
                }
            });
        } else {
            res.redirect('/signin');
        }
    });

});

router.get('/delete/:id', authentication.isLoggedIn, (req, res) => {
    let id = req.params.id;

    authentication.isAdmin(req, (state) => {
        if (state) {
            howto.findByIdAndDelete(id, (err, del) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/howto/list');
            });
        } else {
            res.redirect('/sigin');
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