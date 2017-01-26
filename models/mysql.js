"use strict";
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'nodejs',
  password : 'nodejs',
  database : 'nodejs'
});

module.exports = connection;