-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema TFG
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `TFG` ;

-- -----------------------------------------------------
-- Schema TFG
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TFG` DEFAULT CHARACTER SET utf8mb4 ;
USE `TFG` ;

-- -----------------------------------------------------
-- Table `TFG`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `language` VARCHAR(45) NOT NULL DEFAULT 'es',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TFG`.`language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `displayName` VARCHAR(45) NOT NULL,
  `imageUrl` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TFG`.`topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`topic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topic` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TFG`.`language_has_topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`language_has_topic` (
  `language_id` INT NOT NULL,
  `topic_id` INT NOT NULL,
  PRIMARY KEY (`language_id`, `topic_id`),
  INDEX `fk_language_has_topic_topic1_idx` (`topic_id` ASC) VISIBLE,
  INDEX `fk_language_has_topic_language_idx` (`language_id` ASC) VISIBLE,
  CONSTRAINT `fk_language_has_topic_language`
    FOREIGN KEY (`language_id`)
    REFERENCES `TFG`.`language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_language_has_topic_topic1`
    FOREIGN KEY (`topic_id`)
    REFERENCES `TFG`.`topic` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TFG`.`level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`level` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `solution` VARCHAR(45) NOT NULL,
  `type` INT NOT NULL,
  `word` VARCHAR(45) NULL,
  `sentence` VARCHAR(255) NULL,
  `imageUrl` VARCHAR(255) NULL,
  `language_id` INT NOT NULL,
  `topic_id` INT NOT NULL,
  PRIMARY KEY (`id`, `language_id`, `topic_id`),
  INDEX `fk_level_language_has_topic1_idx` (`language_id` ASC, `topic_id` ASC) VISIBLE,
  CONSTRAINT `fk_level_language_has_topic1`
    FOREIGN KEY (`language_id` , `topic_id`)
    REFERENCES `TFG`.`language_has_topic` (`language_id` , `topic_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TFG`.`user_points`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`user_points` (
  `user_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  `topic_id` INT NOT NULL,
  `points` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `language_id`, `topic_id`),
  INDEX `fk_user_has_language_has_topic_language_has_topic1_idx` (`language_id` ASC, `topic_id` ASC) VISIBLE,
  INDEX `fk_user_has_language_has_topic_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_language_has_topic_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `TFG`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_language_has_topic_language_has_topic1`
    FOREIGN KEY (`language_id` , `topic_id`)
    REFERENCES `TFG`.`language_has_topic` (`language_id` , `topic_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
