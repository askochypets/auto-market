var express = require('express'),
    router = express.Router(),
    mysql      = require('mysql'),
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'dbuser',
        password : 's3kre7'
    });

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Auto list' });
});

/* GET other page. */

router.get('/:auto', function(req, res, next) {
  res.render(req.params.auto, { title: req.params.auto });
    //connection.connect();
    //
    //connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    //    if (err) throw err;
    //    console.log('The solution is: ', rows[0].solution);
    //});
    //
    //connection.end();
});

module.exports = router;
