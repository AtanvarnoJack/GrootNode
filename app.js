var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');


var dbConfig = require('./config/database.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

var passport = require('passport');
var expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({secret:'MySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var initPassport = require('./config/initPassport');
initPassport(passport);

var routes = require('./routes/index')(passport);
var product = require('./routes/product');
var users = require('./routes/users');
var amazon = require('./routes/amazon');

app.use('/', routes);
app.use('/users', users);
app.use('/produits', product);
app.use('/amazon', amazon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404', {

  })
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
