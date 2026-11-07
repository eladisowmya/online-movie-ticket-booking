const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.root,
    password: process.env.root,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("MySQL Database Connected Successfully!");
    }
});

module.exports = db;