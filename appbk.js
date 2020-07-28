var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

var bodyParser = require('body-parser');
var session = require('express-session');

var loginRouter = require('./routes/merchant/login');
var indexRouter = require('./routes/merchant/index');
var userInfoRouter = require('./routes/merchant/userInfo');
var orderRouter = require('./routes/merchant/order');
var commodityRouter = require('./routes/merchant/commodity');

var app = express();
app.use(session({
  secret:'blog',
  cookie:{maxAge:1000*60*24*30},
  resave: false,
  saveUninitialized: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//添加ejs模板引擎解析
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/merchant/index', indexRouter);
app.use('/merchant/login', loginRouter);
app.use('/merchant/userInfo', userInfoRouter);
app.use('/merchant/order', orderRouter);
app.use('/merchant/commodity', commodityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

app.listen(3001,function(){
  console.log('listening port 3001');
});

module.exports = app;
