const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let howto = new Schema({
    title: String,
    description: String,
    created:{
        type: Date,
        default: Date.now
    },
    pic: {
        filename: {
            type: String
        },
        contentType: String,
        image: Buffer
    }
});

module.exports = mongoose.model('howto', howto);