var express = require('express');
var router = express.Router();
const mysql = require('../../database');

router.get('/', function(req, res, next) {

    let user = req.session.user;
    if (user == null) {
        res.redirect('http://localhost:3001/merchant/login');
        return;
    }
    let username = user["m_name"];

    // var searchOrderSql = 'SELECT * FROM orders o,goods g,merchant m WHERE m.m_id=(SELECT m_id FROM merchant WHERE m_name=' + mysql.escape(username) + ')';
    // var searchOrderSql = 'SELECT o.`id`,o.`o_number`,o.`o_status`,m.`m_name`,g.`g_name`,o.`o_quantity`,o.`o_total_price`  FROM orders o LEFT JOIN goods g ON o.g_id=g.g_id LEFT JOIN merchant m ON o.`u_id`=m.`m_id` WHERE o.u_id=(SELECT m_id FROM merchant WHERE m_name=' + mysql.escape(username) + ')';
    // var searchOrderSql = "SELECT * FROM orders WHERE u_id=(SELECT m_id FROM merchant WHERE m_name=?)";
    var searchOrderSql = "SELECT o.*,u.user_name FROM orders o LEFT JOIN USER u ON o.u_id=u.u_id WHERE u.u_id=(SELECT m_id FROM merchant WHERE m_name=?)";
    mysql.query(searchOrderSql,[username], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('index');
        }
        // console.log(result);
        res.render('merchant/order/OrderInfo', {orderList: result,username:username});
    });

});


module.exports = router;
