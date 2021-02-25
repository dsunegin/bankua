# bankua - Описание RU

## Официальный курс валют и банковских металлов по данным НацБанка Украины [bank.gov.ua](https://bank.gov.ua) 

Данные [НацБанк API](https://bank.gov.ua/ua/open-data/api-dev) сохраняются в локальную БД mysql

Структура таблиц описана в **db_finance.sql**

В файле **.env** задается конфигурация. 
Переименуйте файл **.env.example** -> **.env**  и задайте свои значения.
 
# bankua - Description EN

## Official exchange rate of currencies and bank metals according to the National Bank of Ukraine (NBU) [bank.gov.ua](https://bank.gov.ua)

FX Data from [NBU API](https://bank.gov.ua/ua/open-data/api-dev) are saved in a local mysql database 

Database structure describes in  **db_finance.sql**


#### Clone & Install Dependencies
```bash
git clone https://github.com/dsunegin/bankua
cd bankua
npm install
```

Create user and database according to db_finance.sql:
```
 mysql -uroot -pROOT_PASSWORD -e 'source db_finance.sql'

```
Configure your env:
```
cp .env.example .env

```

#### Specifying a dev environment

In order to override sample `bankua` settings such as `DB_FINHOST, DB_FINUSER, DB_FINDATABASE, DB_FINPASSWORD, TODAY`  endpoints, create/copy an `.env` file in the `bankua` root directory, and declare any environment overrides you need in that file

A short explanation of a `.env` file:

```
DB_FINHOST: localhost               - mysql Host
DB_FINPORT: 3306                    - mysql Port
DB_FINUSER:  finance_user           - mysql User created by db_finance.sql
DB_FINDATABASE: finance             - Database created by db_finance.sql
DB_FINPASSWORD: psw_finance_user    - UserPassword created by db_finance.sql
TODAY: true/false
        if true (DEFAULT) - if this value is true, index-fx-bankua.js will get only FX rates for Today
        if false -  Get all historic rates
```

## Running `bankua`

Either configure `bankua` to run by pm2 (node process manager)  with cron or manually start the `bankua` process.

To manually start `bankua` once it is installed:

```bash
node index-fx-bankua.js 
```

### Start the pm2 cron 

```bash
./pm2-bankua.sh
```
By default, cron runs every 6 hours. You can adjust it in  `pm2-bankua.sh` file.
 
**Notice:** You must have installed pm2 process manager to run pm2-bankua.sh script. 

## Contact
Denis Sunegin `dsunegin@gmail.com`
