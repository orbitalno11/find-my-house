const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

let User = require('./user_schema');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

function checkLogIn(req, res) {
    if (req.isAuthenticated()) {
        return true;
    } else {
        return false;
    }
}

function isAdmin(req, fn) {
    let user = req.session.passport.user;
    let adminState;

    if (req.isAuthenticated()) {
        User.findOne({ username: user }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(data.status);
                // fn(data.status);
                if (data.status === 'admin') {
                    adminState = true;
                    // console.log('isad1'+adminState);
                    return fn(adminState);
                }else{
                    adminState = false;
                    // console.log('isad2'+adminState);
                    return fn(adminState);
                }
            }
        });
    }else{
        adminState = false;
        // console.log('isad3'+adminState);
        return fn(adminState);
    }
}

module.exports = {
    passport,
    passportLocalMongoose,
    isLoggedIn,
    User,
    checkLogIn,
    isAdmin
};