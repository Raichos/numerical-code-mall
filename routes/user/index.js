var express = require('express');
var router = express.Router();
const mysql = require('../../database');

//首页
router.get('/', function (req, res, next) {

    //热卖产品
    var sellCountSql = 'SELECT * FROM goods ORDER BY g_sell_count DESC LIMIT 4';
    //最新发布
    var newestSql = 'SELECT * FROM goods ORDER BY g_create_time DESC LIMIT 4';
    //特价商品
    var specialOfferSql = 'SELECT * FROM goods ORDER BY g_discounts LIMIT 4';

    mysql.query(sellCountSql, function (err1, result1) {
        mysql.query(newestSql, function (err2, result2) {
            mysql.query(specialOfferSql, function (err3, result3) {
                if (err1 || err2 || err3) {
                    console.log(err1);
                    res.render('/user/index');
                }

                res.render('user/index', {message: '', user: req.session.user,sellCountGoods:result1,newestGoods:result2,specialOfferGoods:result3});
            });
        });
    });

});


module.exports = router;
