var express = require('express');
const {
  ObjectId
} = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'testttt'
  });
});

router.get('/folders', function (req, res, next) {
  var db = req.db;

  var collection = db.get('files');
  collection.find({}, {}, function (e, docs) {
    res.render('folders', {
      "fileStore": docs
    });
  });
});

router.post('/updateNote', function (req, res) {
  var db = req.db;

  var change = req.body.currentId;
  var title = req.body.title;
  var content = req.body.content;
  const today = new Date();
  let month;
  if (today.getMonth() + 1 < 10) {
    month = "0" + (today.getMonth() + 1)
  } else {
    month = today.getMonth() + 1
  }
  const date = today.getDate() + ":" + month + ":" + today.getFullYear()
  console.log(req.body.title)
  var collection = db.get('files');
  collection.update({
    title: change
  }, {$set:{
    "title": title,
    "content": content,
    "date": date,
    "type": "file"
  }}, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database. v2");
    } else {
      res.redirect("folders");
    }
  });
});

module.exports = router;