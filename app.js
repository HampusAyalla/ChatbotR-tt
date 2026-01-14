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

app.listen(3000, () => {
});