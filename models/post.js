const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FindMyHouse2');

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
