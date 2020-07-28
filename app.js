var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require('moment');

var loginRouter = require('./routes/merchant/login');
var registerMerchantRouter = require('./routes/merchant/register');
var indexRouter = require('./routes/merchant/index');
var userInfoRouter = require('./routes/merchant/userInfo');
var orderRouter = require('./routes/merchant/order');
var commodityRouter = require('./routes/merchant/commodity');
var indexUserRouter = require('./routes/user/index');
var orderUserRouter = require('./routes/user/order');
var userinfoUserRouter = require('./routes/user/userinfo');
var collectGoodsUserRouter = require('./routes/user/collectGoods');
var cartUserRouter = require('./routes/user/cart');
var loginUserRouter = require('./routes/user/login');
var registerUserRouter = require('./routes/user/register');
var commodityUserRouter = require('./routes/user/commodity');
var searchUserRouter = require('./routes/user/search');
//测试
var uploadfileRouter = require('./routes/merchant/uploadfile');

var app = express();
app.use(session({
  secret:'student',
  cookie:{maxAge:1000*60*24*30},
  resave: false,
  saveUninitialized: true
}));
app.locals.moment = moment;

//文件上传
app.use(bodyParser.urlencoded({extended:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/merchant/index', indexRouter);
app.use('/merchant/login', loginRouter);
app.use('/merchant/register', registerMerchantRouter);
app.use('/merchant/userInfo', userInfoRouter);
app.use('/merchant/order', orderRouter);
app.use('/merchant/commodity', commodityRouter);
app.use('/user/index', indexUserRouter);
app.use('/user/order', orderUserRouter);
app.use('/user/userinfo', userinfoUserRouter);
app.use('/user/collectGoods', collectGoodsUserRouter);
app.use('/user/cart', cartUserRouter);
app.use('/user/login', loginUserRouter);
app.use('/user/register', registerUserRouter);
app.use('/user/commodity', commodityUserRouter);
app.use('/user/search', searchUserRouter);

app.use('/merchant/uploadfile', uploadfileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  res.render('404');
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

app.listen(3001, function() {
  console.log('listening 3001')
});

module.exports = app;
