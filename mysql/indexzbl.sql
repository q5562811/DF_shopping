/*
Navicat MySQL Data Transfer

Source Server         : DFGW
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : dfgw-index

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-12-29 10:34:59
*/

SET FOREIGN_KEY_CHECKS=0;

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
SET FOREIGN_KEY_CHECKS=1;
