const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Post = new Schema({
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
    },
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post',Post);
