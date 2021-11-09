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
    const { name, minimumRating, platforms, genres } = req.query; // retrieve queries from URI

    // process queries that are arrays
    let final_platforms = [];
    let platformSubquery = `platformId > -1`;
    if (platforms) {
        console.log("Platforms: ", platforms);
        let platform_arr = platforms.split(",");
        platform_arr.map((platform) => {
            final_platforms.push(`\'${platform}\'`);
        })
        platformSubquery = `platformId IN (SELECT platformId FROM Platform WHERE name IN (${final_platforms}))`;
    }
    let final_genres = [];
    let genreSubquery = `genreId > -1`;
    if (genres) {
        console.log("Genres: ", genres);
        let genre_arr = genres.split(",");
        genre_arr.map((genre) => {
            final_genres.push(`\'${genre}\'`);
        })
        genreSubquery = `genreId IN (SELECT genreId FROM Genre WHERE name IN (${final_genres}))`;
    }

    // define query
    let subquery = 
        `SELECT gameId
        FROM Game_BelongsTo_Genre NATURAL JOIN Platform_Sells_Game
        WHERE ${genreSubquery}
        AND ${platformSubquery}`; 
    let query = 
        `SELECT g.name, g.total_rating, g.summary
        FROM Game g
        WHERE g.name LIKE \"%${name || ""}%\"
        AND g.total_rating >= ${minimumRating || 0}
        AND g.gameId IN (${subquery})
        LIMIT 20`;
        
    // send query to database and return result 
    db.query(query, function (err, result) {
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

app.get('/', (req, res) => {
    res.send("you've reached the backend")
})

app.get('/api/v1/platforms', (req, res) => {
    db.query(`SELECT name FROM Platform`, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/api/v1/genres', (req, res) => {
    db.query(`SELECT name FROM Genre`, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})