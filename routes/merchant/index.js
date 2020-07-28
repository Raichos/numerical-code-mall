var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var user = req.session.user;
    if (user == null){
        res.redirect('http://localhost:3001/merchant/login');
        return;
    }

    res.render('merchant/index',{user:user});
});

//内嵌首页
router.get('/Main', function(req, res, next) {

    res.render('merchant/system/Main');
});

module.exports = router;
