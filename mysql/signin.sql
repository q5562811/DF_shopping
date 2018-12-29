/*
Navicat MySQL Data Transfer

Source Server         : DFGW
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : dfgw-index

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-12-29 10:35:12
*/

SET FOREIGN_KEY_CHECKS=0;

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
