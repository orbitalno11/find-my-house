const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let howto = new Schema({
    title: String,
    description: String,
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('howto', howto);