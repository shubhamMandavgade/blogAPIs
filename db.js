
var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'blog',
  port: 3308
});

db.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Connected!");
  }
});


module.exports = db;
