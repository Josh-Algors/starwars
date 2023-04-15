const db = require("../database/db");
const filmRepository = require("../repositories/FilmRepository");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const createComment = async (film_id, comment) => {

  const findFilm = await db.Film.findOne({where: {id: film_id}});

  if(findFilm)
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
    console.log("cached response");
    return comments;
  }
  else
  {
    console.log("not cached response");
    const film = await db.Comment.findAll({where : {film_id : film_id}})

    cache.set(cacheKey, film);
    return film;
  }
};

module.exports = {
    createComment,
    getAllComments,
};