const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let foundation = new Schema({
    name: String,
    description: String,
    contact: {
        phone: String,
        address: String
    },
    pic: {
        filename: {
            type: String
        },
        contentType: String,
        image: Buffer
    }
});

module.exports = mongoose.model('foundation', foundation);