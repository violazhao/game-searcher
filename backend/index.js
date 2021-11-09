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
    query = 'DELETE FROM User_Favorites_Game WHERE gameId =' + gameId + ' AND userId = ' + userId;
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

app.get('/api/v1/isUser', (req, res) => {
    const { username, password } = req.query;
    query = 'SELECT count(userId) AS isValid FROM User WHERE username = "' + username + '" AND passHash = "' + password + '";';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.post('/api/v1/createUser', (req, res) => {
    const { username, password } = req.query;
    query = 'INSERT INTO User (userId, username, passHash) VALUES (SELECT LAST_INSERT_ID(), "' + username + '", ' + password + ');';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.put('/api/v1/updatePassword/:userId', (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;
    query = "UPDATE User SET passHash = " + password + " WHERE userId = " + userId + ";"
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/api/v1/getNumGamesPerGenreByPlatformId', (req, res) => {
    query = `SELECT g.genreId, gr.name, COUNT(g.gameId) 
             FROM Genre gr, Game_BelongsTo_Genre g JOIN Platform_Sells_Game p ON g.gameId = p.gameId 
             WHERE platformId = ` + req.body.platformId + ` AND gr.genreId = g.genreId 
             GROUP BY gr.genreId 
             LIMIT 15;
            `
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/api/v1/getGamesWithRatingsByPlatform', (req, res) => {
    query = `(SELECT g.name, g.total_rating, platformId 
             FROM Game g, Game_BelongsTo_Genre gbg JOIN Platform_Sells_Game psg ON gbg.gameId = psg.gameId
             WHERE platformId = ` + req.body.platformId1 + ` and g.total_rating > ` + req.body.rating + `)
             UNION
             (SELECT g.name, g.total_rating, platformId 
             FROM Game g, Game_BelongsTo_Genre gbg JOIN Platform_Sells_Game psg ON gbg.gameId = psg.gameId
             WHERE platformId = ` + req.body.platformId2 + ` and g.total_rating > ` + req.body.rating + `);
            `
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/', (req, res) => {
    res.send("you've reached the backend")
})
