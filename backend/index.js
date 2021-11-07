const mysql = require("mysql2")
require("dotenv").config()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: '34.134.128.140',
    user: 'root',
    password: 'team20',
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

app.get('/api/v1/games', (req, res) => {
    const { name, minimumRating } = req.query;
    // console.log("NAME: ", name);
    db.query(`SELECT * FROM Game WHERE name LIKE \"%${name || ""}%\" AND total_rating >= ${minimumRating || 0} LIMIT 15`, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.post('/api/v1/addFavorite', (req, res) => {
    let gameId = req.body.gameId;
    let userId = req.body.userId;
    query = 'INSERT INTO User_Favorites_Game (gameId, userId) VALUES(' + gameId + ',' + userId + ')';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.post('/api/v1/removeFavorite', (req, res) => {
    let gameId = req.body.gameId;
    let userId = req.body.userId;
    query = 'DELETE FROM User_Favorites_Game (gameId, userId) WHERE gameId =' + gameId + 'AND userId =' + userId;
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/api/v1/getFavorite', (req, res) => {
    let userId = req.body.userId;
    query = 'SELECT * FROM User_Favorites_Game u JOIN Game g ON u.gameId = g.gameId WHERE u.userId =' + userId;
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/', (req, res) => {
    res.send("you've reached the backend")
})
