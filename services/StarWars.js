// services/movies.js
const axios = require('axios');

const getFilms = async () => {

    try
    {
        const response = await axios.get('https://swapi.dev/api/films');

        return response.data.results;
    }
    catch (error)
    {
        return error.message;
    }
};

const getFilmsById = async (id) => {

    try
    {
        const response = await axios.get(`https://swapi.dev/api/films/${id}`);

        if (!response.data)
        {
            return ;
        }

        return response;
    }
    catch (error)
    {
        return error.message;
    }
};

module.exports = {
    getFilms,
    getFilmsById,
};