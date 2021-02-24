CREATE DATABASE finance CHARACTER SET utf8 COLLATE utf8_general_ci;
create user finance_user@localhost;
set password for finance_user@localhost=password('psw_finance_user');
grant all on finance.* to finance_user@localhost with grant option;

use finance;

CREATE TABLE bankua (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(6) NOT NULL,
exchangedate DATE NOT NULL,
rate float UNSIGNED
);

# ISO 4217 Currency Codes for different languages e.g, USD = United States dollar

CREATE TABLE names (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(3) NOT NULL,
lang VARCHAR(2) NOT NULL,
txt VARCHAR(255) NOT NULL
);

