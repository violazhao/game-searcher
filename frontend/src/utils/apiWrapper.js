import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

/**
 * Returns the top 20 games requested by a user based on query attributes
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getGames = (nameQuery, ratingQuery) => {
    let requestString = `${BASE_URL}/v1/games`;
    if (nameQuery && ratingQuery) {
        requestString += `?name=${nameQuery}&minimumRating=${ratingQuery}`;
    }
    else if (ratingQuery) {
        requestString += `?minimumRating=${ratingQuery}`;
    }
    else if (nameQuery) {
        requestString += `?name=${nameQuery}`;
    }
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
 * Update password
 */
export const updatePassword = (userId, newPassword) => {
    let requestString = `${BASE_URL}/v1/updatePassword/${userId}`;
    console.log(`PUT request sent to ${requestString}`)
    return axios
        .put(requestString, {
           'password': newPassword
        }, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'PUT_PASSWORD_FAIL',
            error,
        }));
};

/**
 * Check if username and password combination is valid user
 */
export const isUser = (username, password) => {
    let requestString = `${BASE_URL}/v1/isUser?username=${username}&password=${password}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_USER_FAIL',
            error,
        }));
};

/**
 * Create new user
 */
 export const createUser = (username, password) => {
    let requestString = `${BASE_URL}/v1/createUser?username=${username}&password=${password}`;
    console.log(`POST request sent to ${requestString}`)
    return axios
        .post(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'POST_USER_FAIL',
            error,
        }));
};

/**
 * Add a favorite game for a user.
 */
 export const addFavorite = (gameId, userId) => {
    let requestString = `${BASE_URL}/v1/addFavorite`;
    requestString += `?gameId=${gameId}&userId=${userId}`;
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
    requestString += `?gameId=${gameId}&userId=${userId}`;
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
    requestString += `?userId=${userId}`;
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