/*
SQLyog v10.2 
MySQL - 5.7.18-log : Database - numerical_code_mall
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`numerical_code_mall` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `numerical_code_mall`;

/*Table structure for table `collection` */

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品收藏id',
  `g_id` int(11) DEFAULT NULL COMMENT '商品id',
  `u_id` int(11) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `collection` */

/*Table structure for table `g_parameter` */

DROP TABLE IF EXISTS `g_parameter`;

CREATE TABLE `g_parameter` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品参数id',
  `g_id` int(11) NOT NULL COMMENT '商品id',
  `p_configuration` varchar(32) DEFAULT NULL COMMENT '商品配置',
  `p_versions` varchar(32) DEFAULT NULL COMMENT '版本类型',
  `p_color` varchar(11) DEFAULT NULL COMMENT '颜色',
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品参数';

/*Data for the table `g_parameter` */

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `g_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `g_name` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `g_price` decimal(32,2) DEFAULT NULL COMMENT '商品价格',
  `g_quantity` int(11) DEFAULT NULL COMMENT '商品数量',
  `g_discounts` int(11) DEFAULT NULL COMMENT '商品优惠',
  `g_category` varbinary(16) DEFAULT NULL COMMENT '商品类别',
  `g_photo` varchar(255) DEFAULT NULL COMMENT '图片',
  `g_description` longtext COMMENT '商品描述',
  `g_create_time` date DEFAULT NULL COMMENT '发布日期',
  `g_sell_count` int(11) DEFAULT '0' COMMENT '销量',
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='商品';

/*Data for the table `goods` */

insert  into `goods`(`g_id`,`g_name`,`g_price`,`g_quantity`,`g_discounts`,`g_category`,`g_photo`,`g_description`,`g_create_time`,`g_sell_count`) values (1,'红米k30','666.00',14,7,'手机','/images/numerical/phone1.jpg','红米k30','2020-06-12',11),(12,'红米','1999.00',1241,3,'手机','/images/numerical/phone1.jpg','红米k20','2020-06-09',54),(14,'笔记本','3361.00',324,5,'电脑','/images/numerical/waixingren.jpg','外星人笔记本','2020-06-07',43),(16,'固态硬盘','321.00',3,6,'配件','/images/numerical/gutai1.jpg','三星固态硬盘500G','2020-06-12',124),(17,'索泰显卡','2599.00',42,9,'配件','/images/numerical/xianka.jpg','索泰(ZOTAC)RTX2060至尊PLUS OC V2显卡','2020-06-06',564),(22,'手机','6666.00',13,7,'数码手机','/images/numerical/phone1.jpg','华为p40','2020-06-12',445),(23,'小米6','2999.00',134,5,'手机','/images/numerical/phone1.jpg','小米6 6G大内存','2020-06-08',0),(24,'小米10','8888.00',324,7,'手机','/images/numerical/phone2.jpg','小米10青春版','2020-06-10',0),(25,'华为p40','8888.00',232,3,'手机','/images/numerical/huaweip40.jpg','华为40 32G大内存','2020-06-25',0),(28,'华硕电脑','6999.00',321,7,'电脑','/images/numerical/huashuo.jpg','华硕电脑 8G 256G+1T','2020-06-25',0),(29,'高清数码摄像机','5666.00',3,4,'相机','/images/numerical/xiangji.jpg','索尼（SONY）FDR-AX45家用/直播4K高清数码摄像机 /DV/摄影机/录像机 5轴防抖（AX40升级款）','2020-06-26',6),(31,'惠普显示屏','1049.00',212,7,'显示器','/images/numerical/xianshiqi01.jpg','惠普（HP）24MQ 23.8英寸 2K IPS 升降旋转 微边框 低蓝光爱眼 显示器 显示屏（带HDMI线）','2020-06-26',1060);

/*Table structure for table `merchant` */

DROP TABLE IF EXISTS `merchant`;

CREATE TABLE `merchant` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商家id',
  `m_name` varchar(16) DEFAULT NULL COMMENT '商家账号',
  `m_password` varchar(32) DEFAULT NULL COMMENT '商家密码',
  `store_name` varchar(16) DEFAULT NULL COMMENT '店铺名',
  `touxiang` varchar(255) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='商家';

/*Data for the table `merchant` */

insert  into `merchant`(`m_id`,`m_name`,`m_password`,`store_name`,`touxiang`) values (1,'raicho','e10adc3949ba59abbe56e057f20f883e','raicho店铺','raicho.jpg'),(2,'赖志豪','sfasdfsaf','raicho店铺',NULL),(3,'lzh','96e79218965eb72c92a549dd5a330112','raicho店铺',NULL);

/*Table structure for table `merchant_commodity` */

DROP TABLE IF EXISTS `merchant_commodity`;

CREATE TABLE `merchant_commodity` (
  `mc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商家商品id',
  `g_id` int(11) DEFAULT NULL COMMENT '商品id',
  `m_id` int(11) DEFAULT NULL COMMENT '商家id',
  PRIMARY KEY (`mc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='商家商品';

/*Data for the table `merchant_commodity` */

insert  into `merchant_commodity`(`mc_id`,`g_id`,`m_id`) values (1,12,1),(2,1,1),(4,14,1),(6,16,1),(7,17,1),(12,22,1),(13,23,1),(14,24,1),(15,25,1),(17,28,1),(18,29,1),(20,31,1);

/*Table structure for table `order_goods` */

DROP TABLE IF EXISTS `order_goods`;

CREATE TABLE `order_goods` (
  `o_g_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单商品id',
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `goods_id` int(11) DEFAULT NULL COMMENT '商品id',
  PRIMARY KEY (`o_g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

/*Data for the table `order_goods` */

insert  into `order_goods`(`o_g_id`,`order_id`,`goods_id`) values (42,49,28),(43,50,11),(44,50,11),(59,64,31),(61,66,25),(62,67,25),(63,68,28),(64,68,29),(65,69,16),(66,70,31);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `o_number` varchar(32) DEFAULT NULL COMMENT '订单编号',
  `o_status` varchar(16) DEFAULT NULL COMMENT '订单状态',
  `o_quantity` int(11) DEFAULT NULL COMMENT '商品数量',
  `u_id` int(11) DEFAULT NULL COMMENT '用户id',
  `o_total_price` decimal(11,0) DEFAULT NULL COMMENT '订单总价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`id`,`o_number`,`o_status`,`o_quantity`,`u_id`,`o_total_price`) values (49,'2686591374315826','已付款',1,2,'4899'),(50,'5879291793121259','已付款',2,2,'7'),(64,'2625028845777284','已付款',1,1,'734'),(66,'5811486592588819','未付款',1,1,'2666'),(67,'1821466878162879','未付款',1,1,'2666'),(68,'1289799318748469','已付款',2,1,'7166'),(69,'6341204503179231','未付款',1,1,'193'),(70,'3561403922024159','已付款',1,1,'734');

/*Table structure for table `p_estimate` */

DROP TABLE IF EXISTS `p_estimate`;

CREATE TABLE `p_estimate` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评价id',
  `g_id` int(11) DEFAULT NULL COMMENT '商品id',
  `e_estimate` longtext COMMENT '评价',
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='商品评价';

/*Data for the table `p_estimate` */

insert  into `p_estimate`(`e_id`,`g_id`,`e_estimate`) values (1,1,'红米k30很好非常的不错'),(2,1,'其他特色：前置摄像头清晰度提高了 拍照效果：比以前的机型有提高 电池续航：目前看到是比以前的机型耗电 通信音质：还没测试过 运行速度：目前还可以 显示效果：清晰度有提高 但是取消了后置指纹解锁不好，前面有时会解不开，而且解锁速度慢了不少，效果倒是挺炫酷的，而且没有永不休眠的功能，有点不方便'),(3,16,'本人电脑小白会照着图文调bios，至于原理，那就hehe了。我主板为微星b450迫击炮MAX，在靠近cpu的m.2口插上ssd后，开机发现电脑不识别，重启进入u盘启动选择界面，也没发现ssd，瞬间头大。本着店家是专业的想法，先找客服，竟然告诉我售后不上班？日，我自己搞。我在系统之家下载的3.3G的精简专业版。用的u盘为大白菜(新机器) 1，网上说，主板bios调为csm状态才能显示ssd，进入bios,发现主板原状态就是csm。我就先调为uefi，重启，再调为csm。再重启，发现了本ssd&quot;SUN...&quot;，于是进入u盘win8PE，发现ssd仍然不显示。2，再说需要ssd调为GPT。进入原系统，打开硬盘分区工具，发现ssd为空闲状态，选择ssd，快速分区，在跳出页面选择guid(GPT)，同时分区。保存。3，重启进入大白菜win8PE，选择本ssd，选择iso系统，选择还原系统就行了。'),(4,16,'虽然店家在图吧大名鼎鼎，但东西确实是好东西，包装的也很好。'),(5,29,'自己单独配了一个备用电池和128G的内存卡，来了没电，立刻充电。机器很轻便，操作简单，送的原装包不错，挺高清的，有4K和MP4模式可选，家用已经很满意了～'),(6,29,'平时街拍Vlog我都用它，可以手持、自拍或者三脚架式，自己一个人就可以拍大片。4K高清画质和防抖功能好喜欢，拍出来的视频不模糊。还有还有~快速编辑的设计真的太酷了，只要按下编辑按钮就可以加音乐与转场，编辑视频很简单！'),(7,29,'索尼（SONY）FDR-AX45家用/直播4K高清数码摄像机 /DV/摄影机/录像机 5轴防抖（AX40升级款），之前使用的是老款产品，这次又来更新4K系列产品，画质非常清晰，操作简单，物流速度也很快！'),(9,25,'外形外观：比較厚，比榮耀30PRO厚多了'),(10,31,'这款显示器性价比很高，满足了日常办公需求，是外接在笔记本电脑上使用的，接上的一霎那，嫌弃的把笔记本合上了。');

/*Table structure for table `shopping_cart` */

DROP TABLE IF EXISTS `shopping_cart`;

CREATE TABLE `shopping_cart` (
  `sc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `u_id` int(11) NOT NULL COMMENT '用户id',
  `g_id` int(11) NOT NULL COMMENT '商品id',
  `sc_quantity` int(11) NOT NULL DEFAULT '1' COMMENT '商品数量',
  `sc_total_price` decimal(16,2) NOT NULL DEFAULT '0.00' COMMENT '商品总价',
  PRIMARY KEY (`sc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='购物车';

/*Data for the table `shopping_cart` */

insert  into `shopping_cart`(`sc_id`,`u_id`,`g_id`,`sc_quantity`,`sc_total_price`) values (3,2,1,4,'110.00'),(21,1,25,1,'1.00');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(32) NOT NULL COMMENT '账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `user` */

insert  into `user`(`u_id`,`user_name`,`password`) values (1,'raicho','e10adc3949ba59abbe56e057f20f883e'),(2,'lzh','96e79218965eb72c92a549dd5a330112'),(18,'guest','0b4e7a0e5fe84ad35fb5f95b9ceeac79'),(19,'raichosmall','96e79218965eb72c92a549dd5a330112');

/*Table structure for table `user_info` */

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户信息',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `gender` varchar(4) DEFAULT NULL COMMENT '性别',
  `email` varchar(32) DEFAULT NULL COMMENT '邮箱',
  `money` decimal(32,2) DEFAULT '0.00' COMMENT '余额',
  `real_name` varchar(11) DEFAULT NULL COMMENT '真实姓名',
  `address` varchar(64) DEFAULT NULL COMMENT '地址',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `u_id` int(11) DEFAULT NULL COMMENT '用户表id',
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `user_info` */

insert  into `user_info`(`i_id`,`nickname`,`gender`,`email`,`money`,`real_name`,`address`,`phone`,`u_id`) values (1,'Raicho','男','1044350881@qq.com','241.80','赖志豪','广州商学院26栋413','15218395376',1),(2,'raicho-small','男','1963342385@qq.co','6613.90','王多鱼','广州','17306696698',2),(4,'默认昵称','女','1963342383@qq.com','0.00','默认真实名','20栋','15218369347',18),(5,'默认昵称','男','1963342383@qq.com','0.00','默认真实名','26栋413','17306696698',19);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
