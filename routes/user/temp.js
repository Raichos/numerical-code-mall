//注册
router.post('/zhuche', function (req, res) {

    //上传照片
    var form = new formidable.IncomingForm();//创建一个formidable对象
    //图片上传后的存储路径
    //  var form = new multiparty.Form({ uploadDir: './public/img' });
    form.uploadDir = path.dirname(__dirname) + '/public/images/';
    form.keepExtensions = true; //保留后缀
    form.encoding = 'utf-8'; // 编码
    form.type = true;
    form.parse(req, function (error, fields, files) {
        console.log(files.file.path);
        var username = fields.username;
        var password = fields.password;
        var repassword = fields.repassword;
        console.log(files.file);
        if (files.file.size == 0) {
            console.log("未上传图片，使用默认图片");
            var imagepath = "\\public\\images\\upload_cd8e7173c3b31a9d3e299be4fc6f4f38.jpg"
        }
        else {
            var imagepath = "\\public\\images\\" + files.file.path.split(path.sep).pop();
        }
        //密码判断
        if (password != repassword) {

            console.log('两次输入的密码不一致');
            return res.render('error', { message: '两次输入的密码不一致，注册失败，请返回注册页' });
        }
        //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户名已经被注册了
        User.findOne({
            username: username
        }).then(function (userInfo) {
            if (userInfo) {
                //表示数据库中有该记录
                return res.render('error', { message: '该用户已存在' });
            }
            //保存用户注册的信息到数据库中
            var user = new User({
                username: username,
                password: crypto.createHash('md5').update(password).digest("hex"),
                imagepath: imagepath,
            });
            return user.save();
        }).then(function (newUserInfo) {
            res.render('error', { message: '注册用户成功' });
        });

    });
});
