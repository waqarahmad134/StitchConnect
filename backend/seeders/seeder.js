const mysql = require("mysql2")
const fs = require("fs")

require("dotenv").config()

// Read SQL seed query
const seedQuery = fs.readFileSync("./seed.sql", {
  encoding: "utf-8",
})

// Connect to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'waqar_fyp',
  multipleStatements: true, // IMPORTANT
})

connection.connect();
console.log("Running SQL seed...")

// Run seed query
connection.query(seedQuery, err => {
  if (err) {
    console.log(err);
    throw err 
  }
  console.log("SQL seed completed!  , Email : Admin@gmail.com , Password : 123456")
  connection.end()
})