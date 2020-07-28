var express = require('express');
var router = express.Router();
//md52.引入模块
var md5 = require('md5-node');
const mysql = require('../../database');

//首页
router.get('/', function (req, res, next) {
    res.render('merchant/login');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var pasword = req.body.password;

    var md5password = md5(pasword);
    var query = 'SELECT * FROM merchant WHERE m_name=' + mysql.escape(username) + ' AND m_password=' + mysql.escape(md5password);
    mysql.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.render('merchant/login');
        }
        var user = rows[0];
        if (!user) {
            // res.render('merchant/login');
            // res.render('login', {message: '用户名或者密码错误'});
            res.redirect('login');
            return;
        }
        req.session.user = user;
        res.redirect('index');
    });


});

//退出登录
router.get('/logout', function (req, res, next) {
    req.session.user = null;
    res.redirect('/merchant/login');
});

module.exports = router;
