var express = require('express');
var router = express.Router();
const mysql = require('../../database');

router.get('/', function(req, res, next) {

    var user = req.session.user;
    if (user == null) {
        res.redirect('http://localhost:3001/merchant/login');
        return;
    }
    console.log("aaaaaaaaaaaaa");
    let username = user["m_name"];

    var query = "SELECT * FROM merchant WHERE m_name=?";
    mysql.query(query,[username], function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.render('merchant/login');
        }
        var user = rows[0];
        if (!user) {
            res.redirect('/merchant/login');
            return;
        }

        res.render('merchant/user/UserInfo',{userInfo:user});
    });

});


module.exports = router;
