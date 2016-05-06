var express = require('express');
var router = express.Router();
var credentials = require('../amzWs/credentials_template');
var mailgun = require('mailgun-js')({apiKey: credentials.api_key, domain: credentials.domain});

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index', active:'/' });
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash : true
}));

/* GET signup page */
router.get('/signup', function(req, res, next){
  res.render('signup', { title: 'Signup', message: req.flash('message')});
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash : true
}));

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', active:'/about'  });
});

/* GET Contact page. */
router.post('/mail', function(req, res, next)
{
  var data = {
    from: req.param('email'),
    to: 'lea.laplise@gmail.com',
    subject: req.param('subject'),
    text: req.param('message')
  };

  mailgun.messages().send(data, function (err, body)
  {
      if (err) {
          res.render('mail', { error : err, alert: 'error'});
          console.log("got an error: ", err);
      }
      else {
          res.render('mail', { alert: 'success' });
          console.log(body);
      }
  });
});
return router
}
