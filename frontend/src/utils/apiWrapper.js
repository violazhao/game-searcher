import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

/**
 * Returns the top 20 games requested by a user based on query attributes
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getGames = (name, rating, platforms, genres) => {
    let requestString = `${BASE_URL}/v1/games`;
    let queryFlag = false;

    let nameQueryString = ``;
    if (name) {
        nameQueryString = `?name=${name}`;
        queryFlag = true;
    }

    let ratingQueryString = ``;
    if (rating) {
        ratingQueryString = queryFlag ? `&minimumRating=${rating}` : `?minimumRating=${rating}`;
        queryFlag = true;
    }

    let platformQueryString = ``;
    if (platforms.length > 0) {
        platformQueryString = queryFlag ? `&platforms=${platforms}` : `?platforms=${platforms}`;
        queryFlag = true;
    }

    let genreQueryString = ``;
    if (genres.length) {
        genreQueryString = queryFlag ? `&genres=${genres}` : `?genres=${genres}`;
        queryFlag = true;
    }

    requestString += nameQueryString + ratingQueryString + platformQueryString + genreQueryString;

    console.log(`GET request sent to ${requestString}`);
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_GAME_FAIL',
            error,
        }));
};

/**
 * Add a favorite game for a user.
 */
 export const addFavorite = (gameId, userId) => {
    let requestString = `${BASE_URL}/v1/addFavorite`;
    let hardcodedGameId = '21066';
    let hardcodedUserId = '0';
    requestString += `?gameId=${hardcodedGameId}&userId=${hardcodedUserId}`;
    console.log(`POST request sent to ${requestString}`);
    return axios
        .post(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'ADD_FAVORITE_FAIL',
            error,
        }));
};

/**
 * Remove a favorite game for a user.
 */
 export const removeFavorite = (gameId, userId) => {
    let requestString = `${BASE_URL}/v1/removeFavorite`;
    let hardcodedGameId = '21066';
    let hardcodedUserId = '0';
    requestString += `?gameId=${v}&userId=${hardcodedUserId}`;
    console.log(`POST request sent to ${requestString}`);
    return axios
        .post(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'REMOVE_FAVORITE_FAIL',
            error,
        }));
};

/**
 * Get the list of favorite games of a user.
 */
 export const getFavorite = (userId) => {
    let requestString = `${BASE_URL}/v1/getFavorite`;
    let hardcodedUserId = '0';
    requestString += `?userId=${hardcodedUserId}`;
    console.log(`POST request sent to ${requestString}`);
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_FAVORITE_FAIL',
            error,
        }));
};