const mysql = require("mysql2");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 11933,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000,
  ssl: {rejectUnauthorized: false}
});

console.log("Intentando conectar a:", process.env.DB_HOST);

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error: ", err.message);
  } else {
    console.log("MySQL conectado");
    connection.release();
  }
});
module.exports = db.promise();
