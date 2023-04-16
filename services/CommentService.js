const axios = require('axios');
const filmRepository = require("../repositories/FilmRepository");
const commentRepository = require("../repositories/CommentRepository");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const getAllComments = async (film_id) => {

    try
    {
        const film = await commentRepository.getAllComments(film_id);

        return film;
    }
    catch(error)
    {
        return error.message;
    }
};

const createComment = async (film_id, comment) => {

    const findFilm = await filmRepository.getFilmById(film_id);
    const response = await axios.get(`https://swapi.dev/api/films/${film_id}`);
    const responses = response.data;

    if(!findFilm && responses)
    {
        const postComment = await commentRepository.createComment(film_id, comment);

        return postComment;
    }
    else if(findFilm)
    {
        const postComment = await commentRepository.createComment(film_id, comment);

        return postComment;
    }

    return;
};

module.exports = {
    getAllComments,
    createComment,
};