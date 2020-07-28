var express = require('express');
var router = express.Router();
//md52.引入模块
var md5 = require('md5-node');
const mysql = require('../../database');


//首页
router.get('/', function (req, res, next) {

    res.render('user/login',{user: req.session.user});
});


router.post('/', function (req, res, next) {
    var username = req.body.username;
    var pasword = req.body.password;

    var md5password = md5(pasword);
    var login = "SELECT user_name,PASSWORD FROM USER WHERE user_name="+ mysql.escape(username) +" AND PASSWORD="+ mysql.escape(md5password);
    mysql.query(login, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.render('/user/login');
        }
        var user = rows[0];
        if (!user) {
            // res.render('merchant/login');
            // res.render('login', {message: '用户名或者密码错误'});
            res.redirect('/user/login');
            return;
        }
        req.session.user = user;
        res.redirect('/user/index');
    });

});

//退出登录
router.get('/logout', function (req, res, next) {
    req.session.user = null;
    res.redirect('/user/login');
});

module.exports = router;
