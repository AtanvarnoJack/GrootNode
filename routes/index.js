var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index', active:'/' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', active:'/about'  });
});

/* GET Product page. */
router.get('/produits', function(req, res, next) {
  res.render('produits', { title: 'Produits', active:'/produits'  });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', active:'/contact'  });
});

module.exports = router;
