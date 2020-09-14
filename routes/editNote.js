var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
  var db = req.db;

  var collection = db.get('files');
  collection.find({}, {}, function (e, docs) {
    var note = {
      "fileStore": docs,
      "id": req.params.id
    }
    res.render('editNote', note);
  });
});

module.exports = router;