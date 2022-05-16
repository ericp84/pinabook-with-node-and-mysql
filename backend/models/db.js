const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

/// create connection to db ///

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

/// open mysql connect ///

connection.connect(err => {
    if (err) throw err;
    console.log("succesfully connected to the DB")
});
module.exports = connection;