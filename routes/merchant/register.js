var express = require('express');
var router = express.Router();
//md52.引入模块
var md5 = require('md5-node');
const mysql = require('../../database');
//--------------------------------------------------------------
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });//设置上传文件的路径


//首页
router.get('/', function (req, res, next) {
    res.render('merchant/register');
});

router.post('/', upload.any(), function (req, res, next) {

    var username = req.body.username;
    var pasword = req.body.password;

    var md5password = md5(pasword);

    var oname = req.files[0].originalname;//文件名
    var path1 = req.files[0].path;//原上传文件
    // 设置转移路径，以及重命名(最后存放照片的目录)
    var image_path = './public/img/touxiang/' + oname;
    // 将上传后的文件移动到指定路径目录下
    fs.rename(path1, image_path, (err) => {
        console.log(err);
    });

    // var query = 'SELECT * FROM merchant WHERE m_name=' + mysql.escape(username) + ' AND m_password=' + mysql.escape(md5password);
    var register = "INSERT INTO merchant (m_name,m_password,store_name,touxiang) VALUES (?,?,'raicho店铺',?)";
    mysql.query(register, [username, md5password,oname], function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.render('merchant/login');
        }
        var user = rows[0];

        req.session.user = user;
        // res.redirect('/merchant/login');
        res.send("注册成功");
    });


});

module.exports = router;
