const express = require('express');
const path = require('path');
const router = express.Router();

let post = require('./post_schema');
let authentication = require('./authentication_module');
let User = require('./user_schema');
let foundation = require('./foundation_schema');
let howto = require('./howto_schema');

router.use(express.static(path.resolve('./public')));

router.post('/cat', (req, res) => {
    let value = req.body.search;
    // console.log(value);

    post.find({ petType: 'cat', species: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            if (authentication.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('searchResult', { data: data, authen: true, user: user });
                    }
                });

            } else {
                res.render('searchResult', { data: data, authen: false, user: null });
            }
        }
    });
});

router.post('/dog', (req, res) => {
    let value = req.body.search;
    // console.log(value);

    post.find({ petType: 'dog', species: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            if (authentication.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('searchResult', { data: data, authen: true, user: user });
                    }
                });

            } else {
                res.render('searchResult', { data: data, authen: false, user: null });
            }
        }
    });
});

router.post('/foundation', (req, res) => {
    let value = req.body.search;

    foundation.find({ name: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            if (authentication.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('foundationSearch', { data: data, authen: true, user: user });
                    }
                });

            } else {
                res.render('foundationSearch', { data: data, authen: false, user: null });
            }
        }
    });
});

router.post('/howto', (req, res) => {
    let value = req.body.search;

    howto.find({ title: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            if (authentication.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('howtoSearch', { data: data, authen: true, user: user });
                    }
                });

            } else {
                res.render('howtoSearch', { data: data, authen: false, user: null });
            }
        }
    });
});

router.post('/report', (req, res) => {
    let value = req.body.search;

    if (authentication.isAdmin(req, (state) => {
        if (state) {
            post.find({ postStatus: 'ถูกแจ้งผิดกฎ', owner: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/');
                } else {
                    if (authentication.checkLogIn(req, res)) {
                        User.findOne({ username: req.session.passport.user }, (err, user) => {
                            if (err) {
                                console.log(err);
                                res.redirect('/');
                            } else {
                                res.render('reportSearch', { postdata: data, authen: true, userdata: user });
                            }
                        });

                    } else {
                        res.render('reportSearch', { postdata: data, authen: false, userdata: null });
                    }
                }
            });
        } else {
            res.redirect('/sign');
        }
    }));
});

router.post('/changeState', (req, res) => {
    let value = req.body.search;

    if (authentication.isAdmin(req, (state) => {
        if (state) {
            post.find({ postStatus: 'ปิดโพสต์', owner: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/');
                } else {
                    if (authentication.checkLogIn(req, res)) {
                        User.findOne({ username: req.session.passport.user }, (err, user) => {
                            if (err) {
                                console.log(err);
                                res.redirect('/');
                            } else {
                                res.render('changeStateSearch', { postdata: data, authen: true, userdata: user });
                            }
                        });

                    } else {
                        res.render('changeStateSearch', { postdata: data, authen: false, userdata: null });
                    }
                }
            });
        } else {
            res.redirect('/sign');
        }
    }));
});

router.post('/editHowto', (req, res) => {
    let value = req.body.search;

    if (authentication.isAdmin(req, (state) => {
        if (state) {
            howto.find({ title: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/');
                } else {
                    if (authentication.checkLogIn(req, res)) {
                        User.findOne({ username: req.session.passport.user }, (err, user) => {
                            if (err) {
                                console.log(err);
                                res.redirect('/');
                            } else {
                                res.render('howtoEsearch', { data: data, authen: true, userdata: user });
                            }
                        });

                    } else {
                        res.render('howtoEsearch', { data: data, authen: false, userdata: null });
                    }
                }
            });
        } else {
            res.redirect('/sign');
        }
    }));
});

router.post('/editFoundation', (req, res) => {
    let value = req.body.search;

    if (authentication.isAdmin(req, (state) => {
        if (state) {
            foundation.find({ name: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/');
                } else {
                    if (authentication.checkLogIn(req, res)) {
                        User.findOne({ username: req.session.passport.user }, (err, user) => {
                            if (err) {
                                console.log(err);
                                res.redirect('/');
                            } else {
                                res.render('foundationEsearch', { data: data, authen: true, userdata: user });
                            }
                        });

                    } else {
                        res.render('foundationEsearch', { data: data, authen: false, userdata: null });
                    }
                }
            });
        } else {
            res.redirect('/sign');
        }
    }));
});

router.post('/mypost', (req, res) => {
    let value = req.body.search;
    // console.log(value);

    post.find({ owner: req.session.passport.user, species: new RegExp(value, "i") }, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            if (authentication.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('historySearch', { postdata: data, authen: true, userdata: user });
                    }
                });

            } else {
                res.render('historySearch', { postdata: data, authen: false, userdata: null });
            }
        }
    });
});

module.exports = router;