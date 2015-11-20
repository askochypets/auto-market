var express = require('express'),
    router = express.Router(),
    mysql      = require('mysql'),
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'automarket'
    });

    connection.connect();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Auto list' });
});

/* GET other page. */

router.get('/models', function(req, res) {
    connection.query('SELECT a.name maker, m.name model FROM models m INNER JOIN auto a ON m.auto_id = a.id;', function(err, rows) {
        if (err) throw err;
        var list = {};


        for (var obj in rows) {
            
        }

    });
    connection.end();
    res.render('models', { title: 'mercedes benz' });



});

module.exports = router;
