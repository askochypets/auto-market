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
    connection.query('SELECT a.name maker, m.name model, a.imgurl imgurl FROM models m INNER JOIN auto a ON m.auto_id = a.id;', function(err, rows) {
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
    connection.query('SELECT a.name maker, m.name model, m.imgurl imgurl FROM models m INNER JOIN auto a ON m.auto_id = a.id;', function(err, rows) {
        var list = {};
        if (err) throw err;

        //create json
        for (obj in rows){
            if (!list[rows[obj].maker]){
                list[rows[obj].maker] = [];
            }
            list[rows[obj].maker].push({"model": rows[obj].model, "imgurl": rows[obj].imgurl});
        }

        //render view
        res.render('models', { list: list });
    });
});

/* GET full list of parts. */
router.get('/parts', function(req, res) {
    connection.query('SELECT p.name name, p.description des, p.price price FROM parts p;', function(err, rows) {
        var list = [];
        if (err) throw err;

        //create json
        for (obj in rows){
            list.push(rows[obj]);
        }

        res.render('parts', { title: "List of Parts", list: list });
    });
});

/* GET exact maker page. */
router.get('/:maker', function(req, res, next) {
    connection.query('SELECT a.name maker, m.name model, m.imgurl imgurl FROM models m INNER JOIN auto a ON m.auto_id = a.id WHERE a.name ="' + req.params.maker + '"', function(err, rows) {
        var list = {};
        if (err) throw err;

        //create json
        for (obj in rows){
            if (!list[rows[obj].maker]){
                list[rows[obj].maker] = [];
            }
            list[rows[obj].maker].push({"model": rows[obj].model, "imgurl": rows[obj].imgurl});
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
    connection.query('SELECT a.name maker, m.name model, m.imgurl imgurl FROM models m INNER JOIN auto a ON m.auto_id = a.id WHERE a.name ="' + req.params.maker + '" AND m.name ="' + req.params.model + '"', function(err, rows) {
        var list = {};
        if (err) throw err;

        //create json
        list.maker = rows[0].maker;
        list.model = rows[0].model;
        list.imgurl = rows[0].imgurl;

        if (JSON.stringify(list) !== "{}") {
            //render view
            res.render('detail', { title: req.params.maker + " " + req.params.model, list: list });
        } else {
            next();
        }
    });
});

module.exports = router;