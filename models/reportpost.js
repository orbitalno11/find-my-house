const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/FindMyHouse2');
const connectString = 'mongodb://stn:' + encodeURIComponent('<stn1998>') + '@cluster0-mb8sl.gcp.mongodb.net:27017/findmyhouse';
mongoose.connect(connectString);

const Schema = mongoose.Schema;

let reportPost = new Schema({
    petType: String,
    postType: String,
    identity: String,
    moreDetail: String,
    species: String,
    petStatus: String,
    moreContact: String,
    owner: String
});

module.exports = mongoose.model('reportPost',reportPost);