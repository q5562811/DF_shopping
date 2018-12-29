/*
Navicat MySQL Data Transfer

Source Server         : DFGW
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : dfgw-index

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-12-29 10:34:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hotlist
-- ----------------------------
DROP TABLE IF EXISTS `hotlist`;
CREATE TABLE `hotlist` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `nema` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotlist
-- ----------------------------
INSERT INTO `hotlist` VALUES ('1', '苏泊尔(SUPOR)', '../images/15170469A.jpg', '苏泊尔(SUPOR)  CFXB40HC15-120IH电磁加热球釜电饭煲智能电饭锅4L', '#', '#');
INSERT INTO `hotlist` VALUES ('2', '象印(ZOJIRUSHI)', '../images/15168533A.jpg', '象印(ZOJIRUSHI) NS-YTH18C 日本原装进口黑金刚内釜电饭煲 5升', '#', '日本原装进口黑金刚内釜电饭煲 5升');
INSERT INTO `hotlist` VALUES ('3', '惠人(HUROM) 三代', '../images/15183666A.jpg', '惠人(HUROM) 三代原汁机 HU21SG3L 原装进口 双向旋转 低速43转（可制作果汁，冰淇淋，豆腐）', '#', '惠人(HUROM) 三代原汁机 HU21SG3L 原装进口 双向旋转 低速43转（可制作果汁，冰淇淋，豆腐）');
INSERT INTO `hotlist` VALUES ('4', '老板(ROBAM) 老板', '../images/15137785A.jpg', '老板(ROBAM) 老板欧式烟灶两件套(CXW-200-8011,JZ(Y/T)-7B16)', '#', '老板(ROBAM) 老板欧式烟灶两件套(CXW-200-8011,JZ(Y/T)-7B16)');
INSERT INTO `hotlist` VALUES ('5', '万和(Vanward)', '../images/15072281A.jpg', '万和(Vanward) 脱排油烟机吸油烟机CXW-180-H05D(中式深吸系列)', '#', '万和(Vanward) 脱排油烟机吸油烟机CXW-180-H05D(中式深吸系列)');
INSERT INTO `hotlist` VALUES ('6', 'ACA 多功能咖啡茶饮机', '../images/15166398A.jpg', 'ACA 多功能咖啡茶饮机AC-D03A', '#', 'ACA 多功能咖啡茶饮机AC-D03A');

-- ----------------------------
-- Table structure for indexzbl
-- ----------------------------
DROP TABLE IF EXISTS `indexzbl`;
CREATE TABLE `indexzbl` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `img` varchar(255) NOT NULL,
  `money` float(255,2) unsigned NOT NULL,
  `recommend` varchar(255) DEFAULT NULL,
  `recommend_what` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of indexzbl
-- ----------------------------
INSERT INTO `indexzbl` VALUES ('1', '万宝龙（MONTBLANC）传承典藏系列男士机械腕表', 'images/mb.png', '25800.00', '李睿推荐：', '1、简约盘表，优雅白色圆形表盘搭配古罗马数字/条形小时刻度，尽显优雅气息。2、精钢/18k玫瑰金表壳搭配皮质表');

-- ----------------------------
-- Table structure for indexzbr
-- ----------------------------
DROP TABLE IF EXISTS `indexzbr`;
CREATE TABLE `indexzbr` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `money` float(30,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of indexzbr
-- ----------------------------
INSERT INTO `indexzbr` VALUES ('1', '东滩绿港 大米组合（3+1）', 'images/zb1.png', '299.00');
INSERT INTO `indexzbr` VALUES ('2', '新宜兴 健康美味鳗鱼 尝鲜组', 'images/zb2.png', '229.00');
INSERT INTO `indexzbr` VALUES ('3', '新疆原产阿克苏苹果(大果）特惠组', 'images/zb3.png', '208.00');
INSERT INTO `indexzbr` VALUES ('4', '俞兆林加绒加厚女士保暖内衣套组', 'images/zb4.png', '299.00');
INSERT INTO `indexzbr` VALUES ('5', '迪士尼(DISNEY) 百变百搭收纳柜(5层)直降特惠', 'images/zb5.png', '298.00');
INSERT INTO `indexzbr` VALUES ('6', '乐扣乐扣 智能三段电热水瓶', 'images/zb6.png', '448.00');

-- ----------------------------
-- Table structure for signin
-- ----------------------------
DROP TABLE IF EXISTS `signin`;
CREATE TABLE `signin` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of signin
-- ----------------------------
INSERT INTO `signin` VALUES ('1', '13751885288', '5880996');
INSERT INTO `signin` VALUES ('2', '13265186589', '5880996');
INSERT INTO `signin` VALUES ('3', '13813813813', '5880996');
SET FOREIGN_KEY_CHECKS=1;
