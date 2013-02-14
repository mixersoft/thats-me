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
