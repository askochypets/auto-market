var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET other page. */

router.get('/:mark', function(req, res, next) {
  db.all('SELECT * FROM auto', function(err, row) {
    if(err !== null) {
      // Express handles errors via its next function.
      // It will call the next operation layer (middleware),
      // which is by default one that handles errors.
      next(err);
    }
    else {
      console.log(row);
      res.render('index', { title: 'Express' });
    }
  });
});

module.exports = router;
