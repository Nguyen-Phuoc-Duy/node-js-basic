// get the client
// const mysql = require('mysql2');
import mysql from "mysql2/promise";
// const mysql = require('mysql2/promise');

// create the connection to database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "nodejsbasic",
// });
// const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
// simple query
// connection.query("SELECT * FROM `users`", function (err, results, fields) {
//   console.log(">>>check mysql");
//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available

//   let rows = results.map((row) => {
//     return row;
//   });
//   console.log(rows);
// });
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});
// export default connection;
export default pool;
