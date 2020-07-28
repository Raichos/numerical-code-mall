var express = require('express');
var router = express.Router();
//md52.引入模块
var md5 = require('md5-node');
const mysql = require('../../database');
//--------------------------------------------------------------

var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });//设置上传文件的路径


// /merchant/uploadfile

//首页
router.get('/', function (req, res, next) {

    res.render('merchant/uploadFile');
});

// router.post('/', upload.single('logo'), function (req, res, next) {
//
//     console.log("但图片上传");
//
//     var param = req.body;
//     console.log("param=" + param);
//
//     res.render('merchant/uploadFile');
// });

router.post('/ttt', upload.any(), function (req, res, next) {

    console.log(req.files);  // 上传的文件信息
    var username = req.body.username;//用户名
    var oname = req.files[0].originalname;//文件名
    var path1 = req.files[0].path;//原上传文件
    // 设置转移路径，以及重命名(最后存放照片的目录)
    var image_path = './public/img/touxiang/' + oname;
    // 将上传后的文件移动到指定路径目录下
    fs.rename(path1, image_path, (err) => {
        console.log(err);
    });
    res.render('merchant/uploadFile');
})

module.exports = router;
