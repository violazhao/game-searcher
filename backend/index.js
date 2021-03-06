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

app.listen(9000, () => {
    console.log(`Server successfully started. Listening on port 9000...`)
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
        `SELECT g.gameId, g.name, g.total_rating, g.summary
        FROM Game g
        WHERE g.name LIKE \"%${name || ""}%\"
        AND g.total_rating >= ${minimumRating || 0}
        AND g.gameId IN (${subquery})
        LIMIT 20`;
        
    // send query to database and return result 
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/api/v1/addFavorite', (req, res) => {
    let gameId = req.query.gameId;
    let userId = req.query.userId;
    query = 'INSERT INTO User_Favorites_Game (gameId, userId) VALUES(' + gameId + ',' + userId + ')';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.delete('/api/v1/removeFavorite', (req, res) => {
    let gameId = req.query.gameId;
    let userId = req.query.userId;
    query = 'DELETE FROM User_Favorites_Game WHERE gameId =' + gameId + ' AND userId = ' + userId;
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getRecommendations', (req, res) => {
    query = 'CALL recommending_procedure()';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result[0]);
    });
})

app.get('/api/v1/getFavorite', (req, res) => {
    let userId = req.query.userId;
    query = 'SELECT * FROM User_Favorites_Game u JOIN Game g ON u.gameId = g.gameId WHERE u.userId =' + userId;
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/api/v1/addReview', (req, res) => {
    let gameId = req.query.gameId;
    let userId = req.query.userId;
    let { review } = req.body;
    query = 'INSERT INTO User_Reviews_Game (gameId, userId, review) VALUES(' + gameId + ',' + userId + ',' + review + ')';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getReviews', (req, res) => {
    let gameId = req.query.gameId;
    query = 'SELECT userId, review FROM User_Reviews_Game WHERE gameId =' + gameId;
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/isUser', (req, res) => {
    const { username, password } = req.query;
    let query = 'SELECT count(userId) AS isValid FROM User WHERE username = "' + username + '" AND passHash = "' + password + '";';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/api/v1/createUser', (req, res) => {
    const { username, password } = req.query;
    let query = 'INSERT INTO User (userId, username, passHash) VALUES (SELECT LAST_INSERT_ID(), "' + username + '", ' + password + ');';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.put('/api/v1/updatePassword/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    let query = "UPDATE User SET passHash = " + password + " WHERE username = '" + username + "';"
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/api/v1/getNumGamesPerGenreByPlatformId', (req, res) => {
    let query = `SELECT g.genreId, gr.name, COUNT(g.gameId) as numGames
                 FROM Genre gr, Game_BelongsTo_Genre g JOIN Platform_Sells_Game p ON g.gameId = p.gameId 
                 WHERE platformId = 167 AND gr.genreId = g.genreId 
                 GROUP BY gr.genreId 
                 LIMIT 15;
                 `
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/api/v1/getGamesWithRatingsByPlatform', (req, res) => {
    let query = `SELECT g.gameId, g.name, g.total_rating, psg.platformId 
             FROM Game g JOIN Platform_Sells_Game psg ON g.gameId = psg.gameId
             WHERE platformId IN (130, 167) AND g.total_rating > 50 ORDER BY psg.platformId DESC LIMIT 20`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/', (req, res) => {
    res.send("you've reached the backend");
})

app.get('/api/v1/platforms', (req, res) => {
    db.query(`SELECT name FROM Platform`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/genres', (req, res) => {
    db.query(`SELECT name FROM Genre`, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})