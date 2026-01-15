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

app.post("/chat", (req, res) => {
    const userInput = req.body.message;

    const sql = "SELECT output FROM messages WHERE input = ?";
    db.query(sql, [userInput], (err, result) => {
        if (err) throw err;

        let answer = "Du snackar gojja grabben";

        if (result.length > 0) {
            answer = result[0].output;
        }

        res.send(`
            <p><b>Du:</b> ${userInput}</p>
            <p><b>Chatbottis3000 :</b> ${answer}</p>
            <a href="/">Tillbaka</a>
        `);
    });
});

app.listen(3000, () => {
});