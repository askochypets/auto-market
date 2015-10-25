var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fiat', function(req, res, next) {
  res.render('fiat', { title: 'Fiat' });
});

router.get('/citroen', function(req, res, next) {
  res.render('citroen', { title: 'Citroen' });
});

router.get('/ford', function(req, res, next) {
  res.render('ford', { title: 'Ford' });
});

router.get('/peugeot', function(req, res, next) {
  res.render('peugeot', { title: 'Peugeot' });
});

router.get('/renault', function(req, res, next) {
  res.render('renault', { title: 'Renault' });
});

router.get('/mercedes', function(req, res, next) {
  res.render('mercedes', { title: 'Mercedes' });
});

module.exports = router;
