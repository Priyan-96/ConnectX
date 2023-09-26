const mysql = require("mysql2");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"social_media"
})

db.getConnection((err,connection)=>{
    if (err) throw err;
    console.log("Connected to the database!");
    connection.release();
});

module.exports = db;