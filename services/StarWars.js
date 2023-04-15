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
            throw new Error(`Movie with ID ${id} not found.`);
        }

        return response.data;
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