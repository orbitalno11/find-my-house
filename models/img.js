const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const multer = require('multer');
fs = require('fs-extra');
let image = require('./imageSchema');
router.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId

const myurl = 'mongodb://localhost:27017';
const dbname = 'FindMyHouse2';
const collectionname = 'images';

// const myurl = 'mongodb+srv://stn:' + encodeURIComponent('stn1998') + '@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true';
// const dbname = 'findmyhouse';
// const collectionname = 'images';

MongoClient.connect(myurl, (err, client) => {
  if (err) return console.log(err)
  db = client.db(dbname);
})

router.get('/:id', (req, res) => {
  let filename = req.params.id;

  db.collection('collectionname').findOne({ '_id': ObjectId(filename) }, (err, result) => {

    if (err) return console.log(err)

    res.contentType('image/jpeg');
    res.send(result.image.buffer);


  })
})

router.get('/userpic/:name', (req, res) => {
  let name = req.params.name;

  db.collection('users').findOne({ 'pic.filename': name }, (err, result) => {
    if (err) return console.log(err)

    // console.log(result);
    res.contentType('image/jpeg');
    res.send(result.pic.image.buffer);
  })
})

router.get('/postpic/:name', (req, res) => {
  let name = req.params.name;

  db.collection('posts').findOne({ 'pic.filename': name }, (err, result) => {
    if (err) return console.log(err)

    // console.log(result);
    res.contentType('image/jpeg');
    res.send(result.pic.image.buffer);
  })
})

module.exports = router;
