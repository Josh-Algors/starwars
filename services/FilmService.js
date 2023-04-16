const axios = require('axios');
const filmRepository = require("../repositories/FilmRepository");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const getFilms = async () => {

    try
    {
        const cacheKey = 'movies';
        let movies = cache.get(cacheKey);
        
        if(movies)
        {
            return movies;
        }
        else
        {
        const getFilms = await filmRepository.getAllFilms();
        const response = await axios.get('https://swapi.dev/api/films');
        const responses = response.data.results;
        
        if(getFilms.length != responses.length)
        {
            var count = 1;
        
            for(resp of responses)
            {
            var findFilm = await filmRepository.getFilmById(count);
        
            if(!findFilm)
            {
                const createFilm = await filmRepository.createFilm(count, resp.title, resp.release_date);

                getFilms.push(createFilm);
            }

            count++;
            }
            
            getFilms.sort((a, b) => a.release_date - b.release_date);

            return getFilms;
        }
        
        cache.set(cacheKey, getFilms);
        return getFilms;
        }
    }
    catch(error)
    {
        return error.message;
    }
};

const getFilmsById = async (id) => {

    try
    {
        const cacheKey = `movie-${id}`;
        let movie = cache.get(cacheKey);

        if(movie)
        {
        return movie;
        }
        else
        {
        const film = await filmRepository.getFilmById(id);

        if(!film)
        {
            const responses = await axios.get(`https://swapi.dev/api/films/${id}`);
            const response = responses.data;
           
            if(response.url)
            {
                const resp = await filmRepository.createFilm(parseInt(id), response.title, response.release_date);
                
                cache.set(cacheKey, film);
                return resp;
            }
            else
            {
                return;
            }
        }
        
        cache.set(cacheKey, film);
        return film;
        }
    }
    catch(error)
    {
        return error.message;
    }
};

module.exports = {
    getFilms,
    getFilmsById,
};