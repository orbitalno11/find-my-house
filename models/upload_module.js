const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const multer = require('multer');
fs = require('fs-extra');
// let image = require('./imageSchema');
router.use(bodyParser.urlencoded({ extended: true }))

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let upload = multer({ storage: storage })


function uploadIMG(req, res) {

    try {
        let img = fs.readFileSync(req.file.path);
        let encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database

        let finalImg = {
            filename: req.file.filename,
            contentType: req.file.mimetype,
            image: new Buffer(encode_image, 'base64')
        };

        return finalImg;
    }catch(e){
        return false;
    }

    
}

module.exports = {
    upload,
    uploadIMG
};