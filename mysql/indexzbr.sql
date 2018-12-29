/*
Navicat MySQL Data Transfer

Source Server         : DFGW
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : dfgw-index

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-12-29 10:35:06
*/

SET FOREIGN_KEY_CHECKS=0;

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
SET FOREIGN_KEY_CHECKS=1;
