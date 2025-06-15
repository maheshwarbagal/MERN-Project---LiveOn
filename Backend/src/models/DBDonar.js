import mysql from "mysql2";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  // password: process.env.DB_PASSWORD,
  password: "cdac",
  database: "LiveOn",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});



















// import mysql from 'mysql2'

// export const pool = mysql.createPool({
//    host:"localhost",
//    user:"root",
//    password:"cdac",
//    database:"LiveOn",
//    waitForConnections:true,
//    connectionLimit:10,
//    queueLimit:0
// })