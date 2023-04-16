const { array } = require("joi");
const { INTEGER } = require("sequelize");
const db = require("../database/db");
const starWars = require("../services/StarWars");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const getAllFilms = async () => {

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
      const getFilms = await db.Film.findAll({order: [['release_date', "ASC"]]});
      const responses = await starWars.getFilms();
    
      if(getFilms.length != responses.length)
      {
        var count = 1;
    
        for(resp of responses)
        {
          var findFilm = await db.Film.findOne({where : {id: count}});
    
          if(!findFilm)
          {
            const createFilm = await db.Film.create({
              id: count,
              title: resp.title,
              release_date: resp.release_date,
              comment_count: 0
            });

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

const getFilmById = async (id) => {

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
      const film = await db.Film.findOne({where : {id: id}});

      if(!film)
      {
        const response = await starWars.getFilmsById(id);
        console.log(response.url);
        if(response.url)
        {
         const resp = await db.Film.create({
            id: parseInt(id),
            title: response.title,
            release_date: response.release_date,
            comment_count: 0
          });
          
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
  getAllFilms,
  getFilmById,
};