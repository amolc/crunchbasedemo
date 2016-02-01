var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();

var crunchbase = require('crunchbase2');

crunchbase.init('43e29d431e62c74c0cbcc52a041cb875');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'mobile')));

app.use(bodyParser.json({limit: '50mb'}));

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
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

app.use('/', express.static(__dirname + '/public'));
app.use('/api', express.static(__dirname + '/api'));
app.use('/mobile', express.static(__dirname + '/mobile/www'));

var crunch = require('./api/cruchsample.js');
/*var userlogin = require('./api/userlogin.js');
var todos = require('./api/todos.js');
var device_register = require('./api/device_register.js');
var sendpushnotification = require('./api/sendpushnotification.js')*/

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*","*/*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //res.header("content-encoding", "gzip");
  next();
});

/*app.post('/api/login', userlogin.login);
app.post('/api/addtodos',todos.addtodos);
app.post('/api/gettodos',todos.gettodos);
app.post('/api/gettododetails',todos.gettododetails);
app.post('/api/updatetodos',todos.updatetodos);
app.post('/api/deletetodo',todos.deletetodo);
app.post('/api/deviceregister',device_register.deviceregister);
app.post('/api/signup',userlogin.signup);*/
//app.get('/api/sendnotification',sendpushnotification.sendnotification);

app.post('/api/getsamplecompany',crunch.getsamplecompany);

module.exports = app;
