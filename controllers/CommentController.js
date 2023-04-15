const filmRepository = require('../repositories/FilmRepository');
const commentRepository = require('../repositories/CommentRepository');
const starWars = require("../services/StarWars");
const helpers = require("../config/helpers");
const Joi = require("joi");

module.exports = {


    getAllComments: async (req, res, next) => {

        try
        {
            allComments = await commentRepository.getAllComments(req.params.film_id);

            return res.status(200).json(helpers.sendSuccess("all comments retrieved successfully!", allComments));  
        }
        catch(error)
        {
            return res.status(500).json(helpers.sendError(error.message));
        }
    },

    postComment: async (req, res, next) => {

        try
        {
            const commentSchema = Joi.object().keys({comment: Joi.required()});
    
            const validate = commentSchema.validate(req.body);
                
            if(validate.error != null)
            {
                const errorMessage = validate.error.details.map(i => i.message).join('.');
                return res.status(400).json(helpers.sendError(errorMessage));
            }
    
            const {comment} = req.body;
            allComments = await commentRepository.createComment(req.params.film_id, comment);
    
            if(!allComments)
            {
                return res.status(404).json(helpers.sendError("can't post comment! film id not found"));
            }   
    
            return res.status(201).json(helpers.sendSuccess("comment saved successfully!", allComments)); 
        }
        catch(error)
        {
            return res.status(500).json(helpers.sendError(error.message));
        }
    },

}