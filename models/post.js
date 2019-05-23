const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FindMyHouse2');

const Schema = mongoose.Schema;

let Post = new Schema({
    postType: String,
    identity: String,
    morDetail: String,
    species: String,
    
});

module.exports = mongoose.model('Post',Post);
