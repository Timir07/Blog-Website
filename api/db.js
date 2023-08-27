import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: process.env.REACT_APP_DB_KEY,
  database:"blog"
})