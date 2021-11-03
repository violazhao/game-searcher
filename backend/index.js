const mysql = require("mysql2")
require("dotenv").config()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game_searcher_db'
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Connected to MySQL...")
})

app.listen(5000, () => {
    console.log(`Server successfully started. Listening on port 5000...`)
})

app.use('/api/v1/games', (req, res) => {
    db.query("SELECT * FROM Game LIMIT 15", function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/', (req, res) => {
    res.send("you've reached the backend")
})
