/*
 * CREATE DATABASE IF NOT EXISTS `snappi_thatsme` CHARSET=utf8 COLLATE=utf8_unicode_ci;
 * GRANT ALL PRIVILEGES ON `snappi_thatsme` . * TO 'snaphappi'@'localhost';
 */
USE `snappi_thatsme`; 

DROP TABLE IF EXISTS `followers`;

CREATE TABLE IF NOT EXISTS `followers` (
  `id` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
--   `password` char(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `src_thumbnail` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `lastVisit` timestamp NULL DEFAULT NULL,
  `cohort` tinyint(4) UNSIGNED DEFAULT NULL COMMENT 'week joined, 0=Jan2013',
-- actions taken by follower  
  `cheer` tinyint(4) UNSIGNED DEFAULT 0 COMMENT 'cheer btn  1=show, 2=pmt attempt, 4=pmt complete'',
  `tweet` tinyint(4) UNSIGNED DEFAULT 0 COMMENT 'count of tweets',
  `fb_like` tinyint(4)UNSIGNED  DEFAULT 0 COMMENT 'count of fb likes',
  `fb_share` tinyint(4) UNSIGNED DEFAULT 0  COMMENT 'count of fb share on feed postings',
  `email_welcome` tinyint(1) DEFAULT 0  COMMENT 'welcome email sent',
  `email_cheer` tinyint(1) DEFAULT 0  COMMENT 'cheer email sent',
  `modified` datetime DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
--  KEY `credential_idx` (`username`,`password`),
  KEY `cohort_idx` (`cohort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `share_links`
--

CREATE TABLE `share_links` (
  `id` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `secret_key` char(36) CHARACTER SET latin1 NOT NULL,
  `hashed_password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `security_level` tinyint(2) NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `expiration_count` int(11) DEFAULT NULL,
  `target_id` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `target_url` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `target_owner` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `owner_id` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `renewal_request` tinyint(1) NOT NULL DEFAULT '0',
  `renewal_comment` text,
  `count` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `algo_id` int(11) NOT NULL,
  `algo_float_id` float(9,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

