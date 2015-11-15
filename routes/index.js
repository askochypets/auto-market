var express = require('express'),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./db/auto.db');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Auto list' });
});

/* GET other page. */

router.get('/:auto', function(req, res, next) {
  res.render(req.params.auto, { title: req.params.auto });  
  // db.run('SELECT name FROM auto where id="5"', function(err) {
  //   if(err !== null) {
  //     // Express handles errors via its next function.
  //     // It will call the next operation layer (middleware),
  //     // which is by default one that handles errors.

  //     next(err);
  //   }
  //   else {
      
  //   }
  // });
});

module.exports = router;
