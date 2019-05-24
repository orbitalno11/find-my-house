const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');
// const path = require('path');
const portNumber = process.env.PORT || 9000;

const multer = require('multer');
const fs = require('fs-extra');
const connectString = 'mongodb+srv://stn:' + encodeURIComponent('stn1998') + '@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true';
mongoose.connect(connectString);
// const mongoURI = 'mongodb://localhost/FindMyHouse3';
// mongoose.connect(mongoURI);

let User = require('./models/user');
let createpost = require('./models/create_module');
let authenticattion = require('./models/authentication');
let post = require('./models/post');
let view = require('./models/view_data');
let takecare = require('./models/takecare');
let reportpost = require('./models/reportpost');
let img = require('./models/img');

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

app.use('/createpost', createpost);
app.use('/view', view);
app.use('/takecare', takecare);
app.use('/image', img);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let upload = multer({ storage: storage })

// express.static(path.resolve(__dirname, '..', '../public'))
// var path = require('path');


// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect('/signin');
// }

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/foundation', (req, res) => {
    res.render('foundation');
});

app.get('/howto', (req, res) => {
    res.render('howto');
});

app.get('/cat', (req, res) => {
    post.find((err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            res.render('cat', { data: data });
            // console.log(req.session);
        }
    });
    // res.render('cat');
});

app.get('/dog', (req, res) => {
    res.render('dog');
});

app.get('/aboutus', authenticattion.isLoggedIn, (req, res) => {
    res.render('aboutUs');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.post('/signin', authenticattion.passport.authenticate('local', {
    successRedirect: '/aboutus',
    failureRedirect: '/signup'
}), (req, res) => {

});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', upload.single('picture'), (req, res) => {
    let image = fs.readFileSync(req.file.path);
    let encode_image = image.toString('base64');
    let imgfile = {
        filename: req.file.filename,
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, 'base64')
    };

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
        pic: imgfile
        // password : req.body.password
    };

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

app.get('/report/:id', (req, res) => {
    let id = req.params.id;
    let postdata;

    post.findByIdAndDelete(id, (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        } else {
            postdata = data.toJSON();
            reportpost.create(postdata);
        }
    });

    res.redirect('/cat');
});

app.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.get('*', (req, res) => {
    res.send('NOT FOUND');
});

app.listen(portNumber, () => {
    console.log('SERVER WAS STARTED');
});