const mysql = require("mysql2");
const envconf = require('dotenv').config();
const axios = require('axios');

if (envconf.error) {   throw envconf.error};        // ERROR if Config .env file is missing

const connectionFinance = mysql.createConnection({
    host: process.env.DB_FINHOST,
    user: process.env.DB_FINUSER,
    database: process.env.DB_FINDATABASE,
    password:  process.env.DB_FINPASSWORD
}).promise();


let start = process.env.TODAY ? new Date() : new Date(2020,0,1);
let end = new Date();       // Now

(async () => {
    while (start <= end) {
        let fxyear= start.getFullYear();
        let fxmonth = (start.getMonth()+1).toString().padStart(2, "0");
        let fxdate =start.getDate().toString().padStart(2, "0");
        let urlParam = process.env.TODAY ? '' : '&date=' + fxyear + fxmonth + fxdate;

        let fxUrl =  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json' + urlParam;
        let dbDate;
        //const dbDate = fxyear + '-' + fxmonth + '-' + fxdate;
        await axios.get(fxUrl,{ headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }  })
        .then(response => {
            let jsonResponse = response.data;
                //console.log(jsonResponse);
            for (let i = 0, item; item = jsonResponse[i]; ++i) {
                (async () => {
                    let fxcode = 'UAH' + item.cc;

                    const regexDate = /(\d+)\.(\d+)\.(\d+)/;
                    let extrDate = regexDate.exec(item.exchangedate);
                    let YYYY, DD, MM;
                    if (extrDate !== null) {
                        YYYY = extrDate[3];
                        MM = extrDate[2];
                        DD = extrDate[1];

                    };

                    dbDate = YYYY + '-' + MM + '-' + DD;
                    const sql ="SELECT * FROM bankua WHERE exchangedate='"+dbDate+"' AND code = '"+fxcode+ "'";

                    await connectionFinance.query(sql)
                    .then(result => {
                        if (result[0].length > 0) return;
                        const sql =" INSERT INTO bankua (code, exchangedate, rate ) VALUES (?,?,?)"
                        const fxitem = [fxcode, dbDate, item.rate];
                        let res = connectionFinance.query(sql, fxitem);
                        //console.log(result[0]);
                    })
                    .catch(err => {   console.log(err);    })
                })();
            } // end for

        })
        .catch(error => {
            console.log(error);
            if (error.response.status == 404) page = false;
                })
        console.log(dbDate);
        await wait(500);

        newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);


    } // End While

}) ();// end async


function wait(ms) {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}

