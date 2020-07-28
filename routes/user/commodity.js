var express = require('express');
var router = express.Router();
const mysql = require('../../database');


//商品
router.get('/info/:commodityID', function (req, res, next) {

    var commodityId = req.params.commodityID;

    var searchCommoditySql = 'SELECT * FROM goods WHERE g_id = ' + commodityId;
    var searchEstimateSql = 'SELECT * FROM p_estimate WHERE g_id = ' + commodityId;
    mysql.query(searchCommoditySql, function (err, result, fields) {
        mysql.query(searchEstimateSql, function (err, result2, fields2) {
            if (err) {
                console.log(err);
                res.render('index');
            }
            res.render('user/commodityInfo', {commodity: result[0], estimate: result2, user: req.session.user});
        });
    });
});

router.get('/jiesuan/single/:commodityId/:orderId', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }
    var commodityId = req.params.commodityId;
    var orderId = req.params.orderId;

    var addOrderSql = 'SELECT * FROM goods WHERE g_id = ?';
    var userInfoSql = 'SELECT * FROM user_info WHERE u_id = (SELECT u_id FROM USER WHERE user_name = ?)';
    mysql.query(addOrderSql, [commodityId], function (err, result, fields) {
        mysql.query(userInfoSql, [user["user_name"]], function (err, result2, fields2) {
            if (err) {
                console.log(err);
                res.render('/user/index');
            }


            res.render('user/jiesuan', {commodity: result, userInfo: result2,orderId:orderId, user: req.session.user});

        });
    });

});

module.exports = router;
