const filmService = require("../services/FilmService");
const helpers = require("../config/helpers");

module.exports = {


    getAllFilms: async (req, res, next) => {

        try
        {
            movies = await filmService.getFilms();

            return res.status(200).json(helpers.sendSuccess("movies fetched successfully!", movies));
        }
        catch(error)
        {
            return res.status(500).json(helpers.sendError("Internal error occurred!"));
        }
    },

    getFilmsById: async (req, res, next) => {

        try
        {
            movie = await filmService.getFilmsById(req.params.id);
 
            if(!movie)
            {
                return res.status(404).json(helpers.sendError("film not found!"));
            }
    
            return res.status(200).json(helpers.sendSuccess("movie fetched successfully!", movie));
        }
        catch(error)
        {
            return res.status(500).json(helpers.sendError("Internal error occurred!"));
        }
    },


}