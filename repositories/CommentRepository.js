const db = require("../database/db");

const createComment = async (film_id, comment) => {

    const postComment = await db.Comment.create({
      film_id: parseInt(film_id),
      comment: comment
    });
  
    await db.Film.increment({'comment_count': 1}, {where : {id : film_id}});

    return postComment;
};

const getAllComments = async (film_id) => {

    const filmComment = await db.Comment.findAll({where : {film_id : film_id}});

    return filmComment;

};

module.exports = {
    createComment,
    getAllComments,
};