const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username : String,
    name : String,
    lname : String,
    gender : String,
    adress : String,
    village : String,
    road : String,
    subdistrict : String,
    district : String,
    province : String,
    zipcode : String,
    password : String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);