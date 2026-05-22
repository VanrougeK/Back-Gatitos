const mysql = require("mysql2");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 11933,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl: {rejectUnauthorized: false}
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error: ", err.message);
  } else {
    console.log("MySQL conectado");
    connection.release();
  }
});
module.exports = db.promise();
