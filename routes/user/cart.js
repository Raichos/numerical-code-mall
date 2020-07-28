var express = require('express');
var router = express.Router();
const mysql = require('../../database');


//首页
router.get('/', function (req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('/user/login');
        return;
    }

    var searchShoppingCartsSql = 'SELECT sc.sc_id,sc.u_id,sc.sc_quantity,sc.sc_total_price,g.* FROM shopping_cart sc LEFT JOIN goods g ON sc.g_id = g.g_id WHERE sc.u_id = (SELECT u_id FROM USER WHERE user_name = ?)';

    mysql.query(searchShoppingCartsSql, [user["user_name"]], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        res.render('user/cart', {carts: result, user: req.session.user});
    });

});

router.get('/deleteCommodity/:scId', function (req, res, next) {


    var scId = req.params.scId;


    var deleteShoppingCartSql = 'DELETE FROM shopping_cart WHERE sc_id = ?';

    mysql.query(deleteShoppingCartSql, [scId], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        res.redirect('/user/cart');
    });

});

//-
router.post('/subtractQuantity', function (req, res, next) {

    var param = req.body;


    var subtractQuantitySql = 'UPDATE shopping_cart SET sc_quantity=sc_quantity-1 WHERE sc_id = ?';

    mysql.query(subtractQuantitySql, [param["scid"]], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        res.send('success');
    });

});

//+
router.post('/addQuantity', function (req, res, next) {

    var param = req.body;


    var subtractQuantitySql = 'UPDATE shopping_cart SET sc_quantity=sc_quantity+1 WHERE sc_id = ?';

    mysql.query(subtractQuantitySql, [param["scid"]], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('/user/index');
        }

        res.send('success');
    });

});

//购物车
router.get('/addShoppingCart/:commodityId', function (req, res, next) {


    var user = req.session.user;
    if (user == null) {
        res.send("未登录");
        return;
    }

    // var param = req.body;
    var commodityId = req.params.commodityId;

    var addShoppingCartSql = 'INSERT shopping_cart (u_id,g_id,sc_quantity,sc_total_price) VALUES ((SELECT u_id FROM USER WHERE user_name = ?),?,?,?)';

    mysql.query(addShoppingCartSql, [user["user_name"], commodityId, 1, 1], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send("添加失败");
        }

        // res.redirect('/user/commodity/info/'+commodityId);
        res.send("成功添加到购物车");
    });

});


module.exports = router;
