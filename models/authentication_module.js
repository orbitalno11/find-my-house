const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

let User = require('./user_schema');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

function checkLogIn(req,res){
    if(req.isAuthenticated()){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    passport,
    passportLocalMongoose,
    isLoggedIn,
    User,
    checkLogIn
};