const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");

// Create a pool to the database
const connection = mysql.createPool({
  connectionLimit: 3,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Open connection
connection.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Successfully connected to database!");
  connection.release();
});

module.exports = connection;
