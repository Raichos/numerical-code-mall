var express = require('express');
var router = express.Router();
const mysql = require('../../database');


//首页
router.get('/', function (req, res, next) {

    res.render('user/collectGoods',{user: req.session.user});
});


module.exports = router;
