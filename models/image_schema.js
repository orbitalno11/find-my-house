const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Image = new Schema({
    filename: {
        type: String
        // unique: true
    },
    contentType: String,
    image: Buffer
});

module.exports = mongoose.model('Image', Image);