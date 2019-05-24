const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/FindMyHouse2');

const connectString = 'mongodb+srv://stn:<Sitnon@2541>@cluster0-mb8sl.gcp.mongodb.net/test?retryWrites=true';
mongoose.connect(connectString);

const Schema = mongoose.Schema;

let Post = new Schema({
    petType: String,
    postType: String,
    identity: String,
    moreDetail: String,
    species: String,
    petStatus: String,
    moreContact: String,
    owner: String
});

module.exports = mongoose.model('Post',Post);
