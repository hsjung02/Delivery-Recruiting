const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kim4511',
    database: 'delivery'
});

module.exports = db;