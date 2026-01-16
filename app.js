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

//Tar emot request och svarar
app.post("/chat", (req, res) => {
    const userInput = req.body.message;

    const sql = "SELECT output FROM chatter WHERE input = ?";
    db.query(sql, [userInput], (err, result) => {
        if (err) throw err;

        let answer = "Du snackar gojja grabben";

        if (result.length > 0) {
            answer = result[0].output;
        }

        //Skickar svar tillbaka 
        res.send(`
            <p><b>Du:</b> ${userInput}</p>
            <p><b>Chatbottis3000 :</b> ${answer}</p>
            <a href="/">Tillbaka</a>
        `);
    });
});

//Startar server
app.listen(3000, () => {
});