var express = require('express'),
    router = express.Router(),
    path = require('path'),
    mysql      = require('mysql'),
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'automarket'
    });

    connection.connect();

/* Capitalize the first letter of each word. */
function capitalize (string) {
    return string.replace(/\b([a-z])/gi, function (val) { return val.toUpperCase() })
};

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
            list[rows[obj].maker].models.push(capitalize(rows[obj].model));
        }
        //render view
        res.render('index', { title: 'List of Auto', list: list });
    });
});

/* GET admin page. */
router.get('/signin', function(req, res) {
    res.render('signin', { title: "Admin Panel" });
});

router.post('/signin/adminpanel', function(req, res) {
    var user = {
        name: false,
        pass: false
    };
    connection.query('SELECT u.username FROM users u ' +
                     'WHERE u.username = "' + req.body.username + '"', function(err, rows) {
        if (err) throw err;

        if (rows.length) {
            user.name = true;
        }
    });
    connection.query('SELECT u.password FROM users u ' +
                     'WHERE u.username = "' + req.body.username + '" AND u.password = "' + req.body.password + '"', function(err, rows) {
        if (err) throw err;

        if (rows.length && user.name) {
            user.pass = true;
            res.status(200).send(user);
        } else {
            res.status(401).send(user);
        }
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
            list[rows[obj].maker].push({"model": capitalize(rows[obj].model), "imgurl": rows[obj].imgurl});
        }
        //render view
        res.render('models', {title: "Models", list: list, allModels: true });
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
        //render view
        res.render('parts', { title: "List of Parts", list: list });
    });
});

/* GET exact maker page. */
router.get('/:maker', function(req, res, next) {
    connection.query('SELECT a.name maker, m.name model, m.imgurl imgurl FROM models m INNER JOIN auto a ON m.auto_id = a.id WHERE a.name ="' + req.params.maker + '"', function(err, rows) {
        var list = {};
        if (err) throw err;

        if (rows.length) {
            //create json
            for (obj in rows){
                if (!list[rows[obj].maker]){
                    list[rows[obj].maker] = [];
                }
                list[rows[obj].maker].push({"model": rows[obj].model, "imgurl": rows[obj].imgurl});
            }
            //render view
            res.render('models', { title: capitalize(req.params.maker) + ' Models', list: list });
        } else {
            next();
        }
    });
});

/* GET exact model with list of year page. */
router.get('/:maker/:model', function(req, res, next) {
    connection.query('SELECT m.name model, m.imgurl imgurl, y.year year ' +
                     'FROM models m INNER JOIN years y ' +
                     'ON y.model_id = m.id ' +
                     'WHERE m.name ="' + req.params.model + '"', function(err, rows) {
        var list = {};
        if (err) throw err;

        if (rows.length) {
            //create json
            list.model = rows[0].model;
            list.imgurl = rows[0].imgurl;
            list.year = [];
            for (var i = 0; i < rows.length; i++) {
                list.year.push(rows[i].year);
            }
            list.year.sort();
            //render view
            res.render('years', { title: capitalize(req.params.maker) + " " + capitalize(req.params.model), list: list });
        } else {
            res.render('noparts', { message: "Sorry, but we have no parts for this car.", noParts: true});
        }
    });
});

/* GET detail page of model with list of parts. */
router.get('/:maker/:model/:year', function(req, res, next) {
    connection.query('SELECT m.name model, m.imgurl imgurl, y.year year, p.name name, p.description des, p.price price ' +
                     'FROM models m INNER JOIN years y INNER JOIN parts p INNER JOIN yearpart yp ' +
                     'ON yp.year_id = y.id AND yp.part_id = p.id AND y.model_id = m.id ' +
                     'WHERE y.year ="' + req.params.year + '"', function(err, rows) {
        var list = {};
        if (err) throw err;

        if (rows.length) {
            //create json
            list.model = rows[0].model;
            list.imgurl = rows[0].imgurl;
            list.year = rows[0].year;
            list.parts = [];

            for (obj in rows){
                var part = {};
                part.name = rows[obj].name;
                part.des = rows[obj].des;
                part.price = rows[obj].price;
                list.parts.push(part);
            }
            //render view
            res.render('detail', { title: capitalize(req.params.maker) + " " + capitalize(req.params.model), list: list });
        } else {
            res.render('noparts', { message: "Sorry, but we have no parts for this car.", noParts: true});
        }
    });
});

router.post('/saveMaker', function(req, res) {
    var data = req.body;

    res.send(data);

    /*
    connection.query('SELECT u.username FROM users u ' +
    'WHERE u.username = "' + req.body.username + '"', function(err, rows) {
        if (err) throw err;

        if (rows.length) {
            user.name = true;
        }
    });
    connection.query('SELECT u.password FROM users u ' +
    'WHERE u.username = "' + req.body.username + '" AND u.password = "' + req.body.password + '"', function(err, rows) {
        if (err) throw err;

        if (rows.length && user.name) {
            user.pass = true;
            res.status(200).send(user);
        } else {
            res.status(401).send(user);
        }
    });*/
});

module.exports = router;