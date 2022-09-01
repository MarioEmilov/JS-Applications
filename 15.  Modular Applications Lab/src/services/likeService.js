import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/likes';

export const getMovieLikes = (movieId) => {
    let query = encodeURIComponent(`movieId="${movieId}"`);

    let querystring = `where=${query}`;

    return request.get(`${baseUrl}?${querystring}`);
};

export const getOne = (movieId, userId) => {
    let query = encodeURIComponent(`movieId = "${movieId}" AND _ownerId = "${userId}"`);
    return request.get(`${baseUrl}?where=${query}&pageSize=1`)
        .then(result => result[0]);
};

export const like = (movieId) => request.post(baseUrl, { movieId });

export const unLike = (likeId) => request.del(`${baseUrl}/${likeId}`);
