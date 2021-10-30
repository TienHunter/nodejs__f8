const mysql = require('mysql2/promise');
const connection = mysql.createPool({

   host: 'localhost',
   user: 'root',
   password: '',
   database: 'f8_education'

});

module.exports = connection;
