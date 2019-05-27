const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');
const path = require('path');
const portNumber = process.env.PORT || 9000;
const connectString = 'mongodb+srv://stn:' + encodeURIComponent('stn1998') + '@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true';
mongoose.connect(connectString);
// const mongoURI = 'mongodb://localhost/FindMyHouse2';
// mongoose.connect(mongoURI);

let User = require('./models/user_schema');
let create = require('./models/create_route');
let authenticattion = require('./models/authentication_module');
let post = require('./models/post_schema');
let view = require('./models/view_route');
let takecare = require('./models/takecare_route');
let img = require('./models/img_route');
let uploadpic = require('./models/upload_module');
let userRoute = require('./models/user_route');
let edit = require('./models/edit_route');
let remove = require('./models/delete_module');
let admin = require('./models/admin_route');
let foundation = require('./models/foundation_route');
let howtoroute = require('./models/howto_route');
let howto = require('./models/howto_schema');
let foundationSchema = require('./models/foundation_schema');

const app = express();
app.set('view engine', 'ejs');
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.resolve('./public')));

app.use(require('express-session')({
    secret: 'Find My House',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/create', create);
app.use('/view', view);
app.use('/takecare', takecare);
app.use('/image', img);
app.use('/user', userRoute);
app.use('/edit', edit);
app.use('/delete', remove);
app.use('/admin', admin);
app.use('/foundation', foundation);
app.use('/howto', howtoroute);

app.get('/', (req, res) => {
    post.find({}, null, { sort: { created: -1 }, limit: 6 }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            foundationSchema.find({}, null, { sort: { _id: -1 }, limit: 10 }, (err, data2) => {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    if (authenticattion.checkLogIn(req, res)) {
                        User.findOne({ username: req.session.passport.user }, (err, user) => {
                            if (err) {
                                console.log(err);
                                res.redirect('/');
                            } else {
                                res.render('home', { postdata: data, howtodata: data2, authen: true, user: user });
                            }
                        });

                    } else {
                        res.render('home', { postdata: data, howtodata: data2, authen: false, user: null });
                    }

                }
            });
        }
    });
});

app.get('/cat', (req, res) => {

    post.find({ petType: 'cat' }, null, { sort: { created: -1 } }, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            if (authenticattion.checkLogIn(req, res)) {
                User.findOne({ username: req.session.passport.user }, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('cat', { data: data, authen: true, user: user });
                    }
                });

            } else {
                res.render('cat', { data: data, authen: false, user: null });
            }
        }
    });
});

app.get('/dog', (req, res) => {
    res.render('dog');
});

app.get('/aboutus', authenticattion.isLoggedIn, (req, res) => {
    res.render('aboutUs');
});

app.get('/signin', (req, res) => {
    if (req.isAuthenticated()) {
        let profile = '/user/' + req.session.passport.user;
        res.redirect(profile);
    } else {
        res.render('signin');
    }
});

app.post('/signin', authenticattion.passport.authenticate('local', {
    successRedirect: '/signin',
    failureRedirect: '/signin'
}), (req, res) => {

});

app.get('/signup', (req, res) => {
    if (authenticattion.checkLogIn(req, res)) {
        res.redirect('/user/' + req.session.passport.user);
    } else {
        res.render('signup');
    }

});

app.post('/signup', uploadpic.upload.single('picture'), (req, res) => {

    let imgfile = uploadpic.uploadIMG(req, res);

    let userData = {
        username: req.body.username,
        name: req.body.name,
        lname: req.body.lname,
        gender: req.body.gender,
        address: req.body.address,
        village: req.body.village,
        road: req.body.road,
        subdistrict: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        pic: imgfile,
        status: req.body.status
        // password : req.body.password
    };

    // console.log(userData);

    User.register(new User(userData), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
});

app.get('/report_:id', (req, res) => {
    let id = req.params.id;

    post.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('back');
        } else {
            res.render('reportform', { postdata: data });
        }
    });
})

app.post('/report/:id', (req, res) => {
    let id = req.params.id;
    let reportData = {
        reporter: req.body.reporter,
        reportDate: Date.now(),
        reportContact: {
            email: req.body.reporterEmail,
            phone: req.body.reporterPhone
        },
        postStatus: 'ถูกแจ้งผิดกฎ'
    };

    post.findByIdAndUpdate(id, reportData, (err, update) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect('/view/post_' + id);

});

app.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.send('NOT FOUND');
});

app.listen(portNumber, () => {
    console.log('SERVER WAS STARTED');
});