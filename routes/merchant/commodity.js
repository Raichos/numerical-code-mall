var express = require('express');
var router = express.Router();
const mysql = require('../../database');
//--------------------------------------------------------------
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});//设置上传文件的路径

router.get('/', function (req, res, next) {

    let user = req.session.user;
    if (user == null) {
        res.redirect('http://localhost:3001/merchant/login');
        return;
    }
    let username = user["m_name"];

    var searchCommoditySql = 'SELECT * FROM goods WHERE g_id IN (SELECT g_id FROM merchant_commodity WHERE m_id = (SELECT m_id FROM merchant WHERE m_name = ' + mysql.escape(username) + '))';
    mysql.query(searchCommoditySql, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.render('index');
        }
        res.render('merchant/commodity/CommodityInfo', {commodityList: result});
    });

});

router.post('/add', upload.any(), function (req, res, next) {
    let user = req.session.user;
    if (user == null) {
        res.redirect('http://localhost:3001/merchant/login');
        return;
    }
    let username = user["m_name"];
    var param = req.body;

    //商品信息
    var commodityName = param["commodity-name"];    //商品名
    var price = param["price"];   //商品价格
    var quantity = param["quantity"];   //库存数量
    var discounts = param["discounts"];   //商品优惠
    var category = param["category"];   //商品类别
    var describe = param["describe"];   //商品描述

    var oname = req.files[0].originalname;//文件名
    var path1 = req.files[0].path;//原上传文件
    // 设置转移路径，以及重命名(最后存放照片的目录)
    var image_path = './public/images/numerical/' + oname;
    // 将上传后的文件移动到指定路径目录下
    fs.rename(path1, image_path, (err) => {
        console.log(err);
    });

    var addCommodityParam = [commodityName, price, quantity, discounts, category, '/images/numerical/'+oname, describe];
    var addCommodity = 'INSERT goods(g_name,g_price,g_quantity,g_discounts,g_category,g_photo,g_description,g_create_time) VALUES(?,?,?,?,?,?,?,CURDATE())';
    //添加商品
    mysql.query(addCommodity, addCommodityParam, function (err, rows1, fields) {

        if (err) {
            console.log(err);
            res.render('index');
        }

        let insertId = rows1.insertId;

        var selectUserId = 'SELECT m_id FROM merchant WHERE m_name= ' + mysql.escape(username);

        mysql.query(selectUserId, function (err, rows2, fields) {

            if (err) {
                console.log(err);
                res.render('index');
            }
            let merchantId = rows2[0]["m_id"];

            var addCommodityMerchantParam = [insertId, merchantId];
            var addCommodityMerchant = 'INSERT merchant_commodity(g_id,m_id) VALUES(?,?)';
            mysql.query(addCommodityMerchant, addCommodityMerchantParam, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.render('index');
                }

                res.redirect('http://localhost:3001/merchant/commodity');
            });

        });

    });
});

router.post('/deleteCommodity', function (req, res, next) {

    let user = req.session.user;
    if (user == null) {
        res.redirect('http://localhost:3001/merchant/login');
        return;
    }

    let username = user["m_name"];
    var commodityId = req.body.gid;

    var gparam = [commodityId];

    var deleteMerchant = "DELETE FROM goods WHERE g_id = ?";
    var deleteCommodity = "DELETE FROM merchant_commodity WHERE g_id = ?";

    mysql.query(deleteMerchant, gparam, function (err, result1, fields) {
        mysql.query(deleteCommodity, gparam, function (err, result2, fields) {
            if (err) {
                console.log(err);
                res.render('index');
            }
            res.redirect('http://localhost:3001/merchant/commodity');
        });
    });

});


router.post('/editCommodity', function (req, res, next) {

    var param = req.body;

    var id = param["id"];
    var name = param["edit-name"];
    var price = param["edit-price"];
    var quantity = param["edit-quantity"];
    var discounts = param["edit-discounts"];
    var category = param["edit-category"];
    var photo = param["edit-photo"];
    var describe = param["edit-describe"];
    // console.log(param);

    var updateGparam = [name, price, quantity, discounts, category, photo, describe, id];
    var updateCommodity = " UPDATE goods SET g_name=?,g_price=?,g_quantity=?,g_discounts=?,g_category=?,g_photo=?,g_description=? WhERE g_id=?;";

    mysql.query(updateCommodity, updateGparam, function (err, result1, fields) {
        if (err) {
            console.log(err);
            res.render('index');
        }
        res.redirect('http://localhost:3001/merchant/commodity');
    });

});

module.exports = router;
