var express = require('express');
var router = express.Router();
const mysql = require('../../database');

//首页
router.get('/', function (req, res, next) {

    res.render('user/search', {user: req.session.user});
});

router.get('/searchGoods/:goodsName', function (req, res, next) {

    var param = req.body;
    var goodsName = req.params.goodsName;

    console.log("cc=" + goodsName);
    var likeSql = "SELECT * FROM goods WHERE g_name LIKE '%" + goodsName + "%'";
    mysql.query(likeSql, [goodsName], function (err, result) {
        if (err) {
            console.log("报错=" + err);
            res.render('/user/index');
            return;
        }
        console.log("result=" + result);
        res.render('user/search', {user: req.session.user, goods: result});

    });

});


router.get('/searchGoods', function (req, res, next) {

    var param = req.body;

    var likeSql = "SELECT * FROM goods LIMIT 8";
    mysql.query(likeSql, function (err, result) {
        if (err) {
            console.log("报错=" + err);
            res.render('/user/index');
            return;
        }
        console.log("result=" + result);
        res.render('user/search', {user: req.session.user, goods: result});

    });

});

router.get('/searchClassify/:Classify', function (req, res, next) {

    var classify = req.params.Classify;

    console.log("classify=====================================");
    console.log("classify=" + classify);
    // classify.split("-")
    var replaceClassify = classify.replace(/-/g, "%' OR g_name LIKE '%");
    var likeSql = "SELECT * FROM goods WHERE g_category LIKE '%" + replaceClassify + "%'";
    console.log("likeSql="+likeSql);
    mysql.query(likeSql, function (err, result) {
        if (err) {
            console.log("报错=" + err);
            res.render('/user/index');
            return;
        }
        console.log("result=" + result);
        res.render('user/search', {user: req.session.user, goods: result});

    });

});

//分类查询

router.get('/searchGoods', function (req, res, next) {

});

module.exports = router;
