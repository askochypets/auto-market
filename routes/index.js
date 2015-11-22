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

router.get('/', function(req, res, next) {
    connection.query('SELECT a.name maker, a.imgurl imgurl, m.name model FROM models m INNER JOIN auto a ON m.auto_id = a.id;', function(err, rows) {
        var list = {};
        if (err) throw err;

        //create json
        for (obj in rows){
            if (!list[rows[obj].maker]){
                list[rows[obj].maker] = {imgurl: '', models: []};
            }
            list[rows[obj].maker].imgurl = rows[obj].imgurl;
            list[rows[obj].maker].models.push(rows[obj].model);
        }

        //render view
        res.render('index', { title: 'List of Auto', list: list });
    });
});

/* GET all models page. */

router.get('/models', function(req, res) {
    connection.query('SELECT a.name maker, m.name model FROM models m INNER JOIN auto a ON m.auto_id = a.id;', function(err, rows) {
        var list = {};

        if (err) throw err;
        //create json
        for (obj in rows){
            if (!list[rows[obj].maker]){
                list[rows[obj].maker] = [];
            }
            list[rows[obj].maker].push(rows[obj].model);
        }
        console.log(list);
        //render view
        res.render('models', { list: list });
    });
});

module.exports = router;


/* GET exact maker page. */

router.get('/:maker', function(req, res, next) {
    connection.query('SELECT a.name maker, m.name model FROM models m INNER JOIN auto a ON m.auto_id = a.id WHERE a.name ="' + req.params.maker + '"', function(err, rows) {
        var list = {};

        if (err) throw err;
        //create json
        for (obj in rows){
            if (!list[rows[obj].maker]){
                list[rows[obj].maker] = [];
            }
            list[rows[obj].maker].push(rows[obj].model);
        }
        if (JSON.stringify(list) !== "{}") {
            //render view
            res.render('models', { title: req.params.maker + ' Models', list: list });
        } else {
            next();
        }
    });
});

/* GET exact model page. */

router.get('/:maker/:model', function(req, res, next) {
    connection.query('SELECT a.name maker, m.name model FROM models m INNER JOIN auto a ON m.auto_id = a.id WHERE a.name ="' + req.params.maker + '" AND m.name ="' + req.params.model + '"', function(err, rows) {
        var list = {};

        if (err) throw err;
        //create json
        list.maker = rows[0].maker;
        list.model = rows[0].model;

        console.log(list);
        if (JSON.stringify(list) !== "{}") {
            //render view
            res.render('parts', { title: req.params.maker + " " + req.params.model, list: list });
        } else {
            next();
        }
    });
});

module.exports = router;
