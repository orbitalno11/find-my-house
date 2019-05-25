const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/FindMyHouse2');
const connectString = 'mongodb+srv://stn:' + encodeURIComponent('stn1998') + '@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true';
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
    owner: String,
    pic: {
        filename: {
            type: String
        },
        contentType: String,
        image: Buffer
    }
});

module.exports = mongoose.model('reportPost',reportPost);