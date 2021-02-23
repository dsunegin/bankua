CREATE DATABASE finance CHARACTER SET utf8 COLLATE utf8_general_ci;
grant all on finance.* to localuser@localhost with grant option;

CREATE TABLE bankua (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(6) NOT NULL,
exchangedate DATE NOT NULL,
rate float UNSIGNED
)
CREATE TABLE names (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(3) NOT NULL,
lang VARCHAR(2) NOT NULL,
txt VARCHAR(255) NOT NULL
)

