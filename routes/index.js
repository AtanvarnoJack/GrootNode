var express = require('express');
var router = express.Router();
var credentials = require('../amzWs/credentials_template');
var mailgun = require('mailgun-js')({apiKey: credentials.api_key, domain: credentials.domain});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index', active:'/' });
});

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

module.exports = router;
