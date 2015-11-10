var express = require('express'),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('auto.db');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET other page. */

router.get('/:mark', function(req, res, next) {
  res.render(req.params.mark, { title: req.params.mark });
  // db.all('SELECT name FROM auto WHERE id="1"', function(err, rows) {
  //   if(err !== null) {
  //     // Express handles errors via its next function.
  //     // It will call the next operation layer (middleware),
  //     // which is by default one that handles errors.
  //     next(err);
  //   }
  //   else {
  //     console.log("-------------------------------------------")
      
  //   }
  // });
});

module.exports = router;
