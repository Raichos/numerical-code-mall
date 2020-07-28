var express = require('express');
var router = express.Router();
//md52.引入模块
var md5 = require('md5-node');
const mysql = require('../../database');


//首页
router.get('/', function (req, res, next) {

    res.render('user/register',{user: req.session.user});
});


router.post('/', function (req, res, next) {
    var param = req.body;

    console.log(param);

    var username = param["username"];
    var password = param["password"];
    var gender = param["gender"];
    var phone = param["phone"];
    var address = param["address"];
    var email = param["email"];

    var md5password = md5(password);

    var insertUserSql = " INSERT INTO USER(user_name,PASSWORD) SELECT ?,? FROM DUAL WHERE NOT EXISTS ( SELECT * FROM USER WHERE user_name = ? )";
    var insertUserInfoSql = "INSERT INTO user_info (nickname,gender,email,money,real_name,address,phone,u_id) VALUES (?,?,?,?,?,?,?,?)";
    mysql.query(insertUserSql, [username, md5password, username], function (err1, result1) {
        // result1["changedRows"]
        if (err1 || result1["affectedRows"] === 0) {
            console.log(err1);
            // res.render('/user/login');
            res.send('注册失败，该用户已存在');
            return;
        }
        mysql.query(insertUserInfoSql, ["默认昵称", gender,email,0.00,"默认真实名",address,phone,result1["insertId"]], function (err2, result2) {
            if (err2) {
                console.log(err2);
                res.render('/user/register');
                return;
            }

            res.send('注册成功');
        });
    });
});

module.exports = router;
