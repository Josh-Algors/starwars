const filmRepository = require('../repositories/FilmRepository');
const starWars = require("../services/StarWars");
const helpers = require("../config/helpers");

module.exports = {


    getAllFilms: async (req, res, next) => {

        movies = await filmRepository.getAllFilms();

        return res.status(200).json(helpers.sendSuccess("movies fetched successfully!", movies));
    },

    getFilmsById: async (req, res, next) => {

        movie = await filmRepository.getFilmById(req.params.id);
        
        if(!movie)
        {
            return res.status(404).json(helpers.sendError("film not found!"));
        }

        return res.status(200).json(helpers.sendSuccess("movie fetched successfully!", movie));
    },


}