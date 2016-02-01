//for database connection
var mysql = require('mysql');

config.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'demo',
  password : 'demo',
  database : 'demo'
});

module.exports = config;
