var express = require('express');
var router = express.Router();
//md52.引入模块
var md5 = require('md5-node');
const mysql = require('../../database');


//首页
router.get('/', function (req, res, next) {

    //req["originalUrl"]
    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var searchUserInfoSql = "SELECT * FROM user_info WHERE u_id = (SELECT u_id FROM USER WHERE user_name = ?)";

    mysql.query(searchUserInfoSql, [user["user_name"]], function (err, result) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        res.render('user/userInfo', {userInfo: result[0], userName: user["user_name"], user: req.session.user});


    });

});

router.post('/updateUserInfo', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var param = req.body;
    var nickname = param["nickname"];
    var gender = param["gender"];
    var email = param["email"];
    var realname = param["realname"];
    var address = param["address"];
    var phone = param["phone"];

    var searchUserInfoSql = "UPDATE user_info SET nickname=?,gender=?,email=?,real_name=?,address=?,phone=? WHERE u_id=(SELECT u_id FROM USER WHERE user_name=?)";

    mysql.query(searchUserInfoSql, [nickname,gender,email,realname,address,phone,user["user_name"]], function (err, result) {
        if (err) {
            console.log(err);
            res.send('修改失败');
        }

        res.send('修改成功');
    });

});


router.post('/updatePassword', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var param = req.body;
    var beforepassword = md5(param["beforepassword"]);
    var newpassword = md5(param["newpassword"]);

    var updatePasswordSql = "UPDATE USER SET PASSWORD=CASE WHEN PASSWORD=? THEN ? ELSE PASSWORD END WHERE user_name=?";

    mysql.query(updatePasswordSql, [beforepassword,newpassword,user["user_name"]], function (err, result) {
        if (err) {
            console.log(err);
            res.send('修改失败');
        }

        if (result["changedRows"] === 0) {
            res.send('密码错误');
            return;
        }

        res.send('修改密码成功');
    });

});

// 充值
router.post('/recharge', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var param = req.body;
    var recharges = param["recharges"];

    var updateRechargeSql = "UPDATE user_info SET money=(money+?) WHERE u_id=(SELECT u_id FROM USER WHERE user_name=?)";

    mysql.query(updateRechargeSql, [recharges,user["user_name"]], function (err, result) {
        if (err) {
            console.log(err);
            res.send('充值失败');
        }

        res.send('充值成功');
    });

});


// 提现
router.post('/withdraw', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var param = req.body;
    var withdraws = param["withdraws"];

    var updateWithdrawdSql = "UPDATE user_info SET money=(money-?) WHERE u_id=(SELECT u_id FROM USER WHERE user_name=?)";

    mysql.query(updateWithdrawdSql, [withdraws,user["user_name"]], function (err, result) {
        if (err) {
            console.log(err);
            res.send('提现失败');
        }

        res.send('提现成功');
    });

});

module.exports = router;
