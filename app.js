const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Kopplar med sql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatbot"
});

db.connect(err => {
    if (err) throw err;
});

// html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
});