const db = require("../database/db");
const starWars = require("../services/StarWars");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const createComment = async (film_id, comment) => {

  const findFilm = await db.Film.findOne({where: {id: film_id}});
  const responses = await starWars.getFilmsById(film_id);

  if(!findFilm && responses)
  {
    const postComment = await db.Comment.create({
      film_id: parseInt(film_id),
      comment: comment
    });
  
    await db.Film.increment({'comment_count': 1}, {where : {id : film_id}});

    return postComment;
  }
  else if(findFilm)
  {
    const postComment = await db.Comment.create({
      film_id: parseInt(film_id),
      comment: comment
    });
  
    await db.Film.increment({'comment_count': 1}, {where : {id : film_id}});

    return postComment;
  }

  return;
};

const getAllComments = async (film_id) => {

  const cacheKey = `comment-${film_id}`;
  let comments = cache.get(cacheKey);

  if(comments)
  {
    return comments;
  }
  else
  {
    const film = await db.Comment.findAll({where : {film_id : film_id}})

    cache.set(cacheKey, film);
    return film;
  }
};

module.exports = {
    createComment,
    getAllComments,
};