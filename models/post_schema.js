const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Post = new Schema({
    petType: String,
    postType: String,
    postStatus: String,
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
    created: {
        type: Date,
        default: Date.now
    },
    reporter: {
        type: String,
        default: null
    },
    reportDate: {
        type: Date,
        default: null
    },
    reportContact: {
        email: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        }
    }
});

module.exports = mongoose.model('Post', Post);
