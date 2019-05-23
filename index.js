const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const portNumber = process.env.PORT || 9000;

let User = require('./models/user');

mongoose.connect('mongodb://localhost/FindMyHouse2');

const app = express();
app.set('view engine','ejs');
app.use(BodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(require('express-session')({
    secret: 'Find My House',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/foundation',(req,res)=>{
    res.render('foundation');
});

app.get('/howto',(req,res)=>{
    res.render('howto');
});

app.get('/cat',(req,res)=>{
    res.render('cat');
});

app.get('/dog',(req,res)=>{
    res.render('dog');
});

app.get('/aboutus',isLoggedIn, (req,res)=>{
    res.render('aboutUs');
});

app.get('/signin',(req,res)=>{
    res.render('signin');
});

app.post('/signin',passport.authenticate('local',{
    successRedirect : '/aboutus',
    failureRedirect: '/signup'
}) , (req,res)=>{

});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.post('/signup',(req,res)=>{
    let userData = {
        username : req.body.username,
        name : req.body.name,
        lname : req.body.lname,
        gender : req.body.gender,
        address : req.body.address,
        village : req.body.village,
        road : req.body.road,
        subdistrict : req.body.subdistrict,
        district : req.body.district,
        province : req.body.province,
        zipcode : req.body.zipcode
        // password : req.body.password
    };

    User.register(new User(userData), req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/');
        });
    });
});


app.get('/signout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

app.get('*',(req,res)=>{
    res.send('NOT FOUND');
});

app.listen(portNumber,()=>{
    console.log('SERVER WAS STARTED');
});