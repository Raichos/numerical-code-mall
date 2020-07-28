var express = require('express');
var router = express.Router();
const mysql = require('../../database');
const stringRandom = require('string-random');


//首页
router.get('/', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var searchOrderSql = 'SELECT * FROM orders WHERE u_id = (SELECT u_id FROM USER WHERE user_name = ?)';
    mysql.query(searchOrderSql, [user["user_name"]], function (err, result, fields2) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }
        res.render('user/order', {orders: result, user: req.session.user});
    });

});

router.get('/info/:id', function (req, res, next) {

    var id = req.params.id;

    var searchOrderSql = 'SELECT * FROM orders WHERE id = ?';
    var searchCommoditySql = 'SELECT * FROM goods WHERE g_id IN (SELECT goods_id FROM order_goods WHERE order_id=?)';
    var searchUserInfoSql = 'SELECT * FROM user_info WHERE u_id = (SELECT u_id FROM orders WHERE id = ?)';
    mysql.query(searchOrderSql, [id], function (err, result, fields) {
        mysql.query(searchCommoditySql, [id], function (err, result2, fields2) {
            mysql.query(searchUserInfoSql, [id], function (err, result3, fields3) {
                if (err) {
                    console.log(err);
                    res.render('/user/index');
                }
                res.render('user/orderInfo', {
                    order: result[0],
                    commodity: result2,
                    userInfo: result3[0],
                    user: req.session.user
                });
            });
        });
    });

});


router.get('/finOrder', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var searchOrderSql = 'SELECT * FROM orders WHERE id = (SELECT MAX(id) FROM orders)';
    mysql.query(searchOrderSql, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        res.render('user/finOrder', {user: req.session.user, order: result[0]});
    });


});

router.get('/nowBuy/:commodityId', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var commodityId = req.params.commodityId;

    var selectUserGoodsSql = "SELECT g.*,u.u_id FROM USER u,goods g WHERE u.user_name = ? AND g.g_id = ?";
    var addOrderSql = 'INSERT orders (o_number,o_status,o_quantity,o_total_price,u_id) VALUES (?,?,?,?,?)';
    var addOrderGoodsSql = 'INSERT order_goods (order_id,goods_id) VALUES (?,?)';

    var o_number = stringRandom(16, {letters: false});
    var o_status = "未付款";
    var o_quantity = 1;
    var o_total_price = 0;
    mysql.query(selectUserGoodsSql, [user["user_name"], commodityId], function (err1, result, fields) {
        // o_total_price = result[0]["g_price"] * 1;
        o_total_price = (result[0]["g_price"]*result[0]["g_discounts"]*0.1).toFixed(2);
        var commodityParam = [o_number, o_status, o_quantity, o_total_price, result[0]["u_id"]];
        mysql.query(addOrderSql, commodityParam, function (err2, result2, fields2) {
            mysql.query(addOrderGoodsSql, [result2["insertId"], commodityId], function (err3, result3, fields3) {
                if (err1 || err2 || err3) {
                    console.log(err);
                    res.render('/user/index');
                }

                res.redirect('/user/commodity/jiesuan/single/' + commodityId + '/' + result2["insertId"]);
                return;
            });
        });
    });
});

//购物车结算
router.post('/cartJieSuan', function (req, res) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var param = req.body;

    var shoppingcartid = param["shoppingcartid"];
    var totalSumPrice = param["totalSumPrice"];
    var convertSCId = "";
    var convertSCBrId = "";
    if (shoppingcartid.length === 1) {
        res.send("请勾选商品再结算");
        return;
    }
    for (let i = 1; i < shoppingcartid.length; i++) {
        convertSCId += shoppingcartid[i];
        convertSCBrId += " '";
        convertSCBrId += shoppingcartid[i];
        if (i < shoppingcartid.length - 1) {
            convertSCId += " ,";
            convertSCBrId += "' ,";
        } else {
            convertSCBrId += "'";
        }
    }

    var searchGoodsIdCartSql = "SELECT g_id FROM shopping_cart WHERE sc_id IN (" + convertSCBrId + ")";
    var jiesuanShppingCartSql = "DELETE FROM shopping_cart WHERE sc_id IN (" + convertSCBrId + ") AND (SELECT money FROM user_info WHERE u_id=(SELECT u_id FROM USER WHERE user_name=" + mysql.escape(user["user_name"]) + ")) >= " + mysql.escape(totalSumPrice);
    var subtractMoneySql = "UPDATE user_info SET money = money-? WHERE u_id = (SELECT u_id FROM USER WHERE user_name=?)";
    var createOrderMoneySql = "INSERT INTO orders (o_number,o_status,o_quantity,u_id,o_total_price) VALUES (?,?,?,(SELECT u_id FROM USER WHERE user_name=?),?)";
    var createOrderInfoMoneySql = "INSERT INTO order_goods (order_id,goods_id) VALUES(?,?)";

    mysql.query(searchGoodsIdCartSql, function (err1, result1) {
        // var aa = result1[0]["g_id"];
        mysql.query(jiesuanShppingCartSql, function (err2, result2) {
            if (result2.affectedRows === 0) {
                res.send("余额不足");
                return;
            }
            mysql.query(subtractMoneySql, [totalSumPrice, user["user_name"]], function (err3, result3) {
                var o_number = stringRandom(16, {letters: false});
                mysql.query(createOrderMoneySql, [o_number, "已付款", shoppingcartid.length - 1, user["user_name"], totalSumPrice], function (err4, result4) {
                    if (err1 || err2 || err3 || err4) {
                        console.log(err1);
                        res.send("false");
                        return;
                    }
                    for (let i = 0; i < result1.length; i++) {
                        mysql.query(createOrderInfoMoneySql, [result4.insertId, result1[i]["g_id"]], function (err4, result4) {
                            if (err4) {
                                console.log(err);
                                res.send("false");
                            }
                        });
                    }

                    res.send("success");
                });
            });
        });
    });


});

router.post('/deleteOrder', function (req, res) {

    var param = req.body;
    console.log(param);

    var orderId = param["orderId"];

    var deleteOrderGoodsSql = "DELETE FROM order_goods WHERE order_id = ?";
    var deleteOrderSql = "DELETE FROM orders WHERE id = ?";

    mysql.query(deleteOrderGoodsSql, [orderId], function (err1, result1) {
        mysql.query(deleteOrderSql, [orderId], function (err2, result2) {
            if (err1 || err2) {
                console.log(err);
                res.render('/user/index');
            }
            res.send('deleteSuccess');
        });
    });

});

//订单未付款-》付款
router.post('/payment', function (req, res) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var param = req.body;

    var orderId = param["orderId"];

    var paymentSql = "UPDATE orders o,user_info ui SET o.o_status='已付款',ui.money=ui.money-o.o_total_price WHERE o.id = ? AND ui.u_id=\n" +
        "(SELECT u.u_id FROM USER u WHERE u.user_name=?) AND o.o_total_price <= ui.money";

    mysql.query(paymentSql, [orderId,user["user_name"]], function (err, result) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        if (result.changedRows === 0){

            res.send("余额不足");
            return;
        }

        res.send('success');
    });

});

router.post('/updateOrderStatus', function (req, res) {

    var param = req.body;
    // console.log(param);
    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var orderId = param["orderId"];

    var updateMoneyStatusSql = "UPDATE user_info SET money=(CASE WHEN money>= (SELECT SUM(g_price) FROM goods WHERE g_id IN (SELECT goods_id FROM order_goods WHERE order_id = ?)) \n" +
        "THEN (money-(SELECT SUM(g_price) FROM goods WHERE g_id IN (SELECT goods_id FROM order_goods WHERE order_id = ?))) ELSE money END) WHERE u_id = \n" +
        "(SELECT u_id FROM USER WHERE user_name=?)";
    var updateOrderStatusSql = "UPDATE orders SET o_status='已付款' WHERE id = ?";

    mysql.query(updateMoneyStatusSql, [orderId, orderId, user["user_name"]], function (err1, result1) {
        if (result1["changedRows"] === 0) {
            res.send('false');
            return;
        }
        mysql.query(updateOrderStatusSql, [orderId], function (err2, result2) {
            if (err1) {
                console.log(err);
                res.render('/user/index');
            }

            res.send('success');
        });
    });

});

module.exports = router;
