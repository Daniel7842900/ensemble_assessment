CREATE TABLE IF NOT EXISTS `movies` (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  released DATE NOT NULL,
  duration INT(4) NOT NULL,
  rating VARCHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;